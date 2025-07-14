"use client";
import React, { createContext, useContext } from "react";

interface HeaderContextProps {
  showHeader: boolean;
}

export const HeaderContext = createContext<HeaderContextProps>({
  showHeader: true,
});

export const useHeader = () => useContext(HeaderContext);
