import { LoginNavigation } from "./LoginNavigation.js";

export const Navigation = () => {
    return (
        <div className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top border-bottom box-shadow mb-3">
            <div className="container">
                <a className="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index" asp-route-id="1">VisitACity</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <a className="nav-link text-dark">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-dark">Create Plan</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark">My plans</a>
                        </li>
                    </ul>
                    <LoginNavigation />
                </div>
            </div>
        </div>
    );
};