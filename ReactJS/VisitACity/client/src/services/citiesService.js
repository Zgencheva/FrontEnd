const baseUrl = 'http://localhost:3030/jsonstore/cities';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return result;
}

export const getById = async (cityId) => {
    const response = await fetch(`${baseUrl}/${cityId}`);
    const result = await response.json();

    return result;
}

export const createCity = async (cityData) => {
    const response = await fetch(`${baseUrl}`, {
         method: 'POST',
         headers: {
           'content-type': 'application/json'
         },
         body: JSON.stringify({...cityData})
       })
       const result = await response.json();
       return result;
 }

   export const deleteCity = async (cityId) => {
    const response = await fetch(`${baseUrl}/${cityId}`, {
        method: 'DELETE'});
    const result = await response.json();
    return result;
}