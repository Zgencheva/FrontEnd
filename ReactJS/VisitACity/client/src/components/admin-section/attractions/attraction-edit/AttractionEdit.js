import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as attractionService from '../../../../services/attractionService.js';
import styles from './AttractionEdit.module.css';
import { saveImageToCloudinary } from '../../../../helpers/saveImageToClodinary.js';
import { ValidateImage } from '../../../../helpers/validateImage.js';

export const AttractionEdit = () => {
    
    const navigate = useNavigate();
    const { attractionId } = useParams();
    const [attraction, setAttraction] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setError] = useState({});

    useEffect(() => {
        attractionService.getById(attractionId)
            .then(att => {
                setAttraction(att);
            });
    }, [attractionId]);

    const onValueChange = (e) => {
        setAttraction(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };
    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (selectedImage) {
            if(ValidateImage(selectedImage) === false){
                setError(state => ({
                    ...state,
                    ['image']: {
                        isInvalid: true,
                        message: `Image extension is not allowed!`
                    },
        
                }))
                return;
            }
            attraction.image = await saveImageToCloudinary(selectedImage)
        }
        setAttraction(attraction)
        await attractionService.editAttraction(attractionId, attraction);
        navigate(`/attractions/${attractionId}`)
    }
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
                isInvalid: Number(e.target.value) < 0 || isNaN(e.target.value),
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
            <h1 className="text-center"> Update attraction</h1>
            <div className="row">
                <div className="col-sm-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <form onSubmit={onFormSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                name="name"
                                className="form-control"
                                aria-required="true"
                                value={attraction.name}
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
                                value={attraction.type}
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
                                value={attraction.price}
                                onChange={onValueChange} onBlur={(e) => positiveNumber(e)} />
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
                                value={attraction.address}
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
                                value={attraction.attractionUrl}
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
                                value={attraction.description}
                                onChange={onValueChange}  
                                onBlur={(e) => minLength(e, 6)} />
                                {errors.description?.isInvalid &&
                                    <p className="text-danger">{errors.description?.message}</p>
                                }
                        </div>
                        <div className="mb-3">
                            <input className="btn btn-primary" type="submit" value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}