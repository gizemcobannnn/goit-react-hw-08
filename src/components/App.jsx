import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import LoginForm from "./AuthNav/LoginForm/LoginForm";
import RegistrationForm from "./AuthNav/RegistrationForm/RegistrationForm";
import RestrictedRoute from "./Router/RestrictedRoute";
import PrivateRoute from "./Router/PrivateRoute";
import UserMenu from "./Navigation/UserMenu";
import Contacts from "../pages/Contacts";
import Layout from "./Layout/Layout";

import { fetchContacts } from "../redux/contacts/operations";


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  // Fetch contacts on mount
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  if (isRefreshing) {
    return <div>Loading...</div>; // Bekleme sırasında gösterilecek içerik
  }
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={<RestrictedRoute redirectTo="/contacts" component={LoginForm} />}
          />
          <Route
            path="/register"
            element={<RestrictedRoute redirectTo="/contacts" component={RegistrationForm} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/login" component={Contacts} />}
          />
          <Route
            path="/usermenu"
            element={<PrivateRoute redirectTo="/login" component={UserMenu} />}
          />
          <Route
            path="*"
            element={<PrivateRoute redirectTo="/login" component={LoginForm} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;