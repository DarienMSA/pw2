import { axiosBase as axios } from "./Config";

export const GetCommentsByReview = async (id) => {
    try {
        const response = await axios.get("/comment/review/" + id);
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

export const CreateComment = async (body) => {
    try {
        const response = await axios.post("/comment", body);
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

export const UpdateComment = async (id, body) => {
    try {
        const response = await axios.put("/comment/" + id, body);
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