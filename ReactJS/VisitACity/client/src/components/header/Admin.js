import { Link } from "react-router-dom";
import { routes } from "../../constants/routes.js";

export const Admin = () =>{
    return (
        <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Admin
  </button>
  <ul className="dropdown-menu">
    <Link to={routes["attraction-create"]} className="dropdown-item" href="#">Create attraction</Link>
  </ul>
</div>
    );
}