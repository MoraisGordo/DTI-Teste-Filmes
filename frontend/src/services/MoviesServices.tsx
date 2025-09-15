
import api from './api';


export async function getMovie(id: number) {
    try {
        const response = await api.get(`/movies/${id}`);
        return response.data;

    }
    catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

export async function getMovies() {
    try {
        const response = await api.get("/movies");
        return response.data;
    }
    catch (error) {
        console.error("Erro ao buscar filme:", error);
    }
}

export async function postMovie(data: MoviePayload) {
    try {
        const response = await api.post("/movies", data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar filme:", error);
        throw error;
    }
}

export async function deleteMovie(id: number) {
    try {
        const response = await api.delete(`/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar filme:", error);
    }
}

export async function putMovie(id: number, data: MoviePayload) {
    try {
        const response = await api.put(`/movies/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);
    }
}
