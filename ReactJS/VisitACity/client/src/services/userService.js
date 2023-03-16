const baseUrl = 'http://localhost:3030/jsonstore/users';

export const getById = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`);
  const result = await response.json();

  return result;
}

export const addPlanToUser = async (userData) => {
  const response = await fetch(`${baseUrl}/${userData._id}`, {
       method: 'PUT',
       headers: {
         'content-type': 'application/json'
       },
       body: JSON.stringify({...userData})
     })
     const result = await response.json();
     return result;
}