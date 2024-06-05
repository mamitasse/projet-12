import axios from "axios";
import data from "./data.json";
import {
  formatUserData,
  formatUserActivity,
  formatUserAverageSessions,
  formatUserPerformance,
} from "./dataFormatter.js";

const BASE_URL = "http://localhost:3000"; // URL de votre backend
const USE_LOCAL_DATA = false; // Changez cette valeur pour utiliser les données locales ou l'API

const getUserById = async (id) => {
  if (USE_LOCAL_DATA) {
    try {
      const user = data.USER_MAIN_DATA.find((user) => user.id === Number(id));
      console.log("User data from local:", user);
      if (!user) throw new Error(`Utilisateur avec id ${id} non trouvé`);
      return { data: formatUserData(user) };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des données de l'utilisateur ${id} (local):`,
        error
      );
      throw error;
    }
  } else {
    try {
      const response = await axios.get(`${BASE_URL}/user/${id}`);
      console.log("User data from API:", response.data);
      const userData = response.data.data; // Ensure you are accessing the correct property
      // Sélectionner la bonne propriété en fonction de l'utilisateur
      userData.score =
        userData.score !== undefined ? userData.score : userData.todayScore;
      return { data: formatUserData(userData) };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des données de l'utilisateur ${id}:`,
        error
      );
      throw error;
    }
  }
};

const getUserActivityById = async (id) => {
  if (USE_LOCAL_DATA) {
    try {
      const activity = data.USER_ACTIVITY.find(
        (activity) => activity.userId === Number(id)
      );
      console.log("Activity data from local:", activity); // Ajout du console.log pour les données d'activité récupérées localement
      if (!activity)
        throw new Error(`Activité de l'utilisateur avec id ${id} non trouvée`);
      return { data: formatUserActivity(activity) };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des activités de l'utilisateur ${id} (local):`,
        error
      );
      throw error;
    }
  } else {
    try {
      const response = await axios.get(`${BASE_URL}/user/${id}/activity`);
      console.log("Activity data from API:", response.data); // Ajout du console.log pour les données d'activité récupérées depuis l'API
      if (
        !response.data ||
        !response.data.data ||
        !response.data.data.sessions
      ) {
        throw new Error(
          `Invalid data structure for user activity with id ${id}`
        );
      }
      return { data: formatUserActivity(response.data.data) };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des activités de l'utilisateur ${id}:`,
        error
      );
      throw error;
    }
  }
};

const getUserAverageSession = async (id) => {
  if (USE_LOCAL_DATA) {
    try {
      const averageSessions = data.USER_AVERAGE_SESSIONS.find(
        (averageSession) => averageSession.userId === Number(id)
      );
      console.log("Average sessions data from local:", averageSessions); // Log local data
      if (!averageSessions)
        throw new Error(
          `Sessions moyennes de l'utilisateur avec id ${id} non trouvées`
        );
      return { data: formatUserAverageSessions(averageSessions) };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des sessions moyennes de l'utilisateur ${id} (local):`,
        error
      );
      throw error;
    }
  } else {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/${id}/average-sessions`
      );
      console.log("Average sessions data from API:", response.data); // Log API data
      if (
        !response.data ||
        !response.data.data ||
        !response.data.data.sessions
      ) {
        throw new Error(
          `Invalid data structure for user average sessions with id ${id}`
        );
      }
      return { data: formatUserAverageSessions(response.data.data) };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des sessions moyennes de l'utilisateur ${id}:`,
        error
      );
      throw error;
    }
  }
};

const getUserPerformance = async (id) => {
  if (USE_LOCAL_DATA) {
    try {
      const performance = data.USER_PERFORMANCE.find(
        (perf) => perf.userId === Number(id)
      );
      console.log("Performance data from local:", performance); // Log local data
      if (!performance)
        throw new Error(
          `Performances de l'utilisateur avec id ${id} non trouvées`
        );
      return { data: formatUserPerformance(performance) };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des performances de l'utilisateur ${id} (local):`,
        error
      );
      throw error;
    }
  } else {
    try {
      const response = await axios.get(`${BASE_URL}/user/${id}/performance`);
      console.log("Performance data from API:", response.data); // Log API data
      if (!response.data || !response.data.data) {
        throw new Error(
          `Invalid data structure for user performance with id ${id}`
        );
      }
      return { data: formatUserPerformance(response.data.data) };
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des performances de l'utilisateur ${id}:`,
        error
      );
      throw error;
    }
  }
};

export {
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
};
