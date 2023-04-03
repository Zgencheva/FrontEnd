import { requester } from "../helpers/requester.js";
import { baseUrl } from "../config.js";

const url = `${baseUrl}/jsonstore/cities`;

export const getAll = async () => {
    const result = await requester(url, 'get', undefined, false, false);
    return result;
}

export const getById = async (cityId) => {
    const result = await requester(`${url}/${cityId}`, 'get', undefined, false, false);
    return result;
}

export const createCity = async (cityData) => {
    const result = await requester(`${url}`, 'put', cityData, false, false)
       return result;
 }

   export const deleteCity = async (cityId) => {
    await requester(`${url}/${cityId}`, 'delete', undefined, false, true)
}