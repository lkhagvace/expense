import React, { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();
export const User = ({ children }) => {
  const [newUser, setNewUser] = useState({});
  return (
    <UserContext.Provider
      value={{
        newUser,
        setNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
