// const baseUrl = 'http://localhost:3030/jsonstore/plans';

// export const getById = async (planId) => {
//     const response = await fetch(`${baseUrl}/${planId}`);
//     const result = await response.json();

//     return result;
// }

// export const createPlan = async (planData) => {
//     const response = await fetch(`${baseUrl}`, {
//          method: 'POST',
//          headers: {
//            'content-type': 'application/json'
//          },
//          body: JSON.stringify({...planData})
//        })
//        const result = await response.json();
//        return result;
//  }

//    export const deletePlan = async (planId) => {
//     const response = await fetch(`${baseUrl}/${planId}`, {
//         method: 'DELETE'});
//     const result = await response.json();
//     return result;
// }