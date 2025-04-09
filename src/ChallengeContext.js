import React, { createContext, useState } from "react";

export const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([]);

  // random ahh users
  const mockUsers = [
    { id: 1, name: "Shiva", role: "new" }, 
    { id: 2, name: "John cena", role: "new" },
    { id: 3, name: "MJ", role: "new" },
    { id: 4, name: "Varsha", role: "active" },
  ];

  const addChallenge = (challenge) => {
    setChallenges((prev) => [...prev, challenge]);
  };

  const currentUser = { name: "Shiva", role: "new" };

  const updateChallenge = (updatedChallenge) => {
    setChallenges((prev) =>
      prev.map((ch) => ch.title === updatedChallenge.title && ch.assignedTo === updatedChallenge.assignedTo
          ? updatedChallenge : ch
      )
    );
  };

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        addChallenge,
        updateChallenge,
        mockUsers, 
        currentUser,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
