import { requester } from "../helpers/requester.js";
import { baseUrl } from "../config.js";

const url = `${baseUrl}/data/restaurants`;

export const getAll = async () => {
    const result = await requester(url, 'get', undefined, false, false);
    return result;
  }
  export const getAllRestaurantsByCity = async (city) => {
    const match = encodeURIComponent(`city="${city}"`);

    const result = await requester(`${url}?where=${match}`, 'get', undefined, true, false);
    return result;
  }
  export const getById = async (id) => {
      const result = await requester(`${url}/${id}`, 'get', undefined, false, false);
    return result;
  }
  
  export const create = async (data) => {
    const result = await requester(url, 'post', data, true, false);
    return result;
  }
  
  export const edit = async (id, data) => {
    const result = await requester(`${url}/${id}`,'put', data, true, false)
    return result;
  }
  
  export const deleteData = async (id) => {
    await requester(`${url}/${id}`,'delete', undefined, true, true)
  }
  