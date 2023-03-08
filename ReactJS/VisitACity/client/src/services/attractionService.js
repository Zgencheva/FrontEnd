const baseUrl = 'http://localhost:3030/jsonstore/attractions';

export const getAll = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return result;
}

export const getById = async (attractionId) => {
    const response = await fetch(`${baseUrl}/${attractionId}`);
    const result = await response.json();

    return result;
}

export const createAttraction = async (attractionData) => {
    const response = await fetch(`${baseUrl}`, {
         method: 'POST',
         headers: {
           'content-type': 'application/json'
         },
         body: JSON.stringify({...attractionData})
       })
       const result = await response.json();
       return result;
 }

 export const editAttraction = async (attractionId, attractionData) => {
 
    const response = await fetch(`${baseUrl}/${attractionId}`, {
         method: 'PUT',
         headers: {
           'content-type': 'application/json'
         },
         body: JSON.stringify({...attractionData})
       })
       const result = await response.json();
       return result;
   }

   export const deleteAttraction = async (attractionId) => {
    const response = await fetch(`${baseUrl}/${attractionId}`, {
        method: 'DELETE'});
    const result = await response.json();
    return result;
}