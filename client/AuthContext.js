import React, { useState, useContext, useEffect } from "react";
import { auth } from "./firebase";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        setEmail(user.email);
        setToken(idTokenResult.token);
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        email,
        setEmail,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
