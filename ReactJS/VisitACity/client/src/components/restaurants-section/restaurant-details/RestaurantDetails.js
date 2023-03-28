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
    const getRatingContent = rating => {
        let content = [];
        for (let i = 0; i <= rating; i++) {
            content.push(<i key={i} className={`fa fa-star ${styles.star}`}></i>);
        }
        return content;
    };
    const onCommentSubmitHandler = async (e) => {
        e.preventDefault();
        console.log('in form');
        let values = Object.fromEntries(new FormData(e.target));
        values = {
            ...values,
            restaurantId : restaurant._id,
            userEmail: user.email,
        }
       await commentService.create(values)
       .then(res=> {console.log(res)
        setComments(state => [...state, res])});
    }
    console.log(comments);
    return (
        <section className="restaurant-details">
            <div className="card mb-3">
                <a>
                    <img width="300px" height="500px" src={restaurant?.image} className="card-img-top" alt="Restaurant img" />
                </a>
                <div className="card-body">
                    <h1 className="card-title text-center">{restaurant?.name}</h1>
                    <h3 className="card-title text-center">Address: {restaurant?.address}</h3>
                    <h3 className="card-text text-center">Phone: {restaurant?.address}</h3>
                    <p className="card-text text-center">
                        <div className="ratings text-center">
                            <div className="stars">
                                {getRatingContent(restaurant?.rating)}
                            </div>
                        </div>
                    </p>
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
                <label asp-for="Rating"></label>
                <div className={styles.rating}>
                    <input type="radio" name="rating" value="1"/><label for="5">☆</label>
                    <input type="radio" name="rating" value="2"/><label for="4">☆</label>
                    <input type="radio" name="rating" value="3"/><label for="3">☆</label>
                    <input type="radio" name="rating" value="4"/><label for="2">☆</label>
                    <input type="radio" name="rating" value="5"/><label for="1">☆</label>
                </div>
            </div>
            <div className="form-group">
                <label asp-for="Content"></label>
                <textarea rows="6" cols="6" asp-for="Content" name="comment" className="form-control">
                </textarea>
                <span asp-validation-for="Content" className="text-danger"></span>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
            }
            
        </section>
    );
}