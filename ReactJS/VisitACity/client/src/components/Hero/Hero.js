import { useState } from 'react';
import styles from './Hero.module.css';

export const Hero = ({ statistics }) => {
    const [values, setValues] = useState({
        cityName: '',
        radioOption: 'attraction',
    });
    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };
    const submitHandler = (e) => {
        e.preventDefault();

        // let values = Object.fromEntries(new FormData(e.target))
        // console.log(values);

        console.log(values);
    };
    return (<div className={`bg ${styles.bg}`}>
        <div className={`text-center page-header ${styles.pageHeader} `}>
            <h1 className="display-4" style={{ color: 'white' }}>Welcome to Visit<span className="feature-icon"><i className="fa fa-mountain"></i></span>City</h1>
            <h2 style={{ color: 'white' }}>
                Create Your Personal Travel Guide
                <a> Here</a>
            </h2>
            <br />
            <h3 className="display-12" style={{ color: 'white' }}>Where are you travelling to?</h3>
        </div>
        <form onSubmit={submitHandler} className={`col-md-6 offset-md-3 ${styles.formStyle}`}>
            <div className={`form-group col-md-6 offset-md-3 ${styles.input}`}>
                <input name="cityName" className="form-control" placeholder="City" value={values.cityName} onChange={changeHandler}/>
            </div>
            <fieldset className={`col-md-6 offset-md-4 ${styles.fieldsetStyle}`}>
                <div className="form-check" style={{ color: 'white' }}>
                    <input className="form-check-input" type="radio" name="radioOption" id="attraction-radio-option" value="attraction"  onChange={changeHandler} checked={values.radioOption == 'attraction'}/>
                    <label className="form-check-label" htmlFor="exampleRadios1">
                        Attractions
                    </label>
                </div>
                <div className="form-check" style={{ color: 'white' }}>
                    <input className="form-check-input" type="radio" name="radioOption" id="restaurant-radio-option" value="restaurant" onChange={changeHandler} checked={values.radioOption == 'restaurant'}/>
                    <label className="form-check-label" htmlFor="exampleRadios2">
                        Restaurants
                    </label>
                </div>
            </fieldset>
            <button type="submit" className={`btn btn-primary col-md-3 offset-md-4`}>Search</button>
        </form>
        <div classes={`h-10 d-inline-block`}>
            <div className="row align-items-center" style={{ color: 'white' }}>
                <div className={`col-sm ${styles.colsm}`}>
                    <div className="feature-icon">
                        <i className="fa fa-city"></i> <span>{statistics.cities} Cities</span>
                    </div>
                </div>
                <div className={`col-sm ${styles.colsm}`}>
                    <div className="feature-icon">
                        <i className="fa fa-eye"></i> <span>{statistics.attractions} Attractions</span>
                    </div>
                </div>
                <div className={`col-sm ${styles.colsm}`}>
                    <div className="feature-icon">
                        <i className="fa fa-utensils"></i> <span>0 Restaurants</span>
                    </div>
                </div>
            </div>
        </div>
        <br />
    </div>);
}


