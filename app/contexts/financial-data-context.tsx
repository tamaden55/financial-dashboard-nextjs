"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { FinancialData } from '../components/company-search';

interface FinancialDataContextType {
  data: FinancialData | null;
  setData: (data: FinancialData) => void;
  clearData: () => void;
}

const FinancialDataContext = createContext<FinancialDataContextType | undefined>(undefined);

export function FinancialDataProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<FinancialData | null>(null);

  const setData = (newData: FinancialData) => {
    setDataState(newData);
  };

  const clearData = () => {
    setDataState(null);
  };

  return (
    <FinancialDataContext.Provider value={{ data, setData, clearData }}>
      {children}
    </FinancialDataContext.Provider>
  );
}

export function useFinancialData() {
  const context = useContext(FinancialDataContext);
  if (context === undefined) {
    throw new Error('useFinancialData must be used within a FinancialDataProvider');
  }
  return context;
}
