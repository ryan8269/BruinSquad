"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SigmaContextType {
  sigma: boolean;
  toggleSigma: () => void;
}

const SigmaContext = createContext<SigmaContextType | undefined>(undefined);

export const SigmaProvider = ({ children }: { children: ReactNode }) => {
  const [sigma, setSigma] = useState(false);

  const toggleSigma = () => setSigma((prev) => !prev);

  return (
    <SigmaContext.Provider value={{ sigma, toggleSigma }}>
      {children}
    </SigmaContext.Provider>
  );
};

export const useSigma = () => {
  const context = useContext(SigmaContext);
  if (!context) {
    throw new Error('useSigma must be used within a SigmaProvider');
  }
  return context;
};
