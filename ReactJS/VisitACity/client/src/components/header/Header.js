import { LoginNavigation } from "./LoginNavigation.js";
import { Link } from 'react-router-dom';
import { Admin } from "./Admin.js";

export const Header = () => {
    return (
        <header className="App-header">
            <div className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top border-bottom box-shadow mb-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">VisitACity</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/createPlan">Create Plan</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/myPlans">My plans</Link>
                            </li>
                        </ul>
                        <LoginNavigation />
                    </div>
                </div>
            </div>
        </header>
    );
};