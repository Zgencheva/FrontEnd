import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header.js';
import { Home } from './components/home/Home.js';
import { MyPlans } from './components/plans-section/my-plans/MyPlans.js';
import { PlanDetails } from './components/plans-section/plan-details/PlanDetails.js';
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
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { ErrorContext } from './contexts/ErrorContext.js';
import { AttractionCreate } from './components/admin-section/attractions/attraction-create/AttractionCreate.js';

function App() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useLocalStorage('user', {});
  const [serverErrors, setError] = useState({});

  const onUserRegister = async (values) => {
    try {
      var user = await auth.register(values);
      setUser(user);
      navigate(routes.home)
    } catch (error) {
      //TODO: Error page:
      console.log(error.message)
    }
  }
  const onUserLogin = async (values) => {
    try {
      var user = await auth.login(values);
      setUser(user);
      navigate(routes.home)
    } catch (error) {
      setError(state=> ({
        ...state,
        login: {
          isInvalid: true,
          message: 'Invalid details',
        }
      }));
    }
  }
  const onLogout = async () => {
    try {
      await auth.logout();
      setUser({});
      navigate(routes.home)
    } catch (error) {
      //TODO: Error page:
      console.log(error.message);
    }

  }
  useEffect(() => {
    countryService.getAll()
      .then(c => setCountries(Object.values(c)));
  }, []);

  return (
    
      <AuthContext.Provider value={{ user }}>
        <div className="App">
          <Header />
          <ErrorContext.Provider value={{ serverErrors }}>
          <main>
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.myPlans} element={<MyPlans />} />
              <Route path={routes.createPlan} element={<CreatePlan countries={countries} />} />
              <Route path={routes['attraction-details']} element={<AttractionDetails />} />
              <Route path={routes['attraction-create']} element={<AttractionCreate countries={countries}/>}/>
              <Route path={routes['plan-details']} element={<PlanDetails />} />
              <Route path={routes['attraction-edit']} element={<AttractionEdit countries={countries} />} />

              <Route path={routes.login} element={<Login onSubmitLogin={onUserLogin} />} />
              <Route path={routes.register} element={<Register onSubmitRegister={onUserRegister} />} />
              <Route path={routes.logout} element={<Logout onLogout={()=>onLogout()} />} />
            </Routes>
          </main>
          </ErrorContext.Provider>
          <Footer />
        </div>
      </AuthContext.Provider>
   
  );
}

export default App;
