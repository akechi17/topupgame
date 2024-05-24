import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
  token: null,
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem("TOKEN"));
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
  };

  return (
    <StateContext.Provider value={{ token, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);