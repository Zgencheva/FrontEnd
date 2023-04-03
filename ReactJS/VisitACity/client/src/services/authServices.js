import { requester } from "../helpers/requester.js";
import { baseUrl } from "../config.js";

const url = `${baseUrl}/users`;

export const logout = async () => {
   await requester(
        `${url}/logout`, 'get', undefined, true, true)
}

export const login = async (user) => {
    let result = await requester(
        `${url}/login`, 'post', user, false, false)
    return result;
}

export const register = async (user) => {
    var result = await requester(
        `${url}/register`, 'post', user, false, false)
    return result;
}

// export const getUser = async () => {
//     const response = await fetch(`${url}/me`, {
//         method: 'GET',
//         headers: {
//             'X-Authorization': getAuthToken(),
//         }
//     })
//     var user = await response.json();
//     return user;
// }