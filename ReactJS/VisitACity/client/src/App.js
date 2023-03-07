import { Hero } from './components/Hero/Hero.js';
import { Navigation } from './components/Navigation/Navigation.js'

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
    </div>
  );
}

export default App;
