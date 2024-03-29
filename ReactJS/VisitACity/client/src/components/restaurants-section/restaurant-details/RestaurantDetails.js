import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../constants/routes.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { executeAsync } from "../../../helpers/exceptions.js";
import * as restaurantService from '../../../services/restaurantService.js';
import * as planService from '../../../services/planService.js';
import * as commentService from '../../../services/commentService.js';
import styles from './RestaurantDetails.module.css';
import { CommentPartial } from "../../comments/comment-partial/CommentPartial.js";

export const RestaurantDetails = () => {
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    const [success, setSuccess] = useState(true);
    const { user, isAuthenticated, isAdmin } = useContext(AuthContext);
    const [restaurant, setRestaurant] = useState({});
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(new Error());

    useEffect(() => {
        restaurantService.getById(restaurantId)
            .then(result => {
                setRestaurant(result);
                commentService.getRestaurantComments(result._id)
                .then(comm => {
                    setComments(comm);
                })
            });
    }, [restaurantId])

    const onDelete = async () => {
        await restaurantService.deleteData(restaurantId)
            .then(
                navigate(`/`)
            );
    };
    const AddPlanHandler = async () => {
        if (!isAuthenticated) {
            navigate(routes.login);
        }
        else {
            const fetchData = async () => await planService.addRestaurantToPlan(restaurant);
            const [res, err] = await executeAsync(fetchData);
            if (err) {
                return setError(err);
            }
            navigate(`/myPlans/${res._id}`);
        }
    }
    // const getRatingContent = rating => {
    //     let content = [];
    //     for (let i = 0; i < rating; i++) {
    //         content.push(<i key={i} className={`fa fa-star ${styles.star}`}></i>);
    //     }
    //     return content;
    // };
    const onCommentSubmitHandler = async (e) => {
        e.preventDefault();
        let values = Object.fromEntries(new FormData(e.target));
        if(!values.comment || !values.rating){
            setSuccess(false);
            return;
        }
        
        values = {
            ...values,
            restaurantId : restaurant._id,
            userEmail: user.email,
        }
       await commentService.create(values)
       .then(res=> {
        setComments(state => [...state, res])});
    }
    return (
        <section className="restaurant-details">
            <div className="card mb-3">
                <a>
                    <img width="300px" height="500px" src={restaurant?.image} className="card-img-top" alt="Restaurant img" />
                </a>
                <div className="card-body">
                    <h1 className="card-title text-center">{restaurant?.name}</h1>
                    <h3 className="card-title text-center">Address: {restaurant?.address}</h3>
                    <h3 className="card-text text-center">Phone: {restaurant?.phoneNumber}</h3>
                    <h3 className="card-text text-center">Visit official website <a target="_blank" href={restaurant?.restaurantUrl}>here</a></h3>
                    <div className="card-text text-center">
                        <div className="ratings text-center">
                            <div className="stars">
                                {/* {getRatingContent(restaurant?.rating)} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul className={`${styles.btns}`}>
                <li className={`${styles['btn-addPlan']}`}>
                    <button onClick={AddPlanHandler} className="btn btn-success"><i className="fa fa-bus"></i>Add to plan</button>
                </li>
                {isAdmin &&
                    <li className="btn-edit">
                        <Link className="btn btn-outline-dark" to={`/admin/restaurants/edit/${restaurantId}`}><i className="fa-solid fa-pen"></i>Edit</Link>
                    </li>}
                {isAdmin &&
                    <li className="btn-edit">
                        <button data-testid="delete-button" type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
                                        <button data-testid="delete-confirmation" type="button" className="btn btn-secondary" onClick={onDelete} data-bs-dismiss="modal">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>}
            </ul>
            {error && <span className="text-danger">{error.message}</span>}

            <h2 className="text-center">Comments:</h2>
            <ul>
                {comments?.map(x=> <CommentPartial key={x._id} comment={x}/>)}
            </ul>
            {!comments?.some(x=> x._ownerId === user._id) && isAuthenticated &&
            <form onSubmit={(e)=> onCommentSubmitHandler(e)} className="col-md-6 offset-md-3">
            <h2>Leave your comment here:</h2>
            <div asp-validation-summary="All" className="text-danger"></div>
            <div className="form-group">
                <div className={styles.rating}>
                    <input type="radio" name="rating" value="1"/><label htmlFor="5">☆</label>
                    <input type="radio" name="rating" value="2"/><label htmlFor="4">☆</label>
                    <input type="radio" name="rating" value="3"/><label htmlFor="3">☆</label>
                    <input type="radio" name="rating" value="4"/><label htmlFor="2">☆</label>
                    <input type="radio" name="rating" value="5"/><label htmlFor="1">☆</label>
                </div>
            </div>
            <div className="form-group">
                <textarea rows="6" cols="6"  name="comment" className="form-control">
                </textarea>
                {!success && 
                <span className="text-danger">Please fill in your comment</span>
            }
            </div>
            <button data-testid="submit-button" type="submit" className="btn btn-primary">Submit</button>
        </form>
            }
            
        </section>
    );
}