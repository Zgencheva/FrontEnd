import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../constants/routes.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { executeAsync } from "../../../helpers/exceptions.js";
import * as restaurantService from '../../../services/restaurantService.js'
import * as planService from '../../../services/planService.js'

export const RestaurantDetails = () => {
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    const { user, isAuthenticated, isAdmin } = useContext(AuthContext);
    const [restaurant, setRestaurant] = useState({});
    const [error, setError] = useState(new Error());

    useEffect(()=> {
        restaurantService.getById(restaurantId)
        .then(result => {
            setRestaurant(result);
        });
    }, [restaurantId])
    console.log(restaurantId);
    console.log(restaurant);

    const onDelete = async () => {
        await restaurantService.deleteData(restaurantId)
        .then(
            navigate(`/`)
            );
        
    };
    const AddPlanHandler = async () => {
        if(!isAuthenticated){
            navigate(routes.login);
        }
        else{
            const fetchData = async() => await planService.addRestaurantToPlan(restaurant);
            const [res, err] = await executeAsync(fetchData);
            if (err) {
                return setError(err);
            }
            navigate(`/myPlans/${res._id}`);
        }
    }
    return (
        <section className="restaurant-details">
            <div className="card mb-3">
                <a>
                    <img width="300px" height="500px" src={restaurant?.image} className="card-img-top" alt="Restaurant img"/>
                </a>
                <div className="card-body">
                    <h5 className="card-title text-center">{restaurant?.name}</h5>
                    <h5 className="card-title text-center">Address: {restaurant?.address}</h5>
                    <p className="card-text text-center">Phone: {restaurant?.address}</p>
                    {/* <p className="card-text text-center">
                        <div className="ratings text-center">

                            <span className="product-rating">@Model.Rating.ToString("f1")</span><span>/5</span>
                            <div className="stars">
                                @for (int i = 0; i < Math.Round(Model.Rating); i++)
                                {
                                    <i className="fa fa-star"></i>
                                }
                            </div>
                        </div>
                    </p> */}
                </div>
            </div>

            <div className="text-center">
                <a className="btn btn-warning">
                    <div className="feature-icon">
                        <i className="fa fa-comment"></i> <span>Comment</span>
                    </div>
                </a>
                <a className="btn btn-success">
                    <div className="feature-icon">
                    <button onClick={AddPlanHandler} className="btn btn-success"><i className="fa fa-bus"></i>Add to plan</button>
                    </div>
                </a>
                {isAdmin &&
                        <li className="btn-edit">
                            <Link className="btn btn-outline-dark" to={`/admin/restaurants/edit/${restaurantId}`}><i className="fa-solid fa-pen"></i>Edit</Link>
                        </li>}
                    {isAdmin  &&
                        <li className="btn-edit">
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Delete
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to delete {restaurant.name}?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary" onClick={onDelete} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
                        </li>}
            </div>
            <p></p>
            {error &&  <span className="text-danger">{error.message}</span>}
            <h2 className="text-center">Comments:</h2>

        </section>
    );
}