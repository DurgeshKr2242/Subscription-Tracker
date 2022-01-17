import React, { useState, useContext, useEffect } from "react";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setIsLoading(true);
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
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);

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
        isLoading,
        setIsLoading,
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
