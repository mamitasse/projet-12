const formatUserData = (data) => {
  return {
    id: data.id,
    userInfos: {
      firstName: data.userInfos.firstName,
      lastName: data.userInfos.lastName,
      age: data.userInfos.age,
    },
    score: data.score !== undefined ? data.score : data.todayScore,
    keyData: {
      calorieCount: data.keyData.calorieCount,
      proteinCount: data.keyData.proteinCount,
      carbohydrateCount: data.keyData.carbohydrateCount,
      lipidCount: data.keyData.lipidCount,
    },
  };
};

const formatUserActivity = (data) => {
  if (!data.sessions) {
    throw new Error("Sessions data is missing");
  }
  return {
    userId: data.userId,
    sessions: data.sessions.map((session) => ({
      day: session.day,
      kilogram: session.kilogram,
      calories: session.calories,
    })),
  };
};


const formatUserAverageSessions = (data) => {
  if (!data.sessions) {
    throw new Error("Sessions data is missing in average sessions");
  }
  return {
    userId: data.userId,
    sessions: data.sessions.map((session) => ({
      day: session.day,
      sessionLength: session.sessionLength,
    })),
  };
};

const formatUserPerformance = (data) => {
  if (!data.data) {
    throw new Error("Performance data is missing or incorrect");
  }
  return {
    userId: data.userId,
    kind: data.kind,
    data: data.data.map((performance) => ({
      value: performance.value,
      kind: performance.kind,
    })),
  };
};

export {
  formatUserData,
  formatUserActivity,
  formatUserAverageSessions,
  formatUserPerformance,
};
