import React, { useContext, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { JournalContext } from "../context/JournalContext";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000";

export default function ListScreen({ navigation }: any) {
  const { entries } = useContext(JournalContext);

  const [search, setSearch] = useState("");

  const filteredEntries = entries.filter(
    (entry: any) =>
      entry.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      entry.location
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        My Trips
      </Text>

      <TextInput
        placeholder="🔍 Search trips..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={[...filteredEntries].sort(
          (a: any, b: any) =>
            Number(b.id) - Number(a.id)
        )}
        keyExtractor={(item: any) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => (
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

            <View style={styles.info}>
              <Text
                style={styles.title}
                numberOfLines={1}
              >
                {item.title}
              </Text>

              <Text style={styles.date}>
                📅 {item.date || "No date"}
              </Text>

              <Text style={styles.location}>
                📍 {item.location || "Unknown location"}
              </Text>

              <Text
                numberOfLines={2}
                style={styles.notes}
              >
                {item.notes || "No description"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 32,
    fontFamily: "Montserrat_700Bold",
    marginTop: 10,
    marginBottom: 15,
  },

  search: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    marginBottom: 18,
    elevation: 3,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 4,
  },

  date: {
    fontSize: 13,
    color: "#888",
    marginBottom: 4,
    fontFamily: "Montserrat_400Regular",
  },

  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontFamily: "Montserrat_400Regular",
  },

  notes: {
    color: "#555",
    fontFamily: "Montserrat_400Regular",
  },
});