import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";

import { JournalContext } from "../context/JournalContext";

export default function HomeScreen({ navigation }: any) {
  const { entries } = useContext(JournalContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Journal</Text>

      {entries.length === 0 ? (
        <Text style={styles.emptyText}>
          No journal entries yet.
        </Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.entry}>
              • {item.title}
            </Text>
          )}
        />
      )}

      <Button
        title="View Sample Entry"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 20,
  },
  entry: {
    fontSize: 18,
    paddingVertical: 8,
  },
});