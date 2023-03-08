import { Hero } from './components/hero/Hero.js';
import { Navigation } from './components/navigation/Navigation.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <Hero />
      </header>

      <main role="main" className="pb-3">
        <div className="container">

        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
