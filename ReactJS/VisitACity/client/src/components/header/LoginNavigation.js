import { Link } from "react-router-dom";
import { Admin } from "./Admin.js";
import {
    AuthContext
} from "../../contexts/AuthContext.js";
import { useContext } from "react";

export const LoginNavigation = () => {

    const {user} = useContext(AuthContext);
    return (
        <ul className="navbar-nav">
            {user.accessToken ?
                <>
                    <li className="nav-item">
                        <a className="nav-link text-dark" title="Manage">Hello, {user !=null ? user.email : 'adventurer'}!</a>
                    </li>
                    {user?.role == 'admin' && <Admin />}
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link btn btn-link text-dark">Logout</Link>
                    </li>
                </>

                :
                <> <li className="nav-item">
                    <Link className="nav-link text-dark" to="/register">Register</Link>
                </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark" to="login">Login</Link>
                    </li>
                </>
            }
        </ul>
    );
};