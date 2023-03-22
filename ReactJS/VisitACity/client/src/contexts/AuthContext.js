import { createContext, useState } from "react";
import { routes } from "../constants/routes.js";
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from "../hooks/useLocalStorage.js";
import * as auth from '../services/authServices.js';


export const AuthContext = createContext(); 

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user', {});
    const [serverErrors, setError] = useState({});
    const onUserRegister = async (values) => {
        try {
          var user = await auth.register(values);
          setUser(user);
          navigate(routes.home)
        } catch (error) {
          //TODO: Error page:
          console.log(error.message)
        }
      }
      const onUserLogin = async (values) => {
        try {
          var user = await auth.login(values);
          setUser(user);
          navigate(routes.home)
        } catch (error) {
          setError(state=> ({
            ...state,
            login: {
              isInvalid: true,
              message: 'Invalid details',
            }
          }));
        }
      }
      const onLogout = async () => {
        try {
          await auth.logout();
          setUser({});
          navigate(routes.home)
        } catch (error) {
          //TODO: Error page:
          console.log(error.message);
        }
    
      }
    return(
        <AuthContext.Provider value={{ 
            user,
            isAuthenticated: !!user.accessToken,
            isAdmin: user.email === 'visitacity@abv.bg',
            serverErrors, 
            onLogout, 
            onUserLogin, 
            onUserRegister }}>
            {children}
        </AuthContext.Provider>
    );
}