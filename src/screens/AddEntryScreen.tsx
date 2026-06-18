import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
  Platform,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import DateTimePicker from "@react-native-community/datetimepicker";

import { JournalContext } from "../context/JournalContext";

export default function AddEntryScreen({ navigation }: any) {
  const { addEntry } = useContext(JournalContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Gallery permission is required.");
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getCurrentLocation = async () => {
    const permission =
      await Location.requestForegroundPermissionsAsync();

    if (permission.status !== "granted") {
      alert("Location permission denied.");
      return;
    }

    try {
      const current =
        await Location.getCurrentPositionAsync({});

      const places =
        await Location.reverseGeocodeAsync({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        });

      if (places.length > 0) {
        const place = places[0];

        const locationParts = [];

        if (place.city) {
          locationParts.push(place.city);
        } else if (place.district) {
          locationParts.push(place.district);
        }

        if (place.region) {
          locationParts.push(place.region);
        }

        if (place.country) {
          locationParts.push(place.country);
        }

        setLocation(locationParts.join(", "));
      }
    } catch {
      alert("Unable to retrieve current location.");
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a trip title.");
      return;
    }

    Keyboard.dismiss();

    addEntry({
      id: Date.now().toString(),
      title,
      notes,
      image,
      location,
      date: date.toLocaleDateString(),
    });

    setTitle("");
    setNotes("");
    setImage(null);
    setLocation("");
    setDate(new Date());

    navigation.navigate("Home");
  };

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}
>
      <Text style={styles.heading}>
        Add New Entry
      </Text>

      <TextInput
        placeholder="Trip Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Location (e.g. Maldives)"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation}
      >
        <Text style={styles.buttonText}>
          Use Current GPS Location
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.buttonText}>
          📅 {date.toLocaleDateString()}
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
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        style={[styles.input, styles.notes]}
      />

      <TouchableOpacity
        style={styles.photoButton}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>
          Add Photo
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          Save Entry
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 15,
    fontFamily: "Montserrat_700Bold",
  },

  content: {
    paddingTop: 70,
    paddingBottom: 50,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
  },

  notes: {
    height: 120,
    textAlignVertical: "top",
  },

  locationButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },

  dateButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },

  photoButton: {
    backgroundColor: "#10b981",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#000",
    fontFamily: "Montserrat_700Bold",
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
});