import { useState, useEffect } from 'react';
import { AttractionsList } from '../attractions-section/attractions-list/AttractionsList.js';
import styles from './Home.module.css';
import { Hero } from './hero/Hero.js';
import * as attractionService from '../../services/attractionService.js';
import * as citiesService from '../../services/citiesService.js';

export const Home = () => {
    const [heroStatistics, setHeroStatistics] = useState({});
    const [renderBody, setRenderBody] = useState([])

    useEffect(() => {
        attractionService.getAll()
            .then(attractions => {
                setHeroStatistics(state => ({
                    ...state,
                    attractions: Object.values(attractions).length,
                }));
                setRenderBody(Object.values(attractions));
            });
        citiesService.getAll()
            .then(cities => {
                setHeroStatistics(state => ({
                    ...state,
                    cities: Object.values(cities).length,
                }));
            });
    }, []);

    return (
        <main role="main" className="pb-3">
            <Hero statistics={heroStatistics} />
            <div className={`container ${styles.container}`}>
                <AttractionsList data={renderBody} />
            </div>
        </main>
    );
}