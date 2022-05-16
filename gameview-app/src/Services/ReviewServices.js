import { axiosBase as axios } from "./Config";

export const GetReviewUserGame = async (idGame, idUser) => {
    try {
        const response = await axios.get(`/review/${idGame}/${idUser}`);
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

export const GetGameReviews = async (idGame) => {
    try {
        const response = await axios.get(`/review/game/${idGame}`);
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

export const GetUserReviews = async (idUser) => {
    try {
        const response = await axios.get(`/review/user/${idUser}`);
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

export const GetGameScores = async (idGame) => {
    try {
        const response = await axios.get(`/review/game/score/${idGame}`);
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

export const HasUserLike = async (idGame, idUser) => {
    try {
        const response = await axios.get(`/review/searchLikeUser/${idGame}/${idUser}`);
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

export const AddUserLike = async (idGame, idUser) => {
    try {
        const response = await axios.put(`/review/${idGame}/upvote/${idUser}`);
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

export const RemoveUserLike = async (idGame, idUser) => {
    try {
        const response = await axios.put(`/review/${idGame}/downvote/${idUser}`);
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

export const CreateReview = async (data) => {
    try {
        const response = await axios.post("/review", data);
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

export const UpdateReview = async (data, id) => {
    try {
        const response = await axios.put("/review/" + id, data);
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

export const DeleteReview = async (id) => {
    try {
        const response = await axios.delete("/review/" + id);
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
