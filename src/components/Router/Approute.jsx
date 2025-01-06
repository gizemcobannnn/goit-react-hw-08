import {  Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import RestrictedRoute from './RestrictedRoute'
import PrivateRoute from './PrivateRoute'
import UserMenu from '../Navigation/UserMenu';


const Approute = () => {

    const RegistrationPage = lazy(
        ()=>import('../../pages/Registration')
    );

    const LoginPage = lazy(
        ()=> import('../../pages/Login')
    )

    const ContactsPage = lazy(
        ()=> import('../../pages/Contacts')
    )

    const NotFoundPage= lazy(
        ()=>import('../../pages/NotFoundPage')
    )
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route
          path="/"
          element={<RestrictedRoute> <LoginPage/> </RestrictedRoute>}
        />
         <Route
          path="/home"
          element={<PrivateRoute> <UserMenu/> </PrivateRoute>}
        />
        <Route
          path="/login"
          element={<RestrictedRoute> <LoginPage/> </RestrictedRoute>}
        />
        <Route
          path="/register"
          element={<RestrictedRoute> <RegistrationPage /> </RestrictedRoute>}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute> <ContactsPage /> </PrivateRoute>}
        />
        <Route
          path="/usermenu"
          element={<PrivateRoute> <UserMenu /> </PrivateRoute>}
        />
        <Route
          path="*"
          element={<RestrictedRoute> <NotFoundPage/> </RestrictedRoute>}
        />
      </Routes>
  </Suspense>
  )
}

export default Approute