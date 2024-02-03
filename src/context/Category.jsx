import React, { useState } from "react";
import { createContext } from "react";
export const CategoryContext = createContext();
export const Category = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  return (
    <CategoryContext.Provider value={{ categoryData, setCategoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};
