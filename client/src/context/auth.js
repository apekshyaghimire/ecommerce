import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Load auth on first render
  useEffect(() => {
    const data = localStorage.getItem("auth");
    const token = localStorage.getItem("authToken");

    if (data && token) {
      const parsed = JSON.parse(data);

      setAuth({
        user: parsed.user,
        token: token,     // ✅ correct place to set token
      });
    }
    //eslint-disable-next-line
  }, []);

  // Save to localStorage whenever auth changes
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: auth.user,
        })
      );
      localStorage.setItem("authToken", auth.token);
    } else {
      // localStorage.removeItem("auth");
      //localStorage.removeItem("authToken");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
