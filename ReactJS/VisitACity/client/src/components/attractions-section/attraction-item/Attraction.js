import { Link } from 'react-router-dom';
import styles from './Attraction.module.css';

export const Attraction = ({ attraction }) => {
    return (
        <div className={`media col-md-4 ${styles.card}`}>
            <Link to={`/attractions/${attraction._id}`}>
                <img className="mr-3 img-responsive" width="100%" height="300" src={attraction.image} alt="attraction image"/>
                </Link>
            <div className={`card-body`}>
                <h4 className="card-title text-center">{attraction.name}</h4>
                <p></p>
                <h5 className="card-text text-center">{attraction.city}</h5>
                <div className={`card-text feature-icon ${styles.cardBody}`}>
                    <i className="fa fa-dollar-sign"></i> <span>Price: {attraction.price}</span>
                </div>
                <div className={`card-text feature-icon ${styles.cardBody}`}>
                    <i className="fa fa-search-location"></i> <span>Address: {attraction.address}</span>
                </div>
                <p></p>

            </div>
            <div className={`card-footer ${styles.cardFooter}`}>
                <div className={`card-text feature-icon ${styles.cardBody}`}>
                    <i className="fa fa-eye"></i>

                    {attraction.userReviews.length == 1 &&
                        <span>Revied by 1 adventurer</span>
                    }
                    {attraction.userReviews.length != 1 &&
                        <span>Revied by {attraction.userReviews.length} adventurers</span>
                    }
                </div>
            </div>
            <div className="text-center">
                <Link to={`/attractions/${attraction._id}`} className={`btn btn-info ${styles['btn-info']}`}>
                    <i className="fa fa-info-circle"></i> <span>Details</span>
                </Link>
            </div>
            <p></p>
        </div>
    );
}