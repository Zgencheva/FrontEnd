
import { Header } from './components/common/Header.js';
import { Footer } from './components/common/Footer.js';
import { Search } from './components/search/Search.js';
import { UserSection } from './components/user-section/UserSection.js';
import { Pagination } from './components/common/Pagination.js';
import './App.css';

function App() {
    return (
        <div>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search/>
                    <UserSection/>
                    <Pagination/>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
