import React, {
  useContext,
  useState,
  useCallback,
} from "react";

import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { JournalContext } from "../context/JournalContext";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000";

const PROFILE_PLACEHOLDER =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function HomeScreen({ navigation }: any) {
  const { entries } = useContext(JournalContext);

  const [profileName, setProfileName] = useState("Traveler");
  const [profileImage, setProfileImage] = useState(PROFILE_PLACEHOLDER);

  useFocusEffect(
  useCallback(() => {
    loadProfile();
  }, [])
);

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem("profile");

    if (data) {
      const profile = JSON.parse(data);

      if (profile.firstName?.trim()) {
        setProfileName(profile.firstName);
      } else {
        setProfileName("Traveler");
      }

      if (profile.image) {
        setProfileImage(profile.image);
      } else {
        setProfileImage(PROFILE_PLACEHOLDER);
      }
    }
  };

  const recentEntries = [...entries]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 2);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.travel}>Travel</Text>

          <Text style={styles.world}>
            the <Text style={styles.green}>world!</Text>
          </Text>

          <Text style={styles.username}>
            Hello, {profileName}
          </Text>
        </View>

        <Image
          source={{
            uri: profileImage,
          }}
          style={styles.avatar}
        />
      </View>

      <Text style={styles.subtitle}>
        Recently Added
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", {
                entry: item,
              })
            }
          >
            <Image
              source={{
                uri: item.image || PLACEHOLDER,
              }}
              style={styles.image}
            />

            <View style={{ padding: 12 }}>
              <Text
                numberOfLines={1}
                style={styles.cardTitle}
              >
                {item.title}
              </Text>

              <Text
                numberOfLines={1}
                style={styles.date}
              >
                {item.date || "No date"}
              </Text>

              <Text
                numberOfLines={2}
                style={styles.cardText}
              >
                {item.notes}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {entries.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>
            ✈️
          </Text>

          <Text style={styles.emptyTitle}>
            No adventures yet
          </Text>

          <Text style={styles.emptyText}>
            Create your first travel memory
            using the Add tab below.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  travel: {
    fontSize: 42,
    fontFamily: "Montserrat_700Bold",
  },

  world: {
    fontSize: 38,
    fontFamily: "Montserrat_400Regular",
  },

  green: {
    color: "#49c000",
    fontFamily: "Montserrat_700Bold",
  },

  username: {
    marginTop: 8,
    color: "#666",
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },

  subtitle: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 15,
  },

  card: {
    width: 180,
    height: 235,
    backgroundColor: "#fff",
    borderRadius: 22,
    marginRight: 18,
    overflow: "hidden",
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 120,
  },

  cardTitle: {
    fontSize: 19,
    fontFamily: "Montserrat_700Bold",
  },

  date: {
    color: "#999",
    marginTop: 3,
    marginBottom: 5,
    fontSize: 13,
    fontFamily: "Montserrat_400Regular",
  },

  cardText: {
    color: "#666",
    fontFamily: "Montserrat_400Regular",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyEmoji: {
    fontSize: 60,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 28,
    fontFamily: "Montserrat_700Bold",
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
});