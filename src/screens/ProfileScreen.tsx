import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_PROFILE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function ProfileScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [image, setImage] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem("profile");

    if (!data) return;

    const profile = JSON.parse(data);

    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setEmail(profile.email || "");
    setPhone(profile.phone || "");
    setImage(profile.image || DEFAULT_PROFILE);
  };

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
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

  const removeImage = () => {
    setImage(DEFAULT_PROFILE);
  };

  const saveProfile = async () => {
  await AsyncStorage.setItem(
    "profile",
    JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      image:
        image === DEFAULT_PROFILE
          ? ""
          : image,
    })
  );

  Alert.alert(
    "Success",
    "Profile saved successfully.",
    [
      {
        text: "OK",
      },
    ]
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.avatar}
      />

      <TouchableOpacity
        style={styles.photoButton}
        onPress={pickImage}
      >
        <Text style={styles.photoText}>
          Change Photo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={removeImage}
      >
        <Text style={styles.removeText}>
          Remove Photo
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        My Profile
      </Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveProfile}
      >
        <Text style={styles.saveText}>
          Save Profile
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 10,
  },

  photoButton: {
    marginTop: 15,
  },

  photoText: {
    color: "#2563eb",
    fontFamily: "Montserrat_700Bold",
  },

  removeButton: {
    marginTop: 8,
    marginBottom: 20,
  },

  removeText: {
    color: "#d32f2f",
    fontFamily: "Montserrat_700Bold",
  },

  title: {
    fontSize: 32,
    marginBottom: 25,
    fontFamily: "Montserrat_700Bold",
  },

  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
  },

  saveButton: {
    width: "100%",
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
});