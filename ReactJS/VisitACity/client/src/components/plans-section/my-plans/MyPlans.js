import { useState, useEffect } from 'react';
import * as userService from '../../../services/userService.js';
import { NoPlans } from './NoPlans.js';
import { PlanPartial } from './PlanPartial.js';

export const MyPlans = (userId) => {
    userId = "efb8eea7-350b-4c19-8698-766196b21a30";
    const [user, setUser] = useState({});
    useEffect(()=>{
        userService.getById(userId)
        .then(data=> {
           setUser(data)
        })
    },[])

    return (
        <>
            <br />
            <br />
            
            {/* {user?.plans?.length ==0 && <NoPlans/>} */}
           
            <div className="container shadow py-2">
            <NoPlans />
                {/* <div className="table-responsive">
                    <table className="table accordion">
                        <thead>
                            <tr>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Days</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.plans?.map(plan=> <PlanPartial key={plan._id} plan={plan}/>)}
                        </tbody>
                    </table>
                </div> */}
            </div>
        </>

    );
}