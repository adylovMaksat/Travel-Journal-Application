import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import { JournalContext } from "../context/JournalContext";

export default function HomeScreen({ navigation }: any) {
  const { entries } = useContext(JournalContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Travel Journal</Text>

      {entries.length === 0 ? (
        <Text style={styles.empty}>
          No journal entries yet.
        </Text>
      ) : (
        <FlatList
          data={entries}
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
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />
              )}

              <Text style={styles.title}>
                {item.title}
              </Text>

              {item.location ? (
                <Text style={styles.location}>
                  📍 {item.location}
                </Text>
              ) : null}

              {item.notes ? (
                <Text
                  numberOfLines={2}
                  style={styles.notes}
                >
                  {item.notes}
                </Text>
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "gray",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 200,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  location: {
    fontSize: 16,
    color: "#555",
    paddingHorizontal: 15,
    marginTop: 5,
  },

  notes: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#666",
  },
});