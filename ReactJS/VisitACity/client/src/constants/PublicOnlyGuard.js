import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";
import { routes } from "./routes.js";
import { Home } from "../components/home/Home.js";

export const PublicOnlyGuard = () => {
    const {isAuthenticated} = useContext(
        AuthContext
    );
    if(isAuthenticated){
        return <Navigate to={routes.home} replace/>
    }

    return <Outlet/>
}