import { requester } from "../helpers/requester.js";
import { baseUrl } from "../config.js";

const url = `${baseUrl}/jsonstore/attractions`;

export const getAll = async () => {
  const result = await requester(url, 'get', undefined, false, false);
  return result;
}

export const getById = async (attractionId) => {
  const result = await requester(`${url}/${attractionId}`, 'get', undefined, false, false);
  return result;
}

export const createAttraction = async (attractionData) => {
  const result = await requester(url, 'post', attractionData, true, false);
  return result;
}

export const editAttraction = async (attractionId, attractionData) => {
  const result = await requester(`${url}/${attractionId}`,'put', attractionData, false, false)
  return result;
}

export const deleteAttraction = async (attractionId) => {
  await requester(`${url}/${attractionId}`,'delete', undefined, false, true)
}

export const addUserReview = async (attractionId, userId) =>{
  var toEdit = await getById(attractionId);
  if(toEdit.userReviews.includes(userId)){
    return toEdit;
  }
  toEdit.userReviews.push(userId)
  var result = await editAttraction(attractionId, toEdit);
  return result;
}