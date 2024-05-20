import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Remplacez cette URL par celle de votre backend

const getUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}`);
        console.log("getUserById response:", response.data);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des données de l'utilisateur ${id}:`, error);
        throw error;
    }
};

const getUserActivityById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}/activity`);
        console.log("getUserActivityById response:", response.data);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des activités de l'utilisateur ${id}:`, error);
        throw error;
    }
};

const getUserAverageSession = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}/average-sessions`);
        console.log("getUserAverageSession response:", response.data);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des sessions moyennes de l'utilisateur ${id}:`, error);
        throw error;
    }
};

const getUserPerformance = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}/performance`);
        console.log("getUserPerformance response:", response.data);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des performances de l'utilisateur ${id}:`, error);
        throw error;
    }
};

export {
    getUserById,
    getUserActivityById,
    getUserAverageSession,
    getUserPerformance
};
