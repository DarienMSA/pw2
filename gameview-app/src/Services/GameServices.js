import { axiosBase as axios } from "./Config";

export const GetGameID = async (id) => {
    try {
        const response = await axios.get("/game/" + id);
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

export const GetGamesSortedBy = async (sortedBy) => {
    try {
        const response = await axios.get("/game/sort/" + sortedBy);
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

export const GetGamesByName = async (v) => {
    try {
        const response = await axios.get("/game/name/" + v);
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