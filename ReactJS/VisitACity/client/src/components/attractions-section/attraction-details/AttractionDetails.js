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
    const { user, isAuthenticated, isAdmin } = useContext(AuthContext);
    const { attractionId } = useParams();
    const [attraction, setAttraction] = useState({});
    const [error, setError] = useState(new Error());

    useEffect(() => {
        attractionService.getById(attractionId)
            .then(att => {
                if(isAuthenticated){
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
        if(!isAuthenticated){
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
    const onDelete = async () => {
        await attractionService.deleteAttraction(attractionId)
        .then(
            navigate(`/`)
            );
        
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

                    {isAdmin &&
                        <li className={`${styles['btn-edit']}`}>
                            <Link className="btn btn-outline-dark" to={`/admin/attractions/edit/${attractionId}`}><i className="fa-solid fa-pen"></i>Edit</Link>
                        </li>}
                    {isAdmin  &&
                        <li className={`${styles['btn-edit']}`}>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Delete
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to delete {attraction.name}?</h1>
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
                    {error &&  <span className="text-danger">{error.message}</span>}
            </div>
            <div className={styles['picture-wrapper']}>
                <img className={`${styles.picture}`} src={attraction.image} alt="attraction image" />
            </div>
        </section>
    );
}