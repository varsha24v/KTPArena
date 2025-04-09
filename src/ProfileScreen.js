import React, { useContext, useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ChallengeContext } from "./ChallengeContext";
import ConfettiCannon from "react-native-confetti-cannon";

export default function ProfileScreen() {
  const { challenges, currentUser } = useContext(ChallengeContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef(null);

  const totalPoints = challenges
    .filter((ch) => ch.assignedTo === currentUser.name && ch.completed)
    .reduce((sum, ch) => sum + ch.points, 0);

  const progress = totalPoints / 45;

  useEffect(() => {
    if (totalPoints >= 45 && !showConfetti) {
      setShowConfetti(true);
    }
  }, [totalPoints]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile 👤</Text>
      <Text>Name: {currentUser.name}</Text>
      <Text style={styles.points}>Points: {totalPoints} / 45</Text>

      <View style={styles.customBarContainer}>
        <View style={[styles.customBarFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
      </View>


      {showConfetti && (
        <ConfettiCannon
          count={80}
          origin={{ x: 200, y: -20 }}
          explosionSpeed={350}
          fallSpeed={3000}
          autoStart={true}
          fadeOut={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  points: { fontSize: 18, marginTop: 10, marginBottom: 10 },
  progress: { width: "80%", height: 10, borderRadius: 5 },

  customBarContainer: {
    width: "80%",
    height: 12,
    backgroundColor: "#ddd",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
  },
  customBarFill: {
    height: "100%",
    backgroundColor: "#3498db",
  },
  
});
