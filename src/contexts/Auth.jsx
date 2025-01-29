import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = () => {
      const userToken = JSON.parse(localStorage.getItem("token"));
      const usersStorage = JSON.parse(localStorage.getItem("user")) || [];

      if (userToken && Array.isArray(usersStorage)) {
        const storedUser = usersStorage.find(
          (user) => user.email === userToken.email
        );

        if (storedUser) {
          setUser(storedUser);
        } else {
          localStorage.removeItem("token");
        }
      }
    };

    validateToken();
  }, []);

  const signin = (email, token) => {
    const usersStorage = JSON.parse(localStorage.getItem("user")) || [];
    const newUser = { email, token };

    usersStorage.push(newUser);
    localStorage.setItem("user", JSON.stringify(usersStorage));
    localStorage.setItem("token", JSON.stringify({ email, token }));
    setUser(newUser);
  };

  const signup = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("user")) || [];

    const hasUser = usersStorage.some((user) => user.email === email);

    if (hasUser) {
      return "Já tem uma conta com esse E-mail";
    }

    const newUser = [...usersStorage, { email, password }];
    localStorage.setItem("user", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
