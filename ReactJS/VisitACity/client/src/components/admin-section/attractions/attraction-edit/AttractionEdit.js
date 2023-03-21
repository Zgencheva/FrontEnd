import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as attractionService from '../../../../services/attractionService.js';
import styles from './AttractionEdit.module.css';
import { saveImageToCloudinary } from '../../../../helpers/saveImageToClodinary.js';

export const AttractionEdit = ({ countries }) => {
    const navigate = useNavigate();
    const { attractionId } = useParams();
    const [attraction, setAttraction] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
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
        console.log(selectedImage);
        if(selectedImage != null) {
            const url = await saveImageToCloudinary(selectedImage);
            setAttraction(state => ({
                ...state,
                image: url,
            }))
        }       
        console.log(attraction) 
        await attractionService.editAttraction(attractionId, attraction);
        navigate(`/attractions/${attractionId}`)     

    }
    
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
                                onChange={onValueChange} />
                            <span className="text-danger"></span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="type"
                                value={attraction.type}
                                onChange={onValueChange} />
                            <span className="text-danger"></span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="price"
                                value={attraction.price}
                                onChange={onValueChange} />
                            <span className="text-danger"></span>
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
                                value={attraction.address}
                                onChange={onValueChange} />
                            <span className="text-danger"></span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">AttractionUrl</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name="attractionUrl"
                                value={attraction.attractionUrl}
                                onChange={onValueChange} />
                            <span className="text-danger"></span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                className="form-control"
                                aria-required="true"
                                name='description'
                                value={attraction.description}
                                onChange={onValueChange} />
                            <span className="text-danger"></span>
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