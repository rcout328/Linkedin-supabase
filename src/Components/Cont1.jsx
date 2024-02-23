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
  deleteDoc,
  doc,
} from "firebase/firestore";

const Cont1 = () => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // Added state to store the document ID to delete

  const deleteMessage = async (docId) => {
    try {
      const dataRef = doc(collection(db, "posts"), docId);
      // Delete the document
      await deleteDoc(dataRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error.message);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600  p-4">
      <NavBar />
      {!user ? (
        <h1 className="text-4xl font-bold">Sign in to chat</h1>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Welcome to the chat
          </h1>
          <h1 className="text-xl mb-4 text-white">{user?.email}</h1>

          <div className="w-full max-w-md mb-4">
            <input
              className="w-full p-2 border rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
            onClick={sendMessage}
          >
            Send
          </button>

          <ul className="mt-8 w-full max-w-md">
            {messages.map((message) => (
              <li
                key={message.id}
                className="mb-2 p-2 bg-gray-800 text-white bg-opacity-50 rounded"
              >
                <strong>{message.name}:</strong> {message.text}
                {user.uid === message.uid && (
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => deleteMessage(message.id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cont1;
