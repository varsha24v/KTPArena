import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

export default function CreateChallengeScreen() {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");

  const handleCreateChallenge = () => {
    const numericPoints = parseInt(points);

    if (!title || isNaN(numericPoints) || numericPoints > 5 || numericPoints < 1) {
      Alert.alert("Invalid input", "Make sure to enter a title and 1-5 points.");
      return;
    }

    // for now we just log it
    Alert.alert("Challenge Created", `${title} - ${points} points`);

    // Reset
    setTitle("");
    setPoints("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Challenge 📝</Text>

      <TextInput
        placeholder="Challenge Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Points (1-5)"
        value={points}
        onChangeText={setPoints}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Create Challenge" onPress={handleCreateChallenge} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
