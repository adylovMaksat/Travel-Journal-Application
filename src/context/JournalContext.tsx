import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const JournalContext = createContext<any>(null);

export const JournalProvider = ({ children }: any) => {
  const [entries, setEntries] = useState<any[]>([]);

  // Load entries when the app starts
  useEffect(() => {
    loadEntries();
  }, []);

  // Save entries whenever they change
  useEffect(() => {
    saveEntries();
  }, [entries]);

  const loadEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem("journalEntries");

      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.log("Error loading entries:", error);
    }
  };

  const saveEntries = async () => {
    try {
      await AsyncStorage.setItem(
        "journalEntries",
        JSON.stringify(entries)
      );
    } catch (error) {
      console.log("Error saving entries:", error);
    }
  };

  const addEntry = (entry: any) => {
    setEntries((prev) => [...prev, entry]);
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        addEntry,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};