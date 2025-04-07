import React from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/AppNavigator";
import { ChallengeProvider } from "./src/ChallengeContext";

export default function App() {
  return (
    <ChallengeProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </ChallengeProvider>
  );
}
