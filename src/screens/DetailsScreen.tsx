import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sample Trip
      </Text>

      <Text style={styles.section}>
        📍 Location:
      </Text>
      <Text>Location will appear here</Text>

      <Text style={styles.section}>
        📝 Notes:
      </Text>
      <Text>
        Journal notes will appear here.
      </Text>

      <Text style={styles.section}>
        📷 Photo:
      </Text>
      <Text>No photo available</Text>
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});