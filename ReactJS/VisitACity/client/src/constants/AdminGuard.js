import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";
import { routes } from "./routes.js";

export const AdminGuard = () => {
    const {isAdmin} = useContext(
        AuthContext
    );
    if(!isAdmin){
        return <Navigate to={routes.login} replace/>
    }

    return <Outlet/>
}