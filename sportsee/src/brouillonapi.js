import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Remplacez par l'URL de votre backend

/**
 * @description Retrieve the main user info (first name, last name, today score)
 * @param {number} id 
 * @returns {Promise<Object>}
 */
const getUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

/**
 * @param {number} id 
 * @returns {Promise<Object>}
 */
const getUserActivityById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}/activity`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user activity:', error);
        throw error;
    }
};

/**
 * @param {number} id 
 * @returns {Promise<Object>}
 */
const getUserAverageSession = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}/average-sessions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user average sessions:', error);
        throw error;
    }
};

/**
 * @param {number} id 
 * @returns {Promise<Object>}
 */
const getUserPerformance = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}/performance`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user performance:', error);
        throw error;
    }
};

export {
    getUserById,
    getUserActivityById,
    getUserAverageSession,
    getUserPerformance
};
