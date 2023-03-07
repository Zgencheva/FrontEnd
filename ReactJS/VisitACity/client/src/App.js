import { Hero } from './components/Hero/Hero.js';
import {Navigation} from './components/Navigation/Navigation.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Navigation/>
       <div className="container">
        <br/>
        <br/>
        <br/>
        <main role="main" class="pb-3">
            <div className="bs-docs-section">
                <Hero/>
            </div>
            
        </main>
    </div>
      </header>
    </div>
  );
}

export default App;
