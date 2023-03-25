import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AttractionsList } from '../attractions-section/attractions-list/AttractionsList.js';
import styles from './Home.module.css';
import { Hero } from './hero/Hero.js';
import * as attractionService from '../../services/attractionService.js';
import * as citiesService from '../../services/citiesService.js';

export const Home = () => {
    const navigate = useNavigate();

    const {cityName, radioOption} = useParams();
    const [searchTerms, setsearchTerms] = useState({});
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
            setsearchTerms({});
    }, [searchTerms]);

    const onSearch = (e) => {
        e.preventDefault();

        let values = Object.fromEntries(new FormData(e.target));
        navigate(`/${values.cityName}/${values.radioOption}`);
        console.log({...values});
        setsearchTerms({cityName: values.cityName, radioOption: values.radioOption});
    }
    console.log(searchTerms);
    return (
        <main role="main" className="pb-3">
            <Hero statistics={heroStatistics} onSearch={onSearch}/>
            <div className={`container ${styles.container}`}>
                <AttractionsList data={renderBody} />
            </div>
        </main>
    );
}