const baseUrl = 'http://localhost:3030/jsonstore/countries';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return result;
}

export const getById = async (countryId) => {
    const response = await fetch(`${baseUrl}/${countryId}`);
    const result = await response.json();

    return result;
}

export const createCountry = async (countryData) => {
    const response = await fetch(`${baseUrl}`, {
         method: 'POST',
         headers: {
           'content-type': 'application/json'
         },
         body: JSON.stringify({...countryData})
       })
       const result = await response.json();
       return result;
 }

   export const deleteCountry = async (countryId) => {
    const response = await fetch(`${baseUrl}/${countryId}`, {
        method: 'DELETE'});
    const result = await response.json();
    return result;
}