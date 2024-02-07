import React, { useState } from "react";
import { createContext } from "react";
export const VisibleCategoryContext = createContext();

export const VisibleCategory = ({ children }) => {
  const [isCategorybarVisible, setIsCategorybarVisible] = useState(false);
  return (
    <VisibleCategoryContext.Provider
      value={{ isCategorybarVisible, setIsCategorybarVisible }}
    >
      {children}
    </VisibleCategoryContext.Provider>
  );
};
