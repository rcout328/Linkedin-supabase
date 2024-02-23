import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "./Navbar";
import { useContext } from "react";
import { LoginContext } from "../Auth/Context";
const supabase = createClient(
  "https://cjjmuomnpvxquzrjbjik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqam11b21ucHZ4cXV6cmpiamlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxOTgsImV4cCI6MjAyMzU4MjE5OH0.cTCh0a69IL3t_Cq-vLfcoDuCfspg9mZdCfGuQ8MK8z4"
);

const Home = () => {
  const [input, setInput] = useState("");
  const [datas, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [image, setImage] = useState(null);

  const [session, setSession] = useContext(LoginContext);

  async function handleuser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user);
  }

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
  }, [session]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleInserts = (payload) => {
    console.log("Change received!", payload);
  };

  supabase
    .channel("trail11")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "posts" },
      handleInserts
    )
    .subscribe();

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleAdd = async () => {
    try {
      const { data, error } = await supabase.from("posts").insert([
        {
          content: input,
          user_if: currentUser.user_metadata.id,
          uName: currentUser.user_metadata.name,
          image: image,
        },
      ]);

      setInput("");
      if (error) {
        throw error;
      }

      console.log("Data added successfully", data);
      handleShow();
    } catch (error) {
      console.error("Error adding post", error.message);
    }
  };

  const handleShow = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*", {
        foreignKey: "user_id",
        foreignTable: "users",
        foreignColumns: ["full_name"],
      });

      if (error) {
        throw error;
      }

      setData(data);
      console.log("Data fetched successfully");
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  async function handledelete(id) {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (error) throw error;
      handleShow();
      console.log("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  }

  useEffect(() => {
    handleShow();
    handleuser();
  }, []);
  return (
    <>
      <Navbar />
      {session ? (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center mt-10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your post"
              className="border p-3 rounded-md"
            />
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              className="file-input mb-4 mt-5 border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300"
              onChange={handleImage}
            />
            <button
              className="w-20 h-10 bg-blue-700 text-white flex justify-center items-center rounded-full mt-4"
              onClick={handleAdd}
            >
              Submit
            </button>
          </div>

          <div className="mt-8 w-full max-w-md">
            <ul>
              <h1 className="mt-5 text-xl font-semibold">Posts</h1>
              {datas.map((item) => (
                <li key={item.id} className="">
                  <img src={item.image} alt="" />
                  <p className="text-lg">{item.content}</p>
                  <p className="text-gray-600 mt-2">Chat by {item.uName}</p>
                  <button
                    onClick={() => handledelete(item.id)}
                    className="text-red-500 mt-2 cursor-pointer"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="justify-center items-center flex">
          <div className="mt-60">
            <h1 className="">Please login to continue</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
