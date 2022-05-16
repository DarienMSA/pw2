var axios = require("axios").default;

const domain = process.env.REACT_APP_GAMEVIEW_AUTH0_DOMAIN;
const client_id = process.env.REACT_APP_GAMEVIEW_AUTH0_CLIENT_ID;

const url = `https://${domain}/dbconnections/change_password`

export var optionsChangePassword = {
    method: 'POST',
    url: url,
    headers: { 'content-type': 'application/json' },
    data: {
        client_id: client_id,
        email: '',
        connection: 'Username-Password-Authentication'
    }
};

export const requestChangePassword = () => {
    axios.request(optionsChangePassword).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
