import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
} from "react-native";

import { JournalContext } from "../context/JournalContext";

export default function AddEntryScreen({ navigation }: any) {
  const { addEntry } = useContext(JournalContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;

    // Close the keyboard
    Keyboard.dismiss();

    // Save the new entry
    addEntry({
      id: Date.now().toString(),
      title,
      notes,
    });

    // Clear the form
    setTitle("");
    setNotes("");

    // Go back to Home screen
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Entry</Text>

      <TextInput
        placeholder="Trip Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        style={[styles.input, styles.notes]}
      />

      <Button title="Add Photo" onPress={() => {}} />

      <View style={styles.spacing} />

      <Button title="Get Location" onPress={() => {}} />

      <View style={styles.spacing} />

      <Button title="Save Entry" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  notes: {
    height: 120,
    textAlignVertical: "top",
  },
  spacing: {
    height: 10,
  },
});