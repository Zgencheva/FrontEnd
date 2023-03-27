import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as planService from '../../../services/planService.js';
import * as attractionService from '../../../services/attractionService.js';
import * as restaurantsService from '../../../services/restaurantService.js';
import { routes } from '../../../constants/routes.js'
import styles from './PlanDetails.module.css';
import { PlanAttractionsPartial } from '../plan-attractions/PlanAttractionsPartial.js';
import { PlanRestaurantsPartial } from '../plan-restaurants/PlanRestaurantsPartial.js';

export const PlanDetails = () => {
    const navigate = useNavigate();
    const { planId } = useParams();
    const [plan, setPlan] = useState({});
    const [attractions, setAttraction] = useState([]);
    const [restaurants, setRestaurant] = useState([]);

    useEffect(() => {
        planService.getById(planId)
            .then(current => {
                setPlan(current);
                current.attractions?.forEach(attid=> {
                    attractionService.getById(attid)
                    .then(res=> setAttraction(state=> ([...state, res])))
                })
                current.restaurants?.forEach(resId=> {
                    restaurantsService.getById(resId)
                    .then(result=> setRestaurant(state=> ([...state, result])))
                })
            });
            
    }, [planId]);
    const onAttractionDelete = async (attractionId) => {
        await planService.deleteAttractionFromPlan(planId, attractionId)
        .then(res=> {setPlan(res); setAttraction(state=> state.filter(x=> x._id != attractionId))});
    }
    const onRestaurantDelete = async (restaurantId) => {
        await planService.deleteRestaurantFromPlan(planId, restaurantId)
        .then(res=> {setPlan(res); setRestaurant(state=> state.filter(x=> x._id != restaurantId))});
    }

    const onDelete = async (planId) => {

        await planService.deletePlan(planId)
            .then(
                navigate(routes.myPlans)
            );
    }
    return (
        <section id="plan">
            <h1 className='text-center'>Welcome to your plan TO {plan.city}!</h1>
            <h1 className='text-center'>Welcome to your plan TO {plan.city}!</h1>
            <h3>Attractions:</h3>
            <hr />
            {plan.attractions?.length == 0 &&
                <p>You have no attractions yet.
                </p>}
            <ol>
                {attractions?.map(attraction => <PlanAttractionsPartial key={attraction._id} attraction={attraction} onAttractionDelete={()=> onAttractionDelete(attraction._id)}/>)}
            </ol>
            <p>See all attractions in {plan.city} <Link to={`/${plan.city}/attraction`}>here</Link></p>
            <h3>Restaurants:</h3>
            <hr />
            {plan.restaurants?.length == 0 &&
                <p>You have no restaurants yet.
                </p>}
                <ol>
                {restaurants?.map(restaurant => <PlanRestaurantsPartial key={restaurant._id} restaurant={restaurant} onRestaurantDelete={()=> onRestaurantDelete(restaurant._id)}/>)}
            </ol>
            <p>See all restaurants in {plan.city} <Link to={`/${plan.city}/restaurant`}>here</Link></p>
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