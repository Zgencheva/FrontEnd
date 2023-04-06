import { useEffect, useState } from 'react';
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
import { AuthProvider } from './contexts/AuthContext.js';
import { Logout } from './components/authentication/logout/Logout.js';
import { AttractionCreate } from './components/admin-section/attractions/attraction-create/AttractionCreate.js';
import { CityCreate } from './components/admin-section/cities/CityCreate.js';
import { CountryCreate } from './components/admin-section/countries/CountryCreate.js';
import { PrivateGuard } from './constants/PrivateGuard.js';
import { Unauthorized } from './components/errors/Unauthorized.js';
import { AdminGuard } from './constants/AdminGuard.js';
import { RestaurantCreate } from './components/admin-section/restaurants/restaurant-create/RestaurantCreate.js';
import { RestaurantDetails } from './components/restaurants-section/restaurant-details/RestaurantDetails.js';
import { RestaurantEdit } from './components/admin-section/restaurants/restaurant-edit/RestaurantEdit.js';
import { PublicOnlyGuard } from './constants/PublicOnlyGuard.js';
import { CountriesProvider } from './contexts/CountriesContext.js';

function App() {

  return (

    <AuthProvider >
      <CountriesProvider>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.homeWithQuery} element={<Home />} />
            <Route path={routes['attraction-details']} element={<AttractionDetails />} />
            <Route path={routes['restaurant-details']} element={<RestaurantDetails />} />
            <Route element={<PrivateGuard />}>
              <Route path={routes['plan-details']} element={<PlanDetails />} />
              <Route path={routes.createPlan} element={<CreatePlan />} />
              <Route path={routes.myPlans} element={<MyPlans />} />
              <Route path={routes.logout} element={<Logout />} />
            </Route>
            <Route element={<AdminGuard />}>
              <Route path={routes['attraction-create']} element={<AttractionCreate />} />
              <Route path={routes['restaurant-create']} element={<RestaurantCreate />} />
              <Route path={routes['attraction-edit']} element={<AttractionEdit/>} />
              <Route path={routes['restaurant-edit']} element={<RestaurantEdit/>} />
              <Route path={routes['country-create']} element={<CountryCreate />} />
              <Route path={routes['city-create']} element={<CityCreate/>} />
            </Route>
            <Route element={<PublicOnlyGuard />}>
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.register} element={<Register />} />
            </Route>
            <Route path={routes.unauthorized} element={<Unauthorized />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </CountriesProvider>
    </AuthProvider>

  );
}

export default App;
