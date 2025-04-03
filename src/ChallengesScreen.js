import React, { useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import WheelOfFortune from "react-native-wheel-of-fortune";

export default function ChallengesScreen() {
  const challenges = ["Push-ups 💪", "Sing a song 🎤", "Dance battle 💃", "Tell a joke 🤡"];
  const wheelRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spin the Wheel of Challenges 🎡</Text>
      <WheelOfFortune
        rewards={challenges}
        knobSize={20}
        borderWidth={3}
        innerRadius={20}
        duration={4000}
        backgroundColor={"#f39c12"}
        getWinner={(value) => alert(`Challenge: ${value}`)}
        ref={wheelRef}
      />
      <Button title="Spin the Wheel" onPress={() => wheelRef.current._onPress()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
