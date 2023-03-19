import { useState, useEffect, useContext } from 'react';
import styles from './MyPlans.module.css';
import { NoPlans } from './NoPlans.js';
import { PlanPartial } from './PlanPartial.js';
import * as planService from '../../../services/planService.js';

export const MyPlans = () => {
    const [userPlans, setUserPlans] = useState([]);
    console.log(userPlans);
    useEffect(() => {
        planService.getUserPlans()
            .then(plans => {
                setUserPlans(plans)
            });
    }, [])

    const onDelete = (planId) => {
        planService.deletePlan(planId)
        .then(setUserPlans(state=> state.filter(x=> x._id != planId)));
    }

    return (
        <div className={`container shadow py-2 ${styles['container-myPlans']}`}>
            {userPlans.length == 0
                ?
                <NoPlans />
                :
                <div className="table-responsive">
                    <table className="table accordion">
                        <thead>
                            <tr>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Days</th>
                                <th scope="col">Actions</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPlans.map(plan => <PlanPartial key={plan._id} plan={plan} onDelete={onDelete}/>)}
                        </tbody>
                    </table>
                </div>
            }

        </div>
    );
}