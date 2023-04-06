import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import * as attractionService from '../../../../services/attractionService.js';
import styles from './AttractionCreate.module.css';
import { saveImageToCloudinary } from '../../../../helpers/saveImageToClodinary.js';
import { useForm } from '../../../../hooks/useForm.js';
import { ValidateImage } from '../../../../helpers/validateImage.js';
import { CountriesContext } from '../../../../contexts/CountriesContext.js';

export const AttractionCreate = () => {
    const {countries} = useContext(
        CountriesContext
    );
    const navigate = useNavigate();
    const { values, onValueChange } = useForm({
        name: '',
        type: '',
        price: '',
        address: '',
        attractionUrl: '',
        description: '',
    });
    const [cities, setCities] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setError] = useState({});

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const attraction = {
            ...values,
            userReviews: [],

        }

        if(ValidateImage(selectedImage)=== true){
            attraction.image = await saveImageToCloudinary(selectedImage);
            await attractionService.createAttraction(attraction)
                .then(res => navigate(`/attractions/${res._id}`));
        }
        else{
            setError(state => ({
                ...state,
                ['image']: {
                    isInvalid: true,
                    message: `Image extension is not allowed!`
                },
    
            }))
        }
        
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
    const positiveNumber = (e) => {
        setError(state => ({
            ...state,
            [e.target.name]: {
                isInvalid: Number(e.target.value) < 0 || isNaN(e.target.value) ,
                message: `Input should be a positive number`
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
            <h1 className="text-center"> Create attraction</h1>
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
                            <label className="form-label">Type</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="type"
                                value={values.type}
                                onChange={onValueChange} 
                                onBlur={(e) => minLength(e, 3)} />
                                {errors.type?.isInvalid &&
                                    <p className="text-danger">{errors.type?.message}</p>
                                }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="price"
                                value={values.price}
                                onChange={onValueChange} 
                                onBlur={(e) => positiveNumber(e)} />
                                {errors.price?.isInvalid &&
                                    <p className="text-danger">{errors.price?.message}</p>
                                }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input type="file"
                                className="form-control"
                                aria-required="true"
                                name='image'
                                onChange={(e) => setSelectedImage(e.target.files[0])} />
                             {errors.image?.isInvalid &&
                                    <p className="text-danger">{errors.image?.message}</p>
                                }
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
                            <label className="form-label">AttractionUrl</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="attractionUrl"
                                value={values.attractionUrl}
                                onChange={onValueChange} 
                                onBlur={(e)=>validateUrl(e)}/>
                             {errors.attractionUrl?.isInvalid &&
                                    <p className="text-danger">{errors.attractionUrl?.message}</p>
                                }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name='description'
                                value={values.description}
                                onChange={onValueChange} 
                                onBlur={(e) => minLength(e, 6)} />
                                {errors.description?.isInvalid &&
                                    <p className="text-danger">{errors.description?.message}</p>
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