import { Admin } from "./Admin.js"

export const LoginNavigation = ({ user }) => {
    return (
        <ul className="navbar-nav">
            {user != null &&
                <>
                    <li className="nav-item">
                        <a className="nav-link text-dark" asp-area="Identity" asp-page="/Account/Manage/Index" title="Manage">Hello, user!</a>
                    </li>
                    {user?.role == 'Admin' && <Admin />}
                    <li className="nav-item">
                        <button type="submit" className="nav-link btn btn-link text-dark">Logout</button>
                    </li>
                </>
            }
            {user == null &&
                <> <li className="nav-item">
                    <a className="nav-link text-dark" asp-area="Identity" asp-page="/Account/Register">Register</a>
                </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" asp-area="Identity" asp-page="/Account/Login">Login</a>
                    </li>
                </>
            }

        </ul>
    );
};