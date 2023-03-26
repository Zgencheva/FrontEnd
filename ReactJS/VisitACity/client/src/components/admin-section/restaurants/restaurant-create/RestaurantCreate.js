import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as restaurantService from '../../../../services/restaurantService.js';
import { saveImageToCloudinary } from '../../../../helpers/saveImageToClodinary.js';
import { useForm } from '../../../../hooks/useForm.js';

export const RestaurantCreate = ({ countries }) => {
    const navigate = useNavigate();
    const { values, onValueChange } = useForm({
        name: '',
        phoneNumber: '',
        address: '',
        restaurantUrl: '',
    });
    const [cities, setCities] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setError] = useState({});

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        const data = {
            ...values,
            comments: [],
        }
        if (selectedImage != null) {
            data.image = await saveImageToCloudinary(selectedImage);
        }
        await restaurantService.create(data)
            .then(res => navigate(`/`));
    }
    const renderCities = (e) => {
        let id = e.target.value;
        setCities(countries.filter(c => c.name == id)[0].cities);
    };
    const minLength = (e, minValue) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: e.target.value.length < minValue,
                message: `Input should be at least ${minValue} characters long`
            },

        }))
    }

    const validateUrl = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: !(/^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value)),
                message: 'Invalid url'
            },
        }));
    };
    return (
        <section id="attraction-edit">
            <h1 className="text-center"> Create Restaurant</h1>
            <div className="row">
                <div className="col-sm-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <form onSubmit={onFormSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label className="form-label">Country</label>
                            <select
                                id="CountryList"
                                name="country"
                                className="form-control"
                                onChange={onValueChange}
                                onBlur={(e) => renderCities(e)}>
                                <option value={values.country}>Select country</option>
                                {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
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
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                name="name"
                                className="form-control"
                                aria-required="true"
                                value={values.name}
                                onChange={onValueChange}
                                onBlur={(e) => minLength(e, 3)} />
                            {errors.name?.isInvalid &&
                                <p className="text-danger">{errors.name?.message}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone number</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={onValueChange}
                                onBlur={(e) => minLength(e, 3)} />
                                {errors.phoneNumber?.isInvalid &&
                                    <p className="text-danger">{errors.phoneNumber?.message}</p>
                                }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input type="file"
                                className="form-control"
                                aria-required="true"
                                name='image'
                                onChange={(e) => setSelectedImage(e.target.files[0])} />
                            <span className="text-danger"></span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="address"
                                value={values.address}
                                onChange={onValueChange} 
                                onBlur={(e) => minLength(e, 6)} />
                                {errors.address?.isInvalid &&
                                    <p className="text-danger">{errors.address?.message}</p>
                                }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">RestaurantUrl</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="restaurantUrl"
                                value={values.restaurantUrl}
                                onChange={onValueChange} 
                                onBlur={(e)=>validateUrl(e)}/>
                             {errors.restaurantUrl?.isInvalid &&
                                    <p className="text-danger">{errors.restaurantUrl?.message}</p>
                                }
                        </div>
                        <div className="mb-3">
                            <input className="btn btn-primary" type="submit" value="Create" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}