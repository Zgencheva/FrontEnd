import { useState, useEffect } from 'react';
import { AttractionsList } from './components/attractions-section/attractions-list/AttractionsList.js';
import styles from './App.module.css';
import { Hero } from './components/hero/Hero.js';
import { Navigation } from './components/navigation/Navigation.js';
import * as attractionService from './services/attractionService.js';
import * as citiesService from './services/citiesService.js';
// import * as countriesService from './services/countriesService.js';

function App() {
  const [heroStatistics, setHeroStatistics] = useState({});
  const [renderBody, setRenderBody] = useState([])

  useEffect(()=> {
    attractionService.getAll()
        .then(attractions => {
          setHeroStatistics(state=> ({
            ...state,
            attractions: Object.values(attractions).length,
          }));
          setRenderBody(Object.values(attractions));
        });
    citiesService.getAll()
        .then(cities => {
          setHeroStatistics(state=> ({
            ...state,
            cities: Object.values(cities).length,
          }));
        });
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <Hero statistics={heroStatistics}/>
      </header>
      <main role="main" className="pb-3">
        <div className={`container ${styles.container}`}>
          <AttractionsList data={renderBody}/>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
