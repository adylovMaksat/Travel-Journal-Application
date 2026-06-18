import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { JournalContext } from "../context/JournalContext";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000";

export default function DetailsScreen({ route, navigation }: any) {
  const { entry } = route.params;

  const { deleteEntry } = useContext(JournalContext);

  const handleDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this travel journal?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteEntry(entry.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: entry.image || PLACEHOLDER,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {entry.title}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>
            📅 Travel Date
          </Text>

          <Text style={styles.value}>
            {entry.date || "Not specified"}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>
            📍 Location
          </Text>

          <Text style={styles.value}>
            {entry.location || "Unknown"}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>
            📝 Notes
          </Text>

          <Text style={styles.notes}>
            {entry.notes || "No notes added."}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteText}>
            Delete Entry
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  image: {
    width: "100%",
    height: 280,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 25,
  },

  infoBox: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    elevation: 3,
  },

  label: {
    fontSize: 15,
    color: "#666",
    marginBottom: 6,
    fontFamily: "Montserrat_400Regular",
  },

  value: {
    fontSize: 19,
    fontFamily: "Montserrat_700Bold",
  },

  notes: {
    fontSize: 17,
    lineHeight: 26,
    fontFamily: "Montserrat_400Regular",
  },

  deleteButton: {
    backgroundColor: "#e53935",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },

  deleteText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
});