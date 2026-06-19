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

export default function DetailsScreen({
  route,
  navigation,
}: any) {
  const { entry } = route.params;

  const { deleteEntry } =
    useContext(JournalContext);

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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: entry.image || PLACEHOLDER,
          }}
          style={styles.image}
        />

        <View style={styles.overlay} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {entry.title}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
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
          style={styles.editButton}
          onPress={() =>
            navigation.navigate(
              "EditEntry",
              {
                entry,
              }
            )
          }
        >
          <Text style={styles.editText}>
            Edit Entry
          </Text>
        </TouchableOpacity>

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

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 340,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 140,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  titleContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontFamily: "Montserrat_700Bold",
  },

  content: {
    marginTop: -20,
    padding: 20,
  },

  infoBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 22,
    marginBottom: 18,
    elevation: 4,
  },

  label: {
    color: "#777",
    marginBottom: 8,
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
  },

  value: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
  },

  notes: {
    fontSize: 17,
    lineHeight: 28,
    color: "#444",
    fontFamily: "Montserrat_400Regular",
  },

  editButton: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  editText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },

  deleteButton: {
    backgroundColor: "#e53935",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },

  deleteText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
});