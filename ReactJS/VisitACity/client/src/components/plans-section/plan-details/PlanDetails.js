import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as planService from '../../../services/planService.js';
import * as attractionService from '../../../services/attractionService.js';
import { routes } from '../../../constants/routes.js'
import styles from './PlanDetails.module.css';
import { PlanAttractionsPartial } from '../plan-attractions/PlanAttractionsPartial.js';

export const PlanDetails = () => {
    const navigate = useNavigate();
    const { planId } = useParams();
    const [plan, setPlan] = useState({});
    const [attractions, setAttraction] = useState([]);

    useEffect(() => {
        planService.getById(planId)
            .then(current => {
                setPlan(current);
                current.attractions?.forEach(attid=> {
                    attractionService.getById(attid)
                    .then(res=> setAttraction(state=> ([...state, res])))
                })
            });
            
    }, [planId]);
console.log(attractions);
console.log(plan)
    const onDelete = async (planId) => {

        await planService.deletePlan(planId)
            .then(
                navigate(routes.myPlans)
            );
    }
    return (
        <section id="plan">
            <h1 className='text-center'>Welcome to your plan to {plan.city}!</h1>
            <h3>Attractions:</h3>
            <hr />
            {plan.attractions?.length == 0 &&
                <p>You have no attractions yet.
                </p>}
            <ol>
                {attractions?.map(attraction => <PlanAttractionsPartial key={attraction._id} attraction={attraction} />)}
            </ol>
            <p>See all attractions in {plan.city} <a>here</a></p>
            <h3>Restaurants:</h3>
            <hr />
            {plan.restaurants?.length == 0 &&
                <p>You have no restaurants yet.
                </p>}
            <p>See all restaurants in {plan.city} <a>here</a></p>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Delete plan
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to delete your plan to {plan.city}?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary" onClick={() => onDelete(plan._id)} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}