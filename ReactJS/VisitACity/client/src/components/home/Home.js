
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AttractionsList } from '../attractions-section/attractions-list/AttractionsList.js';
import { RestaurantList } from '../restaurants-section/restaurant-list/RestaurantList.js';
import styles from './Home.module.css';
import { Hero } from './hero/Hero.js';
import * as attractionService from '../../services/attractionService.js';
import * as citiesService from '../../services/citiesService.js';
import * as restaurantService from '../../services/restaurantService.js';
import { CountriesContext } from '../../contexts/CountriesContext.js';


export const Home = () => {
    const navigate = useNavigate();
    const {populateCountries} = useContext(
        CountriesContext
    );
    const { cityName, radioOption } = useParams();
    const [heroStatistics, setHeroStatistics] = useState({});
    const [attractions, setAttractions] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [renderAttractions, setRenderAttraction] = useState([]);
    const [renderRestaurants, setRenderRestaurants] = useState([]);

    useEffect(() => {
        populateCountries();
        attractionService.getAll()
            .then(attractions => {
                setHeroStatistics(state => ({
                    ...state,
                    attractions: Object.values(attractions).length,
                }));
                setAttractions(Object.values(attractions));
                if (radioOption === 'attraction') {
                    setRenderAttraction(Object.values(attractions).filter(x => x.city === cityName));
                }
                else {
                    setRenderAttraction(Object.values(attractions));
                }

            });
        citiesService.getAll()
            .then(cities => {
                setHeroStatistics(state => ({
                    ...state,
                    cities: Object.values(cities).length,
                }));
            });

        restaurantService.getAll()
            .then(restaurants => {
                setHeroStatistics(state => ({
                    ...state,
                    restaurants: Object.values(restaurants).length,
                }));
                setRestaurants(restaurants);
                if (radioOption === 'restaurant') {
                    setRenderRestaurants(Object.values(restaurants).filter(x => x.city === cityName));
                }
            });

    }, []);

    useEffect(() => {
        if (radioOption === 'attraction') {
            setRenderAttraction(attractions?.filter(x => x.city === cityName));
        }
        if (radioOption === 'restaurant') {
            setRenderRestaurants(restaurants?.filter(x => x.city === cityName));
        }
        if(!radioOption){
            setRenderAttraction(attractions);
        }
    }, [cityName, radioOption]);

    const onSearch = (e) => {
        e.preventDefault();

        let values = Object.fromEntries(new FormData(e.target));
        if(values.cityName != ''){
            navigate(`/${values.cityName}/${values.radioOption}`);
        }
    }

    return (
        <main role="main" className="pb-3">
            <Hero statistics={heroStatistics} onSearch={onSearch} />
            <div className={`container ${styles.container}`}>
                {radioOption === 'restaurant' ?
                    <RestaurantList data={renderRestaurants} />
                    :
                    <AttractionsList data={renderAttractions} />
                }
            </div>
        </main>
    );
}