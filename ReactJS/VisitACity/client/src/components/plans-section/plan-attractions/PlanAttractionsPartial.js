import { Link } from "react-router-dom";

export const PlanAttractionsPartial = ({attraction}) => {
    return(
        <div>
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{attraction.name}</div>
                {attraction.description}
                <br/>
                Visit the attraction <Link to={`/attractions/${attraction._id}`}>here</Link>
            </div>
                   <div className="btn btn-danger rounded-pill">
                    <i className="fas fa-trash"></i>
                    Delete
                    </div>
        </li>
        </div>
    );

}