import React, { createContext, useState } from "react";

export const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([]);

  const addChallenge = (challenge) => {
    setChallenges((prev) => [...prev, challenge]);
  };

  return (
    <ChallengeContext.Provider value={{ challenges, addChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};
