import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes.js';
import styles from './Restaurant.module.css';

export const Restaurant = ({ restaurant }) => {
    // const getRatingContent = rating => {
    //     let content = [];
    //     for (let i = 0; i < rating ; i++) {
    //       content.push(<i key={i} className={`fa fa-star ${styles.star}`}></i>);
    //     }
    //     return content;
    //   };
    return (
        <div className={`media col-md-4 ${styles.card}`}>
            <Link to={`/restaurants/${restaurant._id}`}>
                <img data-testid='img' className="mr-3 img-responsive" width="100%" height="300" src={restaurant.image} alt="attraction image" />
            </Link>
            <div className={`card-body`}>
                <h4 className="card-title text-center">{restaurant.name}</h4>
                <p></p>
                <h5 className="card-text text-center">{restaurant.city}</h5>
                <div className={`card-text feature-icon ${styles.cardBody}`}>
                    <i className="fa fa-search-location"></i> <span>Address: {restaurant.address}</span>
                </div>
                <p></p>
                <div className={`card-text feature-icon ${styles.cardBody}`}>
                    <i className="fa fa-search-location"></i> <span>Phone: {restaurant.phoneNumber}</span>
                </div>
            </div>
            <div className="text-center">
                <Link to={`/restaurants/${restaurant._id}`} className={`btn btn-info`}>
                    <i className="fa fa-info-circle"></i> <span>Details</span>
                </Link>
                {/* <a className="btn btn-success">
                    <div className="feature-icon">
                        <i className="fa fa-bus"></i> <span>Add to plan</span>
                    </div>
                </a> */}
            </div>
            <p></p>
        </div>
    );
}