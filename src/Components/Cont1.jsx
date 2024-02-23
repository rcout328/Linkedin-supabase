import NavBar from "./Google1";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  limit,
  orderBy,
} from "firebase/firestore";

const Cont1 = () => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt"), limit(50));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, "posts"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      uid,
      createdAt: new Date(),
    });

    setMessage("");
  };

  return (
    <div>
      <NavBar />
      {!user ? (
        <h1>Sign in to chat</h1>
      ) : (
        <>
          <h1>Welcome to the chat</h1>
          <h1>{user?.email}</h1>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>

          <ul className="messages-wrapper">
            {messages.map((message) => (
              <li key={message.id}>
                <strong>{message.name}:</strong> {message.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Cont1;
