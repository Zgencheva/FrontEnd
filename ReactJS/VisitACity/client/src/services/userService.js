const baseUrl = 'http://localhost:3030/jsonstore/users';

export const getById = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`);
  const result = await response.json();

  return result;
}
