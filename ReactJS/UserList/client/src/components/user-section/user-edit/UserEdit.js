import { useState } from "react";

export const UserEdit = ({ user, onClose, onEdit }) => {
    const [errors, setError] = useState({});
    const [touched, setFormTouched] = useState(false);
    const [values, setValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        imageUrl: user.imageUrl,
        country: user.address.country,
        city: user.address.city,
        street: user.address.street,
        streetNumber: Number(user.address.streetNumber),
    });

    const onValueChange = (e) => {
        console.log(Object.values(errors))
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            ...address
        } = values;

        const userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            address
        }
        onEdit(userData)
    };
    const onFocusEventHandler = () => {
        setFormTouched(true);
    }
    const minLength = (e, minValue) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: e.target.value.length < minValue,
                message: `${e.target.name} should be at least ${minValue} characters long`
            },

        }))
    }
    const validateEmail = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)),
                message: 'Invalid email'
            },
        }));
    };
    const validateImageUrl = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: !(/^https?:\/\/.+/.test(e.target.value)),
                message: 'Invalid image url'
            },
        }));
    };
    const validatePhoneNumber = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: !(/^0[1-9]{1}[0-9]{8}$/.test(e.target.value)),
                message: 'Phone number should start with 0 and should be 10 characters long!'
            },
        }));
    };

    const positiveNumberValidation  = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: Number(e.target.value) <0,
                message: 'Street number should be a positive number!'
            },
        }));
    };
    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Edit User</h2>
                        <button className="btn close" onClick={onClose}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                </path>
                            </svg>
                        </button>
                    </header>
                    <form onSubmit={submitHandler}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text" 
                                    value={values.firstName} 
                                    onChange={onValueChange} 
                                    onBlur={(e) => minLength(e, 3)} 
                                    onFocus={onFocusEventHandler}/>
                                </div>
                                {errors.firstName?.isInvalid &&
                                    <p className="form-error">
                                        {errors.firstName?.message}
                                    </p>
                                }

                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text" 
                                    value={values.lastName} 
                                    onChange={onValueChange} 
                                    onBlur={(e) => minLength(e, 3)}
                                    onFocus={onFocusEventHandler} />
                                </div>
                                {errors.lastName?.isInvalid &&
                                    <p className="form-error">
                                        {errors.lastName?.message}
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-envelope"></i></span>
                                    <input 
                                    id="email" 
                                    name="email" 
                                    type="text" 
                                    value={values.email} 
                                    onChange={onValueChange} 
                                    onBlur={(e) => validateEmail(e)} 
                                    onFocus={onFocusEventHandler}/>
                                </div>
                                {errors.email?.isInvalid &&
                                    <p className="form-error">{errors.email?.message}</p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-phone"></i></span>
                                    <input 
                                    id="phoneNumber" 
                                    name="phoneNumber" 
                                    type="text" 
                                    value={values.phoneNumber} 
                                    onChange={onValueChange} 
                                    onBlur={(e) => validatePhoneNumber(e)} 
                                    onFocus={onFocusEventHandler}/>
                                </div>
                                {errors.phoneNumber?.isInvalid &&
                                    <p className="form-error">{errors.phoneNumber?.message}</p>
                                }
                            </div>
                        </div>

                        <div className="form-group long-line">
                            <label htmlFor="imageUrl">Image Url</label>
                            <div className="input-wrapper">
                                <span><i className="fa-solid fa-image"></i></span>
                                <input 
                                id="imageUrl" 
                                name="imageUrl" 
                                type="text" 
                                value={values.imageUrl} 
                                onChange={onValueChange} 
                                onBlur={(e) => validateImageUrl(e)} 
                                onFocus={onFocusEventHandler}/>
                            </div>
                            {
                                errors.imageUrl?.isInvalid &&
                                <p className="form-error">{errors.imageUrl?.message}</p>
                            }

                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input 
                                    id="country" 
                                    name="country" 
                                    type="text" 
                                    value={values.country} 
                                    onChange={onValueChange} 
                                    onBlur={(e) => minLength(e, 2)} 
                                    onFocus={onFocusEventHandler}/>
                                </div>
                                {errors.country?.isInvalid &&
                                    <p className="form-error">
                                        {errors.country?.message}
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-city"></i></span>
                                    <input 
                                    id="city" 
                                    name="city" 
                                    type="text" 
                                    value={values.city} 
                                    onChange={onValueChange} 
                                    onBlur={(e) => minLength(e, 3)}
                                    onFocus={onFocusEventHandler}/>
                                </div>
                                {errors.city?.isInvalid &&
                                    <p className="form-error">
                                        {errors.city?.message}
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input 
                                    id="street" 
                                    name="street" 
                                    type="text" 
                                    value={values.street}
                                    onChange={onValueChange} 
                                    onBlur={(e) => minLength(e, 3)}
                                    onFocus={onFocusEventHandler}/>
                                </div>
                                {errors.street?.isInvalid &&
                                    <p className="form-error">
                                        {errors.street?.message}
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetNumber">Street number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-house-chimney"></i></span>
                                    <input 
                                    id="streetNumber" 
                                    name="streetNumber" 
                                    type="text" 
                                    value={values.streetNumber} 
                                    onChange={onValueChange} 
                                    onBlur={(e) => positiveNumberValidation(e)}
                                    onFocus={onFocusEventHandler}/>
                                </div>
                                {errors.streetNumber?.isInvalid &&
                                    <p className="form-error">
                                        {errors.streetNumber?.message}
                                    </p>
                                }
                            </div>
                        </div>
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit" disabled={Object.values(errors).some(er=> er.isInvalid) || !touched}>Save</button>
                            <button id="action-cancel" className="btn" type="button" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}