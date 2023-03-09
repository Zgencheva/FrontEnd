import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation.js';
import { Home } from './components/home/Home.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </header>
      
      <footer></footer>
    </div>
  );
}

export default App;
