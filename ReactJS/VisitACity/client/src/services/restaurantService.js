import { requester } from "../helpers/requester.js";

const baseUrl = 'http://localhost:3030/data/restaurants';

export const getAll = async () => {
    const result = await requester(baseUrl, 'get', undefined, false, false);
    return result;
  }
  export const getAllRestaurantsByCity = async (city) => {
    const match = encodeURIComponent(`city="${city}"`);

    const result = await requester(`${baseUrl}?where=${match}`, 'get', undefined, true, false);
    return result;
  }
  export const getById = async (id) => {
      const result = await requester(`${baseUrl}/${id}`, 'get', undefined, false, false);
    return result;
  }
  
  export const create = async (data) => {
    const result = await requester(baseUrl, 'post', data, true, false);
    return result;
  }
  
  export const edit = async (id, data) => {
    const result = await requester(`${baseUrl}/${id}`,'put', data, true, false)
    return result;
  }
  
  export const deleteData = async (id) => {
    await requester(`${baseUrl}/${id}`,'delete', undefined, true, true)
  }
  