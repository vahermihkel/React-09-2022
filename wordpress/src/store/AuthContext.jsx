import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("token") ? true : false);

  const loginHandler = (newToken) => {
    setLoggedIn(true);
    sessionStorage.setItem("token", newToken);
  }

  const logoutHandler = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: loggedIn,
      // setIsLoggedIn: setLoggedIn
      login: loginHandler,
      logout: logoutHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;