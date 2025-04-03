import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ChallengeButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
