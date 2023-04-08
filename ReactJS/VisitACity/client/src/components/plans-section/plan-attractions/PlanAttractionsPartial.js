import { Link } from "react-router-dom";
import styles from './PlanAttractionsPartial.module.css';

export const PlanAttractionsPartial = ({ attraction, onAttractionDelete }) => {

    return (
        <div>
            <li className={`list-group-item d-flex justify-content-between align-items-start ${styles.plan}`}>
                <div className={`ms-2 me-auto ${styles['plan-first']}`}>
                    <div className="fw-bold">{attraction.name}</div>
                    {attraction.description}
                    <br />
                    Visit the attraction <Link data-testid="attraction-visit" to={`/attractions/${attraction._id}`}>here</Link>
                </div>
                <div data-testid="delete-attraction" type="button" className="btn btn-danger rounded-pill" data-bs-toggle="modal" data-bs-target={`#${attraction._id}`}>
                    <i className="fas fa-trash"></i>
                    Delete
                </div>
                <div className="modal fade" id={attraction._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to delete {attraction.name}?</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                <button data-testid="delete-attraction-confirmation" type="button" className="btn btn-secondary" onClick={()=> onAttractionDelete(attraction._id)} data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );

}