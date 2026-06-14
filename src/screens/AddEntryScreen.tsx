import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { JournalContext } from "../context/JournalContext";

export default function AddEntryScreen({ navigation }: any) {
  const { addEntry } = useContext(JournalContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Gallery permission is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!title.trim()) return;

    Keyboard.dismiss();

    addEntry({
      id: Date.now().toString(),
      title,
      notes,
      image,
    });

    setTitle("");
    setNotes("");
    setImage(null);

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

      <Button title="Add Photo" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      )}

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

  preview: {
    width: "100%",
    height: 200,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
});