import { useContext, useEffect } from "react";
import { LoginContext } from "../Auth/Context";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

const supabase = createClient(
  "https://cjjmuomnpvxquzrjbjik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqam11b21ucHZ4cXV6cmpiamlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxOTgsImV4cCI6MjAyMzU4MjE5OH0.cTCh0a69IL3t_Cq-vLfcoDuCfspg9mZdCfGuQ8MK8z4"
);

const Navbar = () => {
  const [session, setSession] = useContext(LoginContext);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign-out error:", error.message);
      } else {
        console.log("User signed out successfully");
        // You can redirect to a different page or perform other actions as needed
      }
    } catch (error) {
      console.error("Unexpected error during sign-out:", error.message);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center">
      {session ? (
        <>
          <button onClick={signOut}>Logout</button>
          <Link to={"/account"} className="ml-5">
            Account
          </Link>
        </>
      ) : (
        <button>
          <Link to={"/login"}>Login</Link>
        </button>
      )}
    </div>
  );
};

export default Navbar;
