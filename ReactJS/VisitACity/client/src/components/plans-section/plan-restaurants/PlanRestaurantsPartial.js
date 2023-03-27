import { Link } from "react-router-dom";
import styles from './PlanRestaurantsPartial.module.css';

export const PlanRestaurantsPartial = ({ restaurant, onRestaurantDelete }) => {

    return (
        <div>
            <li className={`list-group-item d-flex justify-content-between align-items-start ${styles.plan}`}>
                <div className={`ms-2 me-auto ${styles['plan-first']}`}>
                    <div className="fw-bold">{restaurant.name}</div>
                    Visit the restaurant <Link to={`/restaurants/${restaurant._id}`}>here</Link>
                </div>
                <div type="button" className="btn btn-danger rounded-pill" data-bs-toggle="modal" data-bs-target={`#${restaurant._id}`}>
                    <i className="fas fa-trash"></i>
                    Delete
                </div>
                <div className="modal fade" id={restaurant._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to delete {restaurant.name}?</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-secondary" onClick={()=> onRestaurantDelete(restaurant._id)} data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );

}