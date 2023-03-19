import { useState } from "react";
import { Link } from "react-router-dom";
import { GetDateDiff } from "../../../helpers/getDateDiff.js";

export const PlanPartial = ({ plan, onDelete }) => {
    console.log(plan);
    let dateDiff = GetDateDiff(plan.fromDate, plan.toDate);

    return (
        <tr >
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
        </tr>
    );
}