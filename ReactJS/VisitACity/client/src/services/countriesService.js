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

export const createCountry = async (countryData, countries) => {
  if(countries.some(x=> x.name == countryData.name)){
    throw new Error(`There is already country with this name`);
  }
  const result = await requester(`${baseUrl}`, 'post', countryData, false, false)
  return result;
}

export const deleteCountry = async (countryId) => {
  await requester(`${baseUrl}/${countryId}`, 'delete', undefined, false, true)
}

export const addCity = async (values, countries) => {
  const country = countries.find(x => x.name == values.country);
  if (country.cities.some(x => x == values.city)) {
    throw new Error(`There is a city with the same name in ${values.country}`)
  }
  country.cities.push(values.city);
  const result = await requester(`${baseUrl}/${country._id}`, 'post', country, false, false);
  return result;
}
