import { createContext, useState } from "react";
import * as countriesService from '../services/countriesService.js';
import { executeAsync } from "../helpers/exceptions.js";


export const CountriesContext = createContext(); 

export const CountriesProvider = ({
    children,
}) => {
    const [countries, setCountries] = useState([]);   
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState(new Error());

  const onCountryCreate = async (values) => {
        const currentCountry = {
            name: values.country,
            cities: [],
        }
        const fetchData = async () => await countriesService.createCountry(currentCountry, countries);
        const [res, err] = await executeAsync(fetchData);
        if (err) {
            return setServerError(err);
        }
        setCountries(state=> [...state, fetchData])
        setSuccess(true);
  }

  const populateCountries = async () => {
    countriesService.getAll()
    .then(c => setCountries(Object.values(c)));

  }
    return(
        <CountriesContext.Provider value={{ 
            countries,
            onCountryCreate,
            success,
            serverError,
            populateCountries,
            setSuccess
            }}>
            {children}
        </CountriesContext.Provider>
    );
}