import { requester } from "../helpers/requester.js";

const baseUrl = 'http://localhost:3030/data/plans';

export const getById = async (planId) => {
  const response = await fetch(`${baseUrl}/${planId}`);
  const result = await response.json();

  return result;
}

export const createPlan = async (planData) => {
  const userPlans = await getUserPlans();
  if(userPlans.some(x=> x.city == planData.city)){
    throw new Error(`You already have plan in ${planData.city}`)
  }
  const result = await requester(baseUrl, 'post', planData, true, false);
  return result;
}

export const deletePlan = async (planId) => {
  console.log(planId);
  await requester(`${baseUrl}/${planId}`, 'delete', undefined, true, true);

}

export const getUserPlans = async () => {
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  const match = encodeURIComponent(`_ownerId="${userId}"`);

  const result= await requester(`${baseUrl}?where=${match}`, 'get', undefined, true, false);
 
  return result;
}

