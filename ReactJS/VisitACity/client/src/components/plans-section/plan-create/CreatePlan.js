import { useState, useEffect } from 'react';
import styles from './CreatePlan.module.css';
import { GetDate } from '../../../helpers/getDate.js';
import { CreateGUID } from '../../../helpers/newGuid.js';
import * as countryService from '../../../services/countriesService.js'
import * as userService from '../../../services/userService.js';

export const CreatePlan = (userId) => {
    userId = "efb8eea7-350b-4c19-8698-766196b21a30";
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
        fromDate: today,
        toDate: today,
    });
    const onValueChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        countryService.getAll()
            .then(c => setCountries(Object.values(c)));
    }, []);

    const renderCities = (e) => {
        let id = e.target.value;
        setCities(countries.filter(c => c.name == id)[0].cities);
    };

    const validateFromDate = (e) => {
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

    const submitHandler = async (e) => {
        e.preventDefault();
        var data = ({
            ...values,
            userId,
            attractions: [],
            restaurants: [],
            _id: CreateGUID(),
        })
        const user = await userService.getById(userId);
        if(user.plans.some(x=> x.city == data.city)){
            setError(state => ({
                ...state,
                submit: {
                    isInvalid: true,
                    message: `You already have plans in ${data.city}"`
                }
            }))
            return;
        }
        user.plans.push(data);
        await userService.addPlanToUser(user);
        console.log(user);        
    }

    return (
        <form  onSubmit={submitHandler} className={`col-md-6 offset-md-3 ${styles['form-createPlan']}`}>
            <h2>Where are you travelling to?</h2>
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
                    {cities.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
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
            <br/>
            {errors.submit?.isInvalid &&
                    <span className="text-danger">{errors.submit?.message}</span>
                    }
        </form>
    );
}