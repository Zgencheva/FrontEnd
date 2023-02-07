import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header title="Hello from jsx props"/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
