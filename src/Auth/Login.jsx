import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://cjjmuomnpvxquzrjbjik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqam11b21ucHZ4cXV6cmpiamlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxOTgsImV4cCI6MjAyMzU4MjE5OH0.cTCh0a69IL3t_Cq-vLfcoDuCfspg9mZdCfGuQ8MK8z4"
);

export default function App() {
  const [session, setSession] = useState(null);

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

  const signInWithLinkedIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin_oidc",
      });
      if (error) {
        console.error("LinkedIn login error:", error.message);
      }
    } catch (error) {
      console.error("Unexpected error during LinkedIn login:", error.message);
    }
  };

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

  if (!session) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["linkedin"]}
          />
          <button onClick={signInWithLinkedIn}>Login</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>Logged in!</div>
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }
}
