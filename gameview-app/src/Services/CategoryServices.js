import { axiosBase as axios } from "./Config";

export const GetCategories = async () => {
    try {
        const response = await axios.get("/genre/");
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

export const GetOneCategory = async (id) => {
    try {
        const response = await axios.get("/genre/" + id);
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
