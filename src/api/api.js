import axios from 'axios';

const URL = "http://localhost:3000/api"; // Mantenha a URL base aqui

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        throw error; // Rejeita o erro para que o componente possa tratá-lo
    }
};

export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${URL}/login`, data);
        return response.data; // Espera-se que o backend retorne o token
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error; // Rejeita o erro para que o componente possa tratá-lo
    }
};

export const googleLogin = async (googleToken) => {
    try {
        const response = await axios.post(`${URL}/auth/google`, { token: googleToken });
        return response.data; // Espera-se que o backend retorne o token da sua aplicação
    } catch (error) {
        console.error("Erro ao fazer login com o Google:", error);
        throw error; // Rejeita o erro para que o componente possa tratá-lo
    }
};

export const registerArtist = async (data) => {
    try {
        const response = await axios.post(`${URL}/create-artist`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        throw error; // Rejeita o erro para que o componente possa tratá-lo
    }
};