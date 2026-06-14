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
import * as Location from "expo-location";

import { JournalContext } from "../context/JournalContext";

export default function AddEntryScreen({ navigation }: any) {
  const { addEntry } = useContext(JournalContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState("");

  // Pick image from gallery
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Gallery permission is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Get current location and convert it to a readable place
  const getCurrentLocation = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (permission.status !== "granted") {
      alert("Location permission denied.");
      return;
    }

    try {
      const current = await Location.getCurrentPositionAsync({});

      const places = await Location.reverseGeocodeAsync({
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

        if (locationParts.length > 0) {
          setLocation(locationParts.join(", "));
        } else {
          setLocation(
            `${current.coords.latitude.toFixed(
              5
            )}, ${current.coords.longitude.toFixed(5)}`
          );
        }
      } else {
        setLocation(
          `${current.coords.latitude.toFixed(
            5
          )}, ${current.coords.longitude.toFixed(5)}`
        );
      }
    } catch (error) {
      alert("Unable to retrieve current location.");
    }
  };

  // Save entry
  const handleSave = () => {
    if (!title.trim()) return;

    Keyboard.dismiss();

    addEntry({
      id: Date.now().toString(),
      title,
      notes,
      image,
      location,
    });

    setTitle("");
    setNotes("");
    setImage(null);
    setLocation("");

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
        placeholder="Location (e.g. Maldives)"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <Button
        title="Use Current GPS Location"
        onPress={getCurrentLocation}
      />

      <View style={styles.spacing} />

      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        style={[styles.input, styles.notes]}
      />

      <Button
        title="Add Photo"
        onPress={pickImage}
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.preview}
        />
      )}

      <View style={styles.spacing} />

      <Button
        title="Save Entry"
        onPress={handleSave}
      />
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