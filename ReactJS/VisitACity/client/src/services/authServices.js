import { requester } from "../helpers/requester.js";
const baseUrl = 'http://localhost:3030/users';

export const logout = async () => {
   await requester(
        `${baseUrl}/logout`, 'get', undefined, true, true)
}

export const login = async (user) => {
    let result = await requester(
        `${baseUrl}/login`, 'post', user, false, false)
    return result;
}

export const register = async (user) => {
    var result = await requester(
        `${baseUrl}/register`, 'post', user, false, false)
    return result;
}

// export const getUser = async () => {
//     const response = await fetch(`${baseUrl}/me`, {
//         method: 'GET',
//         headers: {
//             'X-Authorization': getAuthToken(),
//         }
//     })
//     var user = await response.json();
//     return user;
// }