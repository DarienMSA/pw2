import { axiosBase as axios } from "./Config";

export const GetAllBadges = async (id) => {
    try {
        const response = await axios.get("/badge/");
        if (response.status == 200) {
            return response.data;
        } else {
            return {}
        }
    } catch (err) {
        console.error(err);
        return err
    }
}

export const CreateUserBadges = async (data) => {
    try {
        const response = await axios.post("/userBadges", data);
        if (response.status == 200) {
            return response.data;
        } else {
            return []
        }
    } catch (err) {
        console.error(err);
        return err
    }
}

export const GetUserGameBadges = async (userId, gameId) => {
    try {
        const response = await axios.get(`/userBadges/user/${userId}/game/${gameId}`);
        if (response.status == 200) {
            return response.data;
        } else {
            return {}
        }
    } catch (err) {
        console.error(err);
        return err
    }
}

export const UpdateUserGameBadges = async (id, body) => {
    try {
        const response = await axios.put(`/userBadges/${id}`, body);
        if (response.status == 200) {
            return response.data;
        } else {
            return {}
        }
    } catch (err) {
        console.error(err);
        return err
    }
}

export const DeleteUserBadges = async (id) => {
    try {
        const response = await axios.delete("/userBadges/" + id);
        if (response.status == 200) {
            return response.data;
        } else {
            return []
        }
    } catch (err) {
        console.error(err);
        return err
    }
}