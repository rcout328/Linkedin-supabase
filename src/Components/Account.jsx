import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cjjmuomnpvxquzrjbjik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqam11b21ucHZ4cXV6cmpiamlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxOTgsImV4cCI6MjAyMzU4MjE5OH0.cTCh0a69IL3t_Cq-vLfcoDuCfspg9mZdCfGuQ8MK8z4"
);
const Account = () => {
  const [setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [name, setname] = useState("");
  const [Name] = useState("");

  async function handleUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  }

  async function handleUpdate() {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
        name: name,
      });
      if (error) {
        throw error;
      }
      console.log("User updated successfully:", data);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  }

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1>Account</h1>
      <h1>Update data</h1>
      <h1>{Name}</h1>
      <input
        type="text"
        placeholder="Enter new email"
        className="border-2 border-black"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter new name"
        className="border-2 border-black"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Account;
