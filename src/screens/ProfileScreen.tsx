import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.pravatar.cc/200",
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>
        Your Profile
      </Text>

      <TextInput
        placeholder="First Name"
        style={styles.input}
      />

      <TextInput
        placeholder="Last Name"
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginTop: 20,
    marginBottom: 20,
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
});