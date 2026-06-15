import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { JournalContext } from "../context/JournalContext";

export default function ListScreen({ navigation }: any) {
  const { entries } = useContext(JournalContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My List
      </Text>

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

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {item.title}
              </Text>

              <Text numberOfLines={2}>
                {item.notes}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});