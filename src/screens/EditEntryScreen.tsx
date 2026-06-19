import React, {
  useContext,
  useState,
} from "react";

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import DateTimePicker from "@react-native-community/datetimepicker";

import { JournalContext } from "../context/JournalContext";

export default function EditEntryScreen({
  route,
  navigation,
}: any) {
  const { entry } = route.params;

  const { updateEntry } =
    useContext(JournalContext);

  const [title, setTitle] =
    useState(entry.title);

  const [notes, setNotes] =
    useState(entry.notes);

  const [location, setLocation] =
    useState(entry.location);

  const [image, setImage] =
    useState(entry.image);

  const [date, setDate] =
    useState(
      entry.date
        ? new Date(entry.date)
        : new Date()
    );

  const [showDatePicker,
    setShowDatePicker] =
    useState(false);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert(
        "Gallery permission required."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync(
        {
          allowsEditing: true,
          quality: 1,
        }
      );

    if (!result.canceled) {
      setImage(
        result.assets[0].uri
      );
    }
  };

  const handleSave = () => {
    updateEntry({
      ...entry,
      title,
      notes,
      image,
      location,
      date:
        date.toLocaleDateString(),
    });

    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <Text style={styles.heading}>
        Edit Trip
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Trip Title"
        style={styles.input}
      />

      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() =>
          setShowDatePicker(true)
        }
      >
        <Text
          style={styles.buttonText}
        >
          📅{" "}
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={
            Platform.OS === "ios"
              ? "spinner"
              : "default"
          }
          onChange={(
            event,
            selectedDate
          ) => {
            setShowDatePicker(
              false
            );

            if (selectedDate) {
              setDate(
                selectedDate
              );
            }
          }}
        />
      )}

      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes"
        multiline
        style={[
          styles.input,
          styles.notes,
        ]}
      />

      <TouchableOpacity
        style={styles.photoButton}
        onPress={pickImage}
      >
        <Text
          style={styles.buttonText}
        >
          Change Photo
        </Text>
      </TouchableOpacity>

      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      ) : null}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text
          style={styles.saveText}
        >
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#f5f5f5",
      padding: 20,
    },

    heading: {
      fontSize: 30,
      marginBottom: 20,
      fontFamily:
        "Montserrat_700Bold",
    },

    input: {
      backgroundColor:
        "#fff",
      padding: 15,
      borderRadius: 15,
      marginBottom: 15,
      fontFamily:
        "Montserrat_400Regular",
    },

    notes: {
      height: 120,
      textAlignVertical:
        "top",
    },

    dateButton: {
      backgroundColor:
        "#fff",
      padding: 15,
      borderRadius: 15,
      alignItems: "center",
      marginBottom: 15,
    },

    photoButton: {
      backgroundColor:
        "#10b981",
      padding: 15,
      borderRadius: 15,
      alignItems: "center",
      marginBottom: 15,
    },

    buttonText: {
      fontFamily:
        "Montserrat_700Bold",
    },

    preview: {
      width: "100%",
      height: 220,
      borderRadius: 15,
      marginBottom: 15,
    },

    saveButton: {
      backgroundColor:
        "#2563eb",
      padding: 18,
      borderRadius: 15,
      alignItems: "center",
    },

    saveText: {
      color: "white",
      fontSize: 18,
      fontFamily:
        "Montserrat_700Bold",
    },
  });