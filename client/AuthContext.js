import React, { useState, useContext, useEffect } from "react";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        try {
          const res = await currentUser(idTokenResult.token);
          setToken(idTokenResult.token);
          setUser(res.data);
          setProfilePic(res.data.picture);
          setUsername(res.data.name);
          setEmail(res.data.email);
          setUserId(res.data._id);

          // console.log("Current user", res);
        } catch (err) {
          console.log(err);
        }
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
        userId,
        setUserId,
        username,
        setUsername,
        profilePic,
        setProfilePic,
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
