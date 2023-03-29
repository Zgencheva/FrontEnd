import { requester } from "../helpers/requester.js";
import * as restaurantService from './restaurantService.js';

const baseUrl = 'http://localhost:3030/data/comments';

export const getById = async (id) => {
  const result = await requester(`${baseUrl}/${id}`, 'get', undefined, true, false);
  console.log(result);
  return result;
}

export const create = async (data) => {
  const result = await requester(baseUrl, 'post', data, true, false);
  console.log(result);
  return result;
}

export const deleteComment = async (id) => {
  await requester(`${baseUrl}/${id}`, 'delete', undefined, true, true);
}

export const getRestaurantComments = async (restaurantId) => {
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  const match = encodeURIComponent(`restaurantId="${restaurantId}"`);

  const result = await requester(`${baseUrl}?where=${match}`, 'get', undefined, false, false);

  return result;
}

