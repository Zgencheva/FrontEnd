import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePlan.module.css';
import { GetDate } from '../../../helpers/getDate.js';
import { routes } from '../../../constants/routes.js'
import { useForm } from '../../../hooks/useForm.js';
import * as planService from '../../../services/planService.js';
import { executeAsync } from '../../../helpers/exceptions.js';
import { CountriesContext } from '../../../contexts/CountriesContext.js';

export const CreatePlan = () => {
    const {countries} = useContext(
        CountriesContext
    );
        const { values, onValueChange } = useForm({
        fromDate: GetDate(),
        toDate: GetDate(),
    })
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const [serverError, setServerError] = useState(new Error())
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

    const renderCities = (e) => {
        let id = e.target.value;
        setCities(countries.filter(c => c.name == id)[0].cities);
    };

    const validateFromDate = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: e.target.value < GetDate(new Date()),
                message: `Start date cannot be in the past.`
            },
        }));
    }

    const validateToDate = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: e.target.value < values.fromDate,
                message: `To date cannot be before start date.`
            }
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        var data = ({
            ...values,
            attractions: [],
            restaurants: [],
        })
        const fetchData = async() => await planService.createPlan(data);
        const [res, err] = await executeAsync(fetchData);
        if (err) {
            return setServerError(err);
        }
            navigate(routes.myPlans);
    }


return (
    <form onSubmit={submitHandler} className={`col-md-6 offset-md-3 ${styles['form-createPlan']}`}>
        <h2>Where are you travelling to?</h2>
        {serverError &&
            <span className="text-danger">{serverError.message}</span>
        }
        <div className="form-group">
            <label className="form-label">Country</label>
            <select
                id="CountryList"
                name="country"
                className="form-control"
                onChange={onValueChange}
                onBlur={(e) => renderCities(e)}>
                <option value={values.country}>Select country</option>
                {countries.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
            </select>
            <span className="text-danger"></span>
        </div>
        <div className="form-group">
            <label className="form-label">City</label>
            <select
                id="CityList"
                name="city"
                className="form-control"
                onChange={onValueChange}>
                <option value={values.city}>Select city</option>
                {cities.map(s => <option key={s} value={s}>{s}</option>)}
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
                onBlur={(e) => validateFromDate(e)} />
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
                onBlur={(e) => validateToDate(e)} />
            {errors.toDate?.isInvalid &&
                <span className="text-danger">{errors.toDate?.message}</span>
            }
        </div>
        <p></p>
        <button type="submit" className="btn btn-primary">Create your plan</button>
        <br />
        {errors.submit?.isInvalid &&
            <span className="text-danger">{errors.submit?.message}</span>
        }
    </form>
);
}