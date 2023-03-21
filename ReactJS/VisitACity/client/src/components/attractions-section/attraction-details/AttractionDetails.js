import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as attractionService from '../../../services/attractionService.js';
import * as planService from '../../../services/planService.js';
import styles from './AttractionDetails.module.css';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../constants/routes.js';
import { executeAsync } from '../../../helpers/exceptions.js';

export const AttractionDetails = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { attractionId } = useParams();
    const [attraction, setAttraction] = useState({});
    const [error, setError] = useState(new Error());

    useEffect(() => {
        attractionService.getById(attractionId)
            .then(att => {
                console.log(attraction);
                if(user._id){
                    attractionService.addUserReview(attractionId, user._id)
                    .then(newAttraction=> setAttraction(newAttraction));
                }
                else{
                    setAttraction(att);
                }
                setAttraction(att);

            });
    }, [attractionId]);

    const AddPlanHandler = async () => {
        if(user.email == null){
            navigate(routes.login);
        }
        else{
            const fetchData = async() => await planService.addAttractionToPlan(attraction);
            const [res, err] = await executeAsync(fetchData);
            if (err) {
                return setError(err);
            }
            navigate(`/myPlans/${res._id}`);
        }
    }
    return (
        <section className={`${styles.wrapper}`}>
            <div className={`${styles.content}`}>
                <h1>
                    {attraction?.name}
                </h1>
                <h4>
                    {attraction?.city}
                </h4>
                <div className="card-text feature-icon">
                </div>
                <p>{attraction?.description}</p>

                <ul className={`${styles['info-wrapper']}`}>
                    <li className={`${styles.info}`}>
                        <i className="fa fa-search-location"></i>
                        <span className={`${styles['li-content']}`}>
                            Address: {attraction?.address}
                        </span>
                    </li>
                    <li className={`${styles.info}`}>
                        <i className="fa-solid fa-dollar-sign"></i> <span className={`${styles['li-content']}`}>Price: {attraction?.price}</span>
                    </li>
                    <li className={`${styles.info}`}>
                        <i className="fa-solid fa-location-arrow"></i>
                        <a href={attraction?.attractionUrl} target="_blank">
                            Visit website here
                        </a>
                    </li>
                </ul>
                <ul className={`${styles.btns}`}>
                    <li className={`${styles['btn-addPlan']}`}>
                        <button onClick={AddPlanHandler} className="btn btn-success"><i className="fa fa-bus"></i>Add to plan</button>
                    </li>

                    {user?.role == 'admin' &&
                        <li className={`${styles['btn-edit']}`}>
                            <Link className="btn btn-outline-dark" to={`/admin/attractions/edit/${attractionId}`}><i className="fa-solid fa-pen"></i>Edit</Link>
                        </li>}
                    {user?.role == 'admin' &&
                        <li className={`${styles['btn-edit']}`}>
                            <button className='btn btn-outline-danger'><i className="fa-solid fa-trash"></i>Delete</button>
                        </li>}

                </ul>
                    {error &&  <span className="text-danger">{error.message}</span>}
            </div>
            <div className={styles['picture-wrapper']}>
                <img className={`${styles.picture}`} src={attraction.image} alt="attraction image" />
            </div>
        </section>
    );
}