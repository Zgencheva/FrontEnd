import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as restaurantService from '../../../../services/restaurantService.js';
import { saveImageToCloudinary } from '../../../../helpers/saveImageToClodinary.js';
import { ValidateImage } from '../../../../helpers/validateImage.js';

export const RestaurantEdit = ({ countries }) => {
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setError] = useState({});

    useEffect(() => {
        restaurantService.getById(restaurantId)
            .then(result => {
                setRestaurant(result);
            });
    }, [restaurantId]);

    const onValueChange = (e) => {
        setRestaurant(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };
    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (selectedImage) {
            if (ValidateImage(selectedImage) === false) {
                setError(state => ({
                    ...state,
                    ['image']: {
                        isInvalid: true,
                        message: `Image extension is not allowed!`
                    },

                }))
                return;
            }
            restaurant.image = await saveImageToCloudinary(selectedImage);
        }
        setRestaurant(restaurant)
        await restaurantService.edit(restaurantId, restaurant);
        navigate(`/restaurants/${restaurantId}`)
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
        <section id="restaurant-edit">
            <h1 className="text-center"> Update restaurant</h1>
            <div className="row">
                <div className="col-sm-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <form onSubmit={onFormSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                name="name"
                                className="form-control"
                                aria-required="true"
                                value={restaurant.name}
                                onChange={onValueChange}
                                onBlur={(e) => minLength(e, 3)} />
                            {errors.name?.isInvalid &&
                                <p className="text-danger">{errors.name?.message}</p>
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
                                value={restaurant.address}
                                onChange={onValueChange}
                                onBlur={(e) => minLength(e, 6)} />
                            {errors.address?.isInvalid &&
                                <p className="text-danger">{errors.address?.message}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone number</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="phoneNumber"
                                value={restaurant.phoneNumber}
                                onChange={onValueChange}
                                onBlur={(e) => minLength(e, 3)} />
                            {errors.phoneNumber?.isInvalid &&
                                <p className="text-danger">{errors.phoneNumber?.message}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Restaurant Url</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="restaurantUrl"
                                value={restaurant.restaurantUrl}
                                onChange={onValueChange}
                                onBlur={(e) => validateUrl(e)} />
                            {errors.restaurantUrl?.isInvalid &&
                                <p className="text-danger">{errors.restaurantUrl?.message}</p>
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