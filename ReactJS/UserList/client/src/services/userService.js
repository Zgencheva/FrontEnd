const userUrl = 'http://localhost:3005/api/users';

export const getAll = async () => {
    const response = await fetch(userUrl);
    const result = await response.json();

    return result.users;
}

export const getUser = async (userId) => {
    const response = await fetch(`${userUrl}/${userId}`);
    const result = await response.json();

    return result.user;
}

export const createUser = async (userData) => {
   const response = await fetch(`${userUrl}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({...userData})
      })
      const result = await response.json();
      return result.user;
}

export const editUser = async (userId, userData) => {
 
 const response = await fetch(`${userUrl}/${userId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...userData})
    })
    const result = await response.json();
    return result.user;
}

export const deleteUser = async (userId) => {
    const response = await fetch(`${userUrl}/${userId}`, {
        method: 'DELETE'});
    const result = await response.json();
    return result.userId;
}