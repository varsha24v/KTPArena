import React, { useRef, useContext } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import WheelOfFortune from "react-native-wheel-of-fortune";
import { ChallengeContext } from "./ChallengeContext"; // ✅ use context

const knob = require('../assets/images/knob.png');

export default function ChallengesScreen() {
  const wheelRef = useRef(null);
  const { challenges } = useContext(ChallengeContext); // ✅ grab stored challenges

  const spinnerChallenges = ["Push-ups 💪", "Sing a song 🎤", "Dance battle 💃", "Tell a joke 🤡"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spin the Wheel of Challenges 🎡</Text>

      <WheelOfFortune
        options={{
          rewards: spinnerChallenges,
          knobSource: knob,
          knobSize: 20,
          borderWidth: 3,
          innerRadius: 20,
          duration: 4000,
          backgroundColor: "#f39c12",
          getWinner: (value) => alert(`Challenge: ${value}`),
          onRef: (ref) => (wheelRef.current = ref),
        }}
      />

      <Button title="Spin the Wheel" onPress={() => wheelRef.current._onPress()} />

      
      <View style={styles.challengeList}>
        <Text style={styles.subheading}>Current Challenges</Text>
        {challenges.length === 0 ? (
          <Text style={styles.empty}>No challenges assigned yet.</Text>
        ) : (
          <FlatList
            data={challenges}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.challengeItem}>
                <Text style={styles.challengeText}>{item.title}</Text>
                <Text style={styles.pointText}>{item.points} pts</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, marginTop: 30 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subheading: { fontSize: 18, fontWeight: "bold", marginTop: 30, marginBottom: 10 },
  empty: { fontStyle: "italic", color: "#555" },
  challengeList: { width: "100%", marginTop: 10, flex: 1 },
  challengeItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  challengeText: { fontSize: 16 },
  pointText: { fontWeight: "bold", color: "#3498db" },
});
