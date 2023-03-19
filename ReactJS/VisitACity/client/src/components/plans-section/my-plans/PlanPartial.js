import { Link } from "react-router-dom";
import { GetDateDiff } from "../../../helpers/getDateDiff.js";

export const PlanPartial = ({ plan, onDelete }) => {
    let dateDiff = GetDateDiff(plan.fromDate, plan.toDate);
    return (
        <tr>
            <td>{plan.city}</td>
            <td>{plan.country}</td>
            <td type="date">{plan.fromDate}</td>
            <td type="date">{plan.toDate}</td>
            <td>{dateDiff}</td>
            <td>
                <Link className="btn btn-info" to={`/myPlans/${plan?._id}`}>
                    <i className="fas fa-pen"></i>
                    Info
                </Link>


            </td>
            <td>


                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete your plan?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>onDelete(plan._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
}