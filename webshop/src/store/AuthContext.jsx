import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <AuthContext.Provider value={{
      isLoggedIn: loggedIn,
      setIsLoggedIn: setLoggedIn
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;