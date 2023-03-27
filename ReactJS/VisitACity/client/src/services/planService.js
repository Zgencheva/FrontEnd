import { requester } from "../helpers/requester.js";

const baseUrl = 'http://localhost:3030/data/plans';

export const getById = async (planId) => {
  const result = await requester(`${baseUrl}/${planId}`, 'get', undefined, true, false);
  console.log(result);
  return result;
}

export const createPlan = async (planData) => {
  // const userPlans = await getUserPlans();
  // console.log(userPlans);
  // if (userPlans.some(x => x.city == planData.city)) {
  //   throw new Error(`You already have plan in ${planData.city}`)
  // }
  const result = await requester(baseUrl, 'post', planData, true, false);
  return result;
}
export const updatePlan = async (planData) => {

  const result = await requester(`${baseUrl}/${planData._id}`, 'put', planData, true, false);
  return result;
}
export const addAttractionToPlan = async (attraction) => {
  const userPlans = await getUserPlans();
  console.log(userPlans);
  const currentPlan = userPlans.find(x => x.city == attraction.city)
  if (!currentPlan) {
    throw new Error(`You do not have plans in ${attraction.city}`)
  }
  if (currentPlan.attractions.some(x => x == attraction._id)) {
    throw new Error(`You already have ${attraction.name} in your plan to ${attraction.city}`)
  }
  currentPlan.attractions.push(attraction._id);
  const result = await updatePlan(currentPlan);
  return result;
}

export const addRestaurantToPlan = async (restaurant) =>{
  const userPlans = await getUserPlans();
  const currentPlan = userPlans.find(x => x.city == restaurant.city);
  console.log(currentPlan);
  if (!currentPlan) {
    throw new Error(`You do not have plans in ${restaurant.city}`)
  }
  if (currentPlan.restaurants.some(x => x == restaurant._id)) {
    throw new Error(`You already have ${restaurant.name} in your plan to ${restaurant.city}`)
  }
  currentPlan.restaurants.push(restaurant._id);
  const result = await updatePlan(currentPlan);
  return result;

}

export const deleteAttractionFromPlan = async (planId, attractionId) => {
  const currentPlan = await getById(planId);
  console.log(currentPlan);

  currentPlan.attractions = currentPlan.attractions.filter(x => x != attractionId);
  const result = await updatePlan(currentPlan);
  return result;
}

export const deleteRestaurantFromPlan = async (planId, restaurantId) => {
  const currentPlan = await getById(planId);
  console.log(currentPlan);

  currentPlan.restaurants = currentPlan.restaurants.filter(x => x != restaurantId);
  const result = await updatePlan(currentPlan);
  return result;
}

export const deletePlan = async (planId) => {
  await requester(`${baseUrl}/${planId}`, 'delete', undefined, true, true);
}

export const getUserPlans = async () => {
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  const match = encodeURIComponent(`_ownerId="${userId}"`);

  const result = await requester(`${baseUrl}?where=${match}`, 'get', undefined, true, false);

  return result;
}

