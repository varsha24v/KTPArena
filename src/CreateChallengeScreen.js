import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ChallengeContext } from "./ChallengeContext";
import {Picker} from "@react-native-picker/picker";

export default function CreateChallengeScreen() {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const { addChallenge, mockUsers } = useContext(ChallengeContext);


  const handleCreateChallenge = () => {
    const numericPoints = parseInt(points);
  
    if (!title || isNaN(numericPoints) || numericPoints > 45 || numericPoints < 1) {
      Alert.alert("Invalid input", "Make sure to enter a title and 1–5 points.");
      return;
    }
  
    if (!assignedTo) {
      Alert.alert("Missing assignment", "Please assign this challenge to a user.");
      return;
    }
  
    const newChallenge = {
      title,
      points: numericPoints,
      assignedTo,
      completed: false,
      proofImage: null,
    };
  
    addChallenge(newChallenge); 
    Alert.alert("Challenge Created", `${title} - ${points} points for ${assignedTo}`);
  
    // Reset
    setTitle("");
    setPoints("");
    setAssignedTo("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Create a Challenge 📝</Text>
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Points (1–5)"
            value={points}
            onChangeText={setPoints}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Assign to:</Text>
          {/* dropdown */}
          <Picker
            selectedValue={assignedTo}
            style={styles.input}
            onValueChange={(itemValue) => setAssignedTo(itemValue)}
          >
            <Picker.Item label="Select a user..." value="" color="black"/>
            {mockUsers
              .filter((user) => user.role === "new")
              .map((user) => (
                <Picker.Item key={user.id} label={user.name} value={user.name} color="black" />
              ))}
          </Picker>

          <Button title="Create Challenge" onPress={handleCreateChallenge} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  label: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginTop: 10,
  },
});
