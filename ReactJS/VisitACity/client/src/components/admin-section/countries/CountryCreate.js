import { useContext, useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm.js";
import { CountriesContext } from "../../../contexts/CountriesContext.js";

export const CountryCreate = () => {
    const {onCountryCreate, success, setSuccess, serverError} = useContext(
        CountriesContext
    );
    useEffect(()=> {
        setSuccess(false)
    },[])
    const { values, onValueChange, onSubmit } = useForm({
        country: ''
    },onCountryCreate)
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
    return (
        <section className="countryCreate">
                            {success && <div className="alert alert-primary" role="alert">
                    Country {values.country} added successfully!
                </div>}
            <div className="row">
                <div className="col-sm-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="form-label">Country</label>
                            <input
                                data-testid="country-input"
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
                            <input data-testid="add-country" disabled={Object.values(errors).some(er => er.isInvalid)} className="btn btn-primary" type="submit" value="Add" />
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