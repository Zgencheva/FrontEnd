import { useState, useEffect } from 'react';
import styles from './CreatePlan.module.css';
import * as countryService from '../../../services/countriesService.js'

export const CreatePlan = (userId) => {
    let today = GetDate();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setError] = useState({
        fromDate: {
            isInvalid: false,
            message: `Start date cannot be in the past.`,
        },
        toDate: {
            isInvalid: false,
            message: `To date cannot be before start date.`,
        }
    });
    const [values, setValues] = useState({
        country: '',
        city: '',
        fromDate: today,
        toDate: today,
    });
    const onValueChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        console.log(values);
    };
    useEffect(() => {
        countryService.getAll()
            .then(c => setCountries(Object.values(c)));
    }, []);

    const renderCities = (e) => {
        let id = e.target.value;
        setCities(countries.filter(c => c._id == id)[0].cities);
    };

    const validateFromDate = (e) => {
        console.log(e.target.value < GetDate(new Date()));
        setError(state=> ({
            ...state,
            [e.target.name]: {
                isInvalid: e.target.value < GetDate(new Date()),
                message: `Start date cannot be in the past.`
            },
        }));
    }

    const validateToDate = (e) => {
        setError(state=> ({
            ...state,
            [e.target.name]: {
                isInvalid: e.target.value < values.fromDate,
                message: `To date cannot be before start date.`
            }
        }))
    }

    return (
        <form  className={`col-md-6 offset-md-3 ${styles['form-createPlan']}`}>
            <h2>Where are you travelling to?</h2>
            <div className="form-group">
                <label className="form-label">Country</label>
                <select
                    id="CountryList"
                    name="CountryId"
                    className="form-control"
                    onChange={onValueChange}
                    onBlur={(e) => renderCities(e)}>
                    <option value={values.country}>Select country</option>
                    {countries.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <span className="text-danger"></span>
            </div>
            <div className="form-group">
                <label className="form-label">City</label>
                <select
                    id="CityList"
                    name="CityId"
                    className="form-control"
                    onChange={onValueChange}>
                    <option value={values.city}>Select city</option>
                    {cities.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
                <span className="text-danger"></span>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor='fromDate'>From date</label>
                <input
                    type="date"
                    className="form-control"
                    id="fromDate"
                    name="fromDate"
                    value={values.fromDate}
                    onChange={onValueChange}
                    onBlur={(e)=> validateFromDate(e)} />
                    {errors.fromDate?.isInvalid &&
                    <span className="text-danger">{errors.fromDate?.message}</span>
                    }
                
            </div>
            <label className="form-label" htmlFor="toDate">To date</label>
            <div className="form-group">
                <input
                    id="toDate"
                    name="toDate"
                    type="date"
                    className="form-control"
                    value={values.toDate}
                    onChange={onValueChange}
                    onBlur={(e)=> validateToDate(e)}/>
                 {errors.toDate?.isInvalid &&
                    <span className="text-danger">{errors.toDate?.message}</span>
                    }
            </div>
            <p></p>
            <button type="submit" className="btn btn-primary">Create your plan</button>
        </form>
    );
}

export const GetDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) { dd = `0${dd}`; };
    if (mm < 10) { mm = `0${mm}`; };
    today = `${yyyy}-${mm}-${dd}`;
    return today;
}