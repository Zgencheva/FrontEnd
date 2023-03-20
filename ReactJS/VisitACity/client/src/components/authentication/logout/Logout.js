import { useEffect } from "react";

export const Logout = ({onLogout}) => {
    useEffect(()=> {
        onLogout();
    },[])
    return null;
}