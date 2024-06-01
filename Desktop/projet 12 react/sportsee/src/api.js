import axios from 'axios';
import data from './data.json';

const BASE_URL = 'http://localhost:3000'; // Remplacez cette URL par celle de votre backend
const USE_LOCAL_DATA = false; // Changez cette valeur pour utiliser les données locales ou l'API

const getUserById = async (id) => {
    if (USE_LOCAL_DATA) {
        try {
            console.log("Données locales importées:", data);
            const user = data.USER_MAIN_DATA.find(user => user.id === Number(id));
            if (!user) throw new Error(`Utilisateur avec id ${id} non trouvé`);
            console.log("getUserById local response:", user);
            return { data: user };
        } catch (error) {
            console.error(`Erreur lors de la récupération des données de l'utilisateur ${id} (local):`, error);
            throw error;
        }
    } else {
        try {
            const response = await axios.get(`${BASE_URL}/user/${id}`);
            console.log("getUserById response:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération des données de l'utilisateur ${id}:`, error);
            throw error;
        }
    }
};

const getUserActivityById = async (id) => {
    if (USE_LOCAL_DATA) {
        try {
            const activity = data.USER_ACTIVITY.find(activity => activity.userId === Number(id));
            if (!activity) throw new Error(`Activité de l'utilisateur avec id ${id} non trouvée`);
            console.log("getUserActivityById local response:", activity);
            return { data: activity };
        } catch (error) {
            console.error(`Erreur lors de la récupération des activités de l'utilisateur ${id} (local):`, error);
            throw error;
        }
    } else {
        try {
            const response = await axios.get(`${BASE_URL}/user/${id}/activity`);
            console.log("getUserActivityById response:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération des activités de l'utilisateur ${id}:`, error);
            throw error;
        }
    }
};

const getUserAverageSession = async (id) => {
    if (USE_LOCAL_DATA) {
        try {
            const averageSessions = data.USER_AVERAGE_SESSIONS.find(sessions => sessions.userId === Number(id));
            if (!averageSessions) throw new Error(`Sessions moyennes de l'utilisateur avec id ${id} non trouvées`);
            console.log("getUserAverageSession local response:", averageSessions);
            return { data: averageSessions };
        } catch (error) {
            console.error(`Erreur lors de la récupération des sessions moyennes de l'utilisateur ${id} (local):`, error);
            throw error;
        }
    } else {
        try {
            const response = await axios.get(`${BASE_URL}/user/${id}/average-sessions`);
            console.log("getUserAverageSession response:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération des sessions moyennes de l'utilisateur ${id}:`, error);
            throw error;
        }
    }
};

const getUserPerformance = async (id) => {
    if (USE_LOCAL_DATA) {
        try {
            const performance = data.USER_PERFORMANCE.find(performance => performance.userId === Number(id));
            if (!performance) throw new Error(`Performance de l'utilisateur avec id ${id} non trouvée`);
            console.log("getUserPerformance local response:", performance);
            return { data: performance };
        } catch (error) {
            console.error(`Erreur lors de la récupération des performances de l'utilisateur ${id} (local):`, error);
            throw error;
        }
    } else {
        try {
            const response = await axios.get(`${BASE_URL}/user/${id}/performance`);
            console.log("getUserPerformance response:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération des performances de l'utilisateur ${id}:`, error);
            throw error;
        }
    }
};

export {
    getUserById,
    getUserActivityById,
    getUserAverageSession,
    getUserPerformance
};
