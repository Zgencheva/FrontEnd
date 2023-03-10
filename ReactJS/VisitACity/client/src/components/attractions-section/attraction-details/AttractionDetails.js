import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as attractionService from '../../../services/attractionService.js';
import styles from './AttractionDetails.module.css';

export const AttractionDetails = ({ user }) => {
    const { attractionId } = useParams();
    const [attraction, setAttraction] = useState({});

    useEffect(() => {
        attractionService.getById(attractionId)
            .then(att => {
                setAttraction(att);
                console.log(att);

            });
    }, [attractionId]);
    console.log(attraction?._id);

    const imagePath = `../../images/attractions/${attraction?.image?._id}.${attraction?.image?.extension}`;
    return (
        <section className={`${styles.wrapper}`}>
            <div className={`${styles.content}`}>
                <h1>
                    {attraction?.name}
                </h1>
                <h4>
                    {attraction?.city?.name}
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
                        <button className="btn btn-success"><i className="fa fa-bus"></i>Add to plan</button>
                    </li>
                    <li className={`${styles['btn-edit']}`}>
                        <button className="btn btn-outline-dark"><i className="fa-solid fa-pen"></i>Edit</button>
                    </li>
                    <li className={`${styles['btn-edit']}`}>
                        <button className='btn btn-outline-danger'><i className="fa-solid fa-trash"></i>Delete</button>
                    </li>
                </ul>
            </div>
            <div className={styles['picture-wrapper']}>
                <img className={`${styles.picture}`} src={process.env.PUBLIC_URL + imagePath} alt="attraction image" />
            </div>
        </section>
    );
}