import { useState, useEffect } from 'react';
import styles from './CreatePlan.module.css';
import * as countryService from '../../../services/countriesService.js'

export const CreatePlan = (userId) => {
    let today = GetDate();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [toDatestate, setTodate] = useState(today);
    const [errors, setError] = useState({});
    const [values, setValues] = useState({
        country: '',
        city: '',
        fromDate: today,
        toDate: today,
    });
    const onValueChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: [e.target.name] == 'toDate' ? setTodate(e.target.value) : e.target.value,
        }));
    };
    useEffect(() => {
        countryService.getAll()
            .then(c => setCountries(Object.values(c)));
    }, []);

    const renderCities = (e) => {
        let id = e.target.value;
        setCities(countries.filter(c => c._id == id)[0].cities);
    };

    return (
        <form method="post" className={`col-md-6 offset-md-3 ${styles['form-createPlan']}`}>
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
                    onBlur={(e) => setTodate(e.target.value)} />
                <span className="text-danger"></span>
            </div>
            <label className="form-label" htmlFor="toDate">To date</label>
            <div className="form-group">
                <input
                    id="toDate"
                    name="toDate"
                    type="date"
                    className="form-control"
                    value={toDatestate}
                    onChange={onValueChange} />
                <span className="text-danger"></span>
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