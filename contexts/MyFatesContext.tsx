"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { getMyFates } from "@/lib/topups";

type MyFatesContextType = {
  myFates: number;
  fetchMyFates: () => Promise<void>;
  setMyFates: (val: number) => void;
};

const MyFatesContext = createContext<MyFatesContextType | undefined>(undefined);

export const MyFatesProvider = ({ children }: { children: React.ReactNode }) => {
  const [myFates, setMyFates] = useState<number>(0);

  const fetchMyFates = useCallback(async () => {
    const val = await getMyFates();
    setMyFates(val);
  }, []);

  return (
    <MyFatesContext.Provider value={{ myFates, fetchMyFates, setMyFates }}>
      {children}
    </MyFatesContext.Provider>
  );
};

export function useMyFates() {
  const ctx = useContext(MyFatesContext);
  if (!ctx) throw new Error("useMyFates must be used within MyFatesProvider");
  return ctx;
}