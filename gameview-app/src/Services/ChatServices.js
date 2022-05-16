import { axiosBase as axios } from "./Config";

export const GetUserChats = async (id) => {
    try {
        const response = await axios.get("/chat/user/" + id);
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

export const GetUsersChats = async (id1, id2) => {
    try {
        const response = await axios.get("/chat/user/" + id1 + "/" + id2);
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

export const CreateChat = async (body) => {
    try {
        const response = await axios.post("/chat", body);
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

export const GetChatLog = async (id) => {
    try {
        const response = await axios.get("/chatLog/chat/" + id);
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

export const CreateChatLog = async (body) => {
    try {
        const response = await axios.post("/chatLog/", body);
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

export const AddMessage = async (body, id) => {
    try {
        const response = await axios.put("/chatLog/" + id, body);
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

export const SetSeenChat = async (id, seen) => {
    try {
        const response = await axios.put(`/chat/${id}/${seen}`);
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

export const GetSeenChat = async (id) => {
    try {
        const response = await axios.get(`/chat/user/hasSeen/${id}`);
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