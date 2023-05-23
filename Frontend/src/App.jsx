import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import NavbarComponent from './navbarComponents/navbarComponent';
import HomeComponent from './homeComponents/homeComponent';
import ContactComponent from './contactComponents/contactComponent';
import AboutComponent from './aboutComponents/aboutComponent';
import LoginComponent from './loginComponents/loginComponent';
import SignupComponent from './signupComponents/signupComponent';
import CarComponent from './carComponents/carComponent';
import CarDataComponent from './carDataComponents/carDataComponent';
import RentComponent from './rentComponents/rentComponent';
import AdminUserComponent from './adminUsersComponents/adminUserComponent';
import AdminCarComponent from './adminCarsComponent/adminCarComponent';
import AdminRentComponent from './adminRentsComponents/adminRentComponent';
import AdminAddCarComponent from './AdminAddCarsComponent/adminAddCarComponent';
import { useDispatch } from 'react-redux';
import { checkUserLoggedIn } from './redux/userData';
import './scss/navbar.scss';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserLoggedIn());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
      <NavbarComponent/>
          <Routes>
            <Route path="/" element={<HomeComponent/>} />
            <Route path='/contact' element={<ContactComponent/>} />
            <Route path='/about' element={<AboutComponent/>} />
            <Route path='/login' element={<LoginComponent/>} />
            <Route path='/registration' element={<SignupComponent/>} />
            <Route path='/cars' element={<CarComponent/>} />
            <Route path='/cars/:id' element={<CarDataComponent/>} />
            <Route path="/rent-car/:id" element={<RentComponent/>} />
            <Route path='/admin-dashboard/users' element={<AdminUserComponent/>} />
            <Route path='/admin-dashboard/cars' element={<AdminCarComponent/>} />
            <Route path='/admin-dashboard/rents' element={<AdminRentComponent/>} />
            <Route path='/admin-dashboard/add-car' element={<AdminAddCarComponent/>} />   
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
