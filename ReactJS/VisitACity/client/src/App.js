import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation.js';
import { Home } from './components/home/Home.js';
import { MyPlans } from './components/plans-section/my-plans/MyPlans.js';
import { PlanDetails } from './components/plans-section/PlanDetails/PlanDetails.js';
import { CreatePlan } from './components/plans-section/plan-create/CreatePlan.js';
import { Login } from './components/authentication/login/Login.js';
import { Register } from './components/authentication/register/Register.js';
import { AttractionDetails } from './components/attractions-section/attraction-details/AttractionDetails.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/myPlans' element={<MyPlans/>}/>
          <Route path='/createPlan' element={<CreatePlan/>}/>
          <Route path='/attractions/:attractionId' element={<AttractionDetails/>}/>
          <Route path='/myPlans/:planId' element={<PlanDetails/>}/>


          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </header>
      
      <footer></footer>
    </div>
  );
}

export default App;
