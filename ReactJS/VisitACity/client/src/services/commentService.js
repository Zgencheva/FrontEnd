import { requester } from "../helpers/requester.js";
import * as restaurantService from './restaurantService.js';
import { baseUrl } from "../config.js";

const url = `${baseUrl}/data/comments`;

export const getById = async (id) => {
  const result = await requester(`${url}/${id}`, 'get', undefined, true, false);
  console.log(result);
  return result;
}

export const create = async (data) => {
  const result = await requester(url, 'post', data, true, false);
  console.log(result);
  return result;
}

export const deleteComment = async (id) => {
  await requester(`${url}/${id}`, 'delete', undefined, true, true);
}

export const getRestaurantComments = async (restaurantId) => {
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  const match = encodeURIComponent(`restaurantId="${restaurantId}"`);

  const result = await requester(`${url}?where=${match}`, 'get', undefined, false, false);

  return result;
}

