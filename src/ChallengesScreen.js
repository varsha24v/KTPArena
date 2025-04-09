import React, { useRef, useContext } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import WheelOfFortune from "react-native-wheel-of-fortune";
import { ChallengeContext } from "./ChallengeContext"; 
import * as ImagePicker from "expo-image-picker";
import {Image} from "react-native";
const knob = require('../assets/images/knob.png');

export default function ChallengesScreen() {
  const wheelRef = useRef(null);
  const { challenges, currentUser, updateChallenge } = useContext(ChallengeContext);
  const myChallenges = challenges.filter((ch)=>ch.assignedTo===currentUser.name);

  const spinnerChallenges = ["Push-ups 💪", "Sing a song 🎤", "Dance battle 💃", "Tell a joke 🤡"];

  const handleCompleteChallenge = async (challenge) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Image,
      allowsEditing: true,
      quality: 0.5,
    });
  
    if (!result.canceled) {
      const updated = {
        ...challenge,
        completed: true,
        proofImage: result.assets[0].uri,
      };
  
      updateChallenge(updated);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spin the Wheel of Challenges 🎡</Text>

      {/* <WheelOfFortune
        options={{
          rewards: spinnerChallenges,
          knobSource: null,
          knobSize: 20,
          borderWidth: 3,
          innerRadius: 20,
          duration: 4000,
          backgroundColor: "#f39c12",
          getWinner: (value) => alert(`Challenge: ${value}`),
          onRef: (ref) => (wheelRef.current = ref),
        }}
      /> */}

      <Text style={styles.sectionTitle}>Current Challenges for {currentUser.name}:</Text>

      {myChallenges.length === 0 ? (
        <Text>No challenges assigned yet.</Text>
      ) : (
      myChallenges.map((ch, idx) => (
        <View key={idx} style={styles.challengeItem}>
          <Text>{ch.title}</Text>
          <Text>{ch.points} pts</Text>

          {ch.completed ? (
            <>
              <Text style={{ color: "green" }}>Completed</Text>
              {ch.proofImage && (
                <Image
                  source={{ uri: ch.proofImage }}
                  style={{ width: 100, height: 100, marginTop: 10 }}
                />
              )}
            </>
          ) : (
            <Button
              title="Mark as Completed"
              onPress={() => handleCompleteChallenge(ch)}
            />
          )}
        </View>
      ))
    )}



      <Button title="Spin the Wheel" onPress={() => wheelRef.current._onPress()} />

      
      
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  challengeItem: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  
});
