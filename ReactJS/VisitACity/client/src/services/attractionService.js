import { requester } from "../helpers/requester.js";

const baseUrl = 'http://localhost:3030/jsonstore/attractions';

export const getAll = async () => {
  const result = await requester(baseUrl, 'get', undefined, false, false);
  return result;
}

export const getById = async (attractionId) => {
  const result = await requester(`${baseUrl}/${attractionId}`, 'get', undefined, false, false);
  return result;
}

export const createAttraction = async (attractionData) => {
  const result = await requester(baseUrl, 'post', attractionData, true, false);
  return result;
}

export const editAttraction = async (attractionId, attractionData) => {
console.log(attractionData);
  const result = await requester(`${baseUrl}/${attractionId}`,'put', attractionData, false, false)
  return result;
}

export const deleteAttraction = async (attractionId) => {
  await requester(`${baseUrl}/${attractionId}`,'delete', undefined, false, true)
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