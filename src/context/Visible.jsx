import React, { useState } from "react";
import { createContext } from "react";
export const isRecordBarVisibleContext = createContext();
export const Record = ({ children }) => {
  const [isRecordBarVisible, setIsRecordBarVisible] = useState(false);
  return (
    <isRecordBarVisibleContext.Provider
      value={{ isRecordBarVisible, setIsRecordBarVisible }}
    >
      {children}
    </isRecordBarVisibleContext.Provider>
  );
};
