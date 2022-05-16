import { axiosBase as axios } from "./Config";

export const GetUserNotifications = async (id) => {
    try {
        const response = await axios.get("/notification/" + id);
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

export const GetUserNotificationsActive = async (id) => {
    try {
        const response = await axios.get("/notification/active/" + id);
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

export const CreateNotification = async (body) => {
    try {
        const response = await axios.post("/notification/", body);
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

export const setActiveAllNotification = async (id) => {
    try {
        const response = await axios.put("/notification/setActive/" + id);
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