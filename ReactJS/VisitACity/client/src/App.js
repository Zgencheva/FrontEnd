import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header.js';
import { Home } from './components/home/Home.js';
import { MyPlans } from './components/plans-section/my-plans/MyPlans.js';
import { PlanDetails } from './components/plans-section/PlanDetails/PlanDetails.js';
import { CreatePlan } from './components/plans-section/plan-create/CreatePlan.js';
import { Login } from './components/authentication/login/Login.js';
import { Register } from './components/authentication/register/Register.js';
import { AttractionDetails } from './components/attractions-section/attraction-details/AttractionDetails.js';
import { Footer } from './components/footer/Footer.js';
import {routes} from './constants/routes.js';
import styles from './App.module.css';

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.myPlans} element={<MyPlans />} />
          <Route path={routes.createPlan} element={<CreatePlan />} />
          <Route path={routes['attraction-details'] }element={<AttractionDetails />} />
          <Route path={routes['plan-details']} element={<PlanDetails />} />


          <Route path={routes.login} element={<Login />} />
          <Route path={routes.register} element={<Register />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
