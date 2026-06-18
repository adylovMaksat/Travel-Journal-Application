import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const JournalContext = createContext();

export const JournalProvider = ({
  children,
}) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    saveEntries();
  }, [entries]);

  const loadEntries = async () => {
    try {
      const saved =
        await AsyncStorage.getItem(
          "journalEntries"
        );

      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch {}
  };

  const saveEntries = async () => {
    try {
      await AsyncStorage.setItem(
        "journalEntries",
        JSON.stringify(entries)
      );
    } catch {}
  };

  const addEntry = (entry) => {
    setEntries((prev) => [
      entry,
      ...prev,
    ]);
  };

  const deleteEntry = (id) => {
    setEntries((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        addEntry,
        deleteEntry,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};