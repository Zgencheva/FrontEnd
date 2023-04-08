import { useContext, useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { executeAsync } from "../../../helpers/exceptions.js";
import { useForm } from "../../../hooks/useForm.js";
import * as countriesService from '../../../services/countriesService.js';
import { CountriesContext } from "../../../contexts/CountriesContext.js";

export const CityCreate = () => {
    const { countries } = useContext(
        CountriesContext
    );
    const { values, onValueChange } = useForm({
        country: '',
        city: '',
    })
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState(new Error());
    const [errors, setError] = useState({});
    const validateInput = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: e.target.value.length < 3,
                message: `Input should be at least 3 characters long`
            }
        }))
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        const fetchData = async () => await countriesService.addCity(values, countries);
        const [res, err] = await executeAsync(fetchData);
        if (err) {
            return setServerError(err);
        }
        setSuccess(true)
    }
    return (
        <section className="cityCreate">
            {success && <div className="alert alert-primary" role="alert">
                City {values.city} added successfully!
            </div>}
            <div className="row">
                <div className="col-sm-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label className="form-label">Country</label>
                            <select
                                data-testid="country-input"
                                id="CountryList"
                                name="country"
                                className="form-control"
                                onChange={onValueChange}>
                                <option value={values.country}>Select country</option>
                                {countries.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                            </select>
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <label className="form-label">City</label>
                            <input
                                data-testid="city-input"
                                id="CityList"
                                name="city"
                                className="form-control"
                                onChange={onValueChange}
                                onBlur={(e) => validateInput(e)}
                                value={values.city}>
                            </input>
                            {errors.city?.isInvalid && <span className="text-danger">{errors.city.message}</span>}

                        </div>
                        <div className="mb-3">
                            <input data-testid="city-create" disabled={Object.values(errors).some(er => er.isInvalid)} className="btn btn-primary" type="submit" value="Add" />
                        </div>
                    </form>
                    {serverError &&
                        <span className="text-danger">{serverError.message}</span>
                    }
                </div>

            </div>
        </section>

    );
}