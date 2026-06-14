import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Alert,
} from "react-native";

import { JournalContext } from "../context/JournalContext";

export default function DetailsScreen({
  route,
  navigation,
}: any) {
  const { entry } = route.params;

  const { deleteEntry } = useContext(JournalContext);

  const handleDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this journal entry?",
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
      {entry.image ? (
        <Image
          source={{ uri: entry.image }}
          style={styles.image}
        />
      ) : null}

      <View style={styles.content}>
        <Text style={styles.title}>
          {entry.title}
        </Text>

        {entry.location ? (
          <Text style={styles.location}>
            📍 {entry.location}
          </Text>
        ) : null}

        <Text style={styles.section}>
          Notes
        </Text>

        <Text style={styles.notes}>
          {entry.notes || "No notes available."}
        </Text>

        <View style={{ marginTop: 30 }}>
          <Button
            title="Delete Entry"
            color="red"
            onPress={handleDelete}
          />
        </View>
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

  section: {
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