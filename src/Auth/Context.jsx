import { createContext } from "react";
import { useState } from "react";
export const LoginContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  return (
    <LoginContext.Provider value={[session, setSession]}>
      {children}
    </LoginContext.Provider>
  );
};
