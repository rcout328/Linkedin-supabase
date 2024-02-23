import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const NavBar = () => {
  const [user] = useAuthState(auth);
  const google = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  const signOut = () => {
    auth.signOut();
    console.log("signed out");
  };
  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {!user ? (
        <button className="sign-in" onClick={google}>
          Sign in
        </button>
      ) : (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      )}
    </nav>
  );
};
export default NavBar;
