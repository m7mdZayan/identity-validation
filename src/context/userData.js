import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    info: "",
    transactionId: "",
  });

  return (
    <userContext.Provider value={[userData, setUserData]}>
      {children}
    </userContext.Provider>
  );
};
