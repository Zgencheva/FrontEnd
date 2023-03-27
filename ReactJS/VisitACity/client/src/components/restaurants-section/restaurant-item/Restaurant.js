import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes.js';
import styles from './Restaurant.module.css';

export const Restaurant = ({ restaurant }) => {
    return (
        <div className={`media col-md-4 ${styles.card}`}>
            <Link to={`/restaurants/${restaurant._id}`}>
                <img className="mr-3 img-responsive" width="100%" height="300" src={restaurant.image} alt="attraction image"/>
                </Link>
            <div className={`card-body`}>
                <h4 className="card-title text-center">{restaurant.name}</h4>
                <p></p>
                <h5 className="card-text text-center">{restaurant.city}</h5>
                <div className={`card-text feature-icon ${styles.cardBody}`}>
                    <i className="fa fa-search-location"></i> <span>Address: {restaurant.address}</span>
                </div>
                <p></p>

            </div>
            <div className="text-center">
                <Link to={`/restaurants/${restaurant._id}`} className={`btn btn-info ${styles['btn-info']}`}>
                    <i className="fa fa-info-circle"></i> <span>Details</span>
                </Link>
            </div>
            <p></p>
        </div>
    );
}