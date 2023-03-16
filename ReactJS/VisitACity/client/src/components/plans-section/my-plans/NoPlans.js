import { Link } from "react-router-dom";
export const NoPlans = () => {
    return (
        <div className="text-center">You have no plans yet. Create your first plan
            <span> <Link to="/createPlan">here</Link></span>
        </div>
    );
}