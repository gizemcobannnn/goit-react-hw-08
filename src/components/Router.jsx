import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import Layout from "./Layout/Layout";
import PrivateRoute from "./Router/PrivateRoute";
import RestrictedRoute from "./Router/RestrictedRoute";

const LoginPage = lazy(() => import("../pages/Login"));
const RegistrationPage = lazy(() => import("../pages/Registration"));
const ContactsPage = lazy(() => import("../pages/Contacts"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));


export default function Router() {
  return (
    <Suspense fallback={<div>Loading the page...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}