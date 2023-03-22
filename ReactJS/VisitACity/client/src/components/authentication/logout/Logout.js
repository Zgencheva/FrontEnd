import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext.js";

export const Logout = () => {
    const {serverErrors, onLogout} = useContext(
        AuthContext
    );
    useEffect(()=> {
        onLogout();
    },[])
    return null;
}