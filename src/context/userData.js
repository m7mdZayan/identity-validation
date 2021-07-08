import { createContext, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    info: "",
    transactionId: "",
    acessToken: "",
  });

  return (
    <userContext.Provider value={[userData, setUserData]}>
      {children}
    </userContext.Provider>
  );
};
