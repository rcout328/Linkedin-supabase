import { createContext } from "react";
import { useState } from "react";
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  return (
    <LoginContext.Provider value={[session, setSession]}>
      {children}
    </LoginContext.Provider>
  );
};
