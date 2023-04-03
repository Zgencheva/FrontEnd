import { requester } from "../helpers/requester.js";
import { baseUrl } from "../config.js";

const url = `${baseUrl}/jsonstore/countries`;

export const getAll = async () => {
  const result = await requester(url, 'get', undefined, false, false);
  return result;
}

export const getById = async (countryId) => {
  const result = await requester(`${url}/${countryId}`, 'get', undefined, false, false);
  return result;
}

export const createCountry = async (countryData, countries) => {
  if(countries.some(x=> x.name == countryData.name)){
    throw new Error(`There is already country with this name`);
  }
  const result = await requester(`${url}`, 'post', countryData, false, false)
  return result;
}

export const deleteCountry = async (id) => {
  await requester(`${url}/${id}`, 'delete', undefined, false, true)
}

export const addCity = async (values, countries) => {
  const country = countries.find(x => x.name == values.country);
  if (country.cities.some(x => x == values.city)) {
    throw new Error(`There is a city with the same name in ${values.country}`)
  }
  country.cities.push(values.city);
  const result = await requester(`${url}/${country._id}`, 'post', country, false, false);
  return result;
}
