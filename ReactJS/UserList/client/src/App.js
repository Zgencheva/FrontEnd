
import { Header } from './components/common/Header.js';
import { Footer } from './components/common/Footer.js';
import { Search } from './components/search/Search.js';
import { UserSection } from './components/user-section/UserSection.js';
import { Pagination } from './components/common/Pagination.js';
import {SerchCriteria} from './components/search/SearchConstants.js'
import './App.css';
import { useState } from 'react';

function App() {
    const [criteria, setCriteria] = useState(SerchCriteria.firstName);
    const getSelectedCirteria = (e) => {
        setCriteria(e.target.value);
    }
    return (
        <div>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search criteriaOptions={getSelectedCirteria}/>
                    <UserSection criteria={criteria}/>
                    <Pagination/>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
