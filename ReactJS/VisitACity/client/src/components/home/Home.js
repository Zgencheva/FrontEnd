import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AttractionsList } from '../attractions-section/attractions-list/AttractionsList.js';
import styles from './Home.module.css';
import { Hero } from './hero/Hero.js';
import * as attractionService from '../../services/attractionService.js';
import * as citiesService from '../../services/citiesService.js';
import * as restaurantService from '../../services/restaurantService.js';


export const Home = () => {
    const navigate = useNavigate();

    const {cityName, radioOption} = useParams();
    const [heroStatistics, setHeroStatistics] = useState({});
    const [renderBody, setRenderBody] = useState([])

    useEffect(() => {
            attractionService.getAll()
            .then(attractions => {
                setHeroStatistics(state => ({
                    ...state,
                    attractions: Object.values(attractions).length,
                }));
                if(radioOption === 'attraction'){
                    setRenderBody(Object.values(attractions).filter(x=> x.city === cityName));
                }
                else{
                    setRenderBody(Object.values(attractions));
                }
                
            });
        
        citiesService.getAll()
            .then(cities => {
                setHeroStatistics(state => ({
                    ...state,
                    cities: Object.values(cities).length,
                }));
            });

            // restaurantService.getAll()
            // .then(restaurants => {
            //     setHeroStatistics(state => ({
            //         ...state,
            //         restaurants: Object.values(restaurants).length,
            //     }));
            // });

    }, [cityName, radioOption]);

    const onSearch = (e) => {
        e.preventDefault();

        let values = Object.fromEntries(new FormData(e.target));
        navigate(`/${values.cityName}/${values.radioOption}`);
    }

    return (
        <main role="main" className="pb-3">
            <Hero statistics={heroStatistics} onSearch={onSearch}/>
            <div className={`container ${styles.container}`}>
                <AttractionsList data={renderBody} />
            </div>
        </main>
    );
}