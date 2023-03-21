import { requester } from "../helpers/requester.js";

const baseUrl = 'http://localhost:3030/jsonstore/cities';

export const getAll = async () => {
    const result = await requester(baseUrl, 'get', undefined, false, false);
    return result;
}

export const getById = async (cityId) => {
    const result = await requester(`${baseUrl}/${cityId}`, 'get', undefined, false, false);
    return result;
}

export const createCity = async (cityData) => {
    const result = await requester(`${baseUrl}`, 'put', cityData, false, false)
       return result;
 }

   export const deleteCity = async (cityId) => {
    await requester(`${baseUrl}/${cityId}`, 'delete', undefined, false, true)
}