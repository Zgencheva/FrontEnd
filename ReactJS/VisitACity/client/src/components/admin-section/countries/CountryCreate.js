import { useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { executeAsync } from "../../../helpers/exceptions.js";
import { useForm } from "../../../hooks/useForm.js";
import * as countriesService from '../../../services/countriesService.js';

export const CountryCreate = ({countries}) => {
    const { values, onValueChange } = useForm({
        country: '',
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
        const currentCountry = {
            name: values.country,
            cities: [],
        }
        const fetchData = async () => await countriesService.createCountry(currentCountry, countries);
        const [res, err] = await executeAsync(fetchData);
        if (err) {
            return setServerError(err);
        }
        setSuccess(true);
    }
    return (
        <section className="countryCreate">
                            {success && <div className="alert alert-primary" role="alert">
                    Country {values.country} added successfully!
                </div>}
            <div className="row">
                <div className="col-sm-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label className="form-label">Country</label>
                            <input
                                id="country"
                                name="country"
                                className="form-control"
                                onChange={onValueChange}
                                onBlur={(e) => validateInput(e)}
                                value={values.country}>
                            </input>
                            {errors.country?.isInvalid && <span className="text-danger">{errors.country.message}</span>}

                        </div>
                        <div className="mb-3">
                            <input className="btn btn-primary" type="submit" value="Add" />
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