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