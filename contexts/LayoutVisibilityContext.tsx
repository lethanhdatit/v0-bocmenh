'use client'

import React, { createContext, useContext, useState } from "react";

type LayoutVisibilityContextType = {
  showNav: boolean;
  showFooter: boolean;
  setShowNav: (v: boolean) => void;
  setShowFooter: (v: boolean) => void;
  hideNav: () => void;
  showNavFn: () => void;
  hideFooter: () => void;
  showFooterFn: () => void;
};

const LayoutVisibilityContext = createContext<LayoutVisibilityContextType | undefined>(undefined);

export function LayoutVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  return (
    <LayoutVisibilityContext.Provider
      value={{
        showNav,
        showFooter,
        setShowNav,
        setShowFooter,
        hideNav: () => setShowNav(false),
        showNavFn: () => setShowNav(true),
        hideFooter: () => setShowFooter(false),
        showFooterFn: () => setShowFooter(true),
      }}
    >
      {children}
    </LayoutVisibilityContext.Provider>
  );
}

export function useLayoutVisibility() {
  const ctx = useContext(LayoutVisibilityContext);
  if (!ctx) throw new Error("useLayoutVisibility must be used within LayoutVisibilityProvider");
  return ctx;
}