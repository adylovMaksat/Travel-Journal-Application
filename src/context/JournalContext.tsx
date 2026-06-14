import React, { createContext, useState } from 'react';

export const JournalContext = createContext<any>(null);

export const JournalProvider = ({ children }: any) => {
  const [entries, setEntries] = useState<any[]>([]);

  const addEntry = (entry: any) => {
    setEntries((prev) => [...prev, entry]);
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
};