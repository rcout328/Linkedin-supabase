import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Auth/Login";
import { LoginProvider } from "./Auth/Context";
import Account from "./Components/Account";
import Chat from "./Components/Chat";
import Share from "./Components/Share";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Share />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
function App() {
  return (
    <>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </>
  );
}

export default App;
