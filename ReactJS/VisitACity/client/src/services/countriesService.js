import { requester } from "../helpers/requester.js";

const baseUrl = 'http://localhost:3030/jsonstore/countries';

export const getAll = async () => {
    const result = await requester(baseUrl, 'get', undefined, false, false);
    return result;
}

export const getById = async (countryId) => {
    const result = await requester(`${baseUrl}/${countryId}`, 'get', undefined, false, false);
    return result;
}

export const createCountry = async (countryData) => {
    const result = await requester(`${baseUrl}`, 'post', countryData, true, false)
    return result;
 }

   export const deleteCountry = async (countryId) => {
    await requester(`${baseUrl}/${countryId}`, 'delete', undefined, false, true)
}
