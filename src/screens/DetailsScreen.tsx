import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

export default function DetailsScreen({ route }: any) {
  const { entry } = route.params;

  return (
    <ScrollView style={styles.container}>
      {entry.image ? (
        <Image
          source={{ uri: entry.image }}
          style={styles.image}
        />
      ) : null}

      <View style={styles.content}>
        <Text style={styles.title}>{entry.title}</Text>

        {entry.location ? (
          <Text style={styles.location}>
            📍 {entry.location}
          </Text>
        ) : null}

        <Text style={styles.sectionTitle}>
          Notes
        </Text>

        <Text style={styles.notes}>
          {entry.notes || "No notes available."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: 300,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  location: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  notes: {
    fontSize: 18,
    lineHeight: 28,
    color: "#444",
  },
});