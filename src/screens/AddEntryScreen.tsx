import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

export default function AddEntryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Entry</Text>

      <TextInput
        placeholder="Trip Title"
        style={styles.input}
      />

      <TextInput
        placeholder="Notes"
        multiline
        style={[styles.input, styles.notes]}
      />

      <Button title="Add Photo" onPress={() => {}} />

      <View style={styles.spacing} />

      <Button title="Get Location" onPress={() => {}} />

      <View style={styles.spacing} />

      <Button title="Save Entry" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  notes: {
    height: 120,
    textAlignVertical: 'top',
  },
  spacing: {
    height: 10,
  },
});