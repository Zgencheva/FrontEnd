import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { routes } from './constants/routes.js';
import styles from './App.module.css';
import { AttractionEdit } from './components/admin-section/attractions/attraction-edit/AttractionEdit.js';
import * as countryService from './services/countriesService.js';
import { AuthContext } from './contexts/AuthContext.js';
import * as auth from './services/authServices.js';
import { Logout } from './components/authentication/logout/Logout.js';

function App() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useState({});

  const onUserRegister = async (values) => {
    try {
      var user = await auth.register(values);
      console.log(user);
      setUser(user);
      navigate(routes.home)     
    } catch (error) {
      console.log(error.message)
    }
  }
  const onUserLogin = async (values) => {
    try {
      var user = await auth.login(values);
      setUser(user);
      console.log(user);
      navigate(routes.home)     
    } catch (error) {
      console.log(error.message);
    }
  }
  const onLogout = () => {
    auth.logout();
    setUser({});
    navigate(routes.home)     
  }
  useEffect(() => {
    countryService.getAll()
      .then(c => setCountries(Object.values(c)));
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.myPlans} element={<MyPlans />} />
            <Route path={routes.createPlan} element={<CreatePlan countries={countries} />} />
            <Route path={routes['attraction-details']} element={<AttractionDetails />} />
            <Route path={routes['plan-details']} element={<PlanDetails />} />
            <Route path={routes['attraction-edit']} element={<AttractionEdit countries={countries} />} />

            <Route path={routes.login} element={<Login onSubmitLogin={onUserLogin} />} />
            <Route path={routes.register} element={<Register onSubmitRegister={onUserRegister} />} />
            <Route path={routes.logout} element={<Logout onLogout={onLogout}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
