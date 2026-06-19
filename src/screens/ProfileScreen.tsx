import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  View,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { JournalContext } from "../context/JournalContext";

const DEFAULT_PROFILE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function ProfileScreen() {
  const { entries } = useContext(JournalContext);

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [image, setImage] =
    useState(DEFAULT_PROFILE);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data =
      await AsyncStorage.getItem(
        "profile"
      );

    if (!data) return;

    const profile = JSON.parse(data);

    setFirstName(
      profile.firstName || ""
    );

    setLastName(
      profile.lastName || ""
    );

    setEmail(profile.email || "");

    setPhone(profile.phone || "");

    setImage(
      profile.image ||
        DEFAULT_PROFILE
    );
  };

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required"
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
          image ===
          DEFAULT_PROFILE
            ? ""
            : image,
      })
    );

    Alert.alert(
      "Success",
      "Profile saved successfully."
    );
  };

  const totalTrips =
    entries.length;

  const placesVisited =
    new Set(
      entries.map(
        (entry: any) =>
          entry.location
      )
    ).size;

  const lastTrip =
    entries.length > 0
      ? entries[0].title
      : "None";

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <Image
          source={{ uri: image }}
          style={styles.avatar}
        />

        <TouchableOpacity
          style={styles.photoButton}
          onPress={pickImage}
        >
          <Text
            style={styles.photoText}
          >
            Change Photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={removeImage}
        >
          <Text
            style={styles.removeText}
          >
            Remove Photo
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          My Profile
        </Text>

        <View
          style={
            styles.statsContainer
          }
        >
          <View
            style={styles.statBox}
          >
            <Text
              style={
                styles.statNumber
              }
            >
              {totalTrips}
            </Text>

            <Text
              style={
                styles.statLabel
              }
            >
              Trips
            </Text>
          </View>

          <View
            style={styles.statBox}
          >
            <Text
              style={
                styles.statNumber
              }
            >
              {placesVisited}
            </Text>

            <Text
              style={
                styles.statLabel
              }
            >
              Places
            </Text>
          </View>

          <View
            style={styles.statBox}
          >
            <Text
              numberOfLines={1}
              style={
                styles.statNumber
              }
            >
              {lastTrip}
            </Text>

            <Text
              style={
                styles.statLabel
              }
            >
              Last Trip
            </Text>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={
            setFirstName
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={
            setLastName
          }
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
          <Text
            style={styles.saveText}
          >
            Save Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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

    avatar: {
      width: 140,
      height: 140,
      borderRadius: 70,
      alignSelf: "center",
      marginTop: 10,
    },

    photoButton: {
      marginTop: 15,
      alignItems: "center",
    },

    photoText: {
      color: "#2563eb",
      fontFamily:
        "Montserrat_700Bold",
    },

    removeButton: {
      marginTop: 8,
      marginBottom: 20,
      alignItems: "center",
    },

    removeText: {
      color: "#d32f2f",
      fontFamily:
        "Montserrat_700Bold",
    },

    title: {
      fontSize: 32,
      marginBottom: 20,
      textAlign: "center",
      fontFamily:
        "Montserrat_700Bold",
    },

    statsContainer: {
      flexDirection: "row",
      marginBottom: 25,
    },

    statBox: {
      flex: 1,
      backgroundColor:
        "#fff",
      padding: 15,
      borderRadius: 15,
      marginHorizontal: 4,
      alignItems: "center",
    },

    statNumber: {
      fontSize: 18,
      fontFamily:
        "Montserrat_700Bold",
    },

    statLabel: {
      color: "#666",
      marginTop: 4,
    },

    input: {
      width: "100%",
      backgroundColor:
        "white",
      padding: 16,
      borderRadius: 15,
      marginBottom: 15,
      fontFamily:
        "Montserrat_400Regular",
    },

    saveButton: {
      backgroundColor:
        "#2563eb",
      padding: 18,
      borderRadius: 18,
      alignItems: "center",
      marginTop: 10,
      marginBottom: 30,
    },

    saveText: {
      color: "white",
      fontSize: 18,
      fontFamily:
        "Montserrat_700Bold",
    },
  });