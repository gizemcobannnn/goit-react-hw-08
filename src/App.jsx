import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm"
import RestrictedRoute from "./pages/PrivateRoute"
import PrivateRoute from "./pages/RestrictedRoute"
import UserMenu from "./components/UserMenu"
import "./App.css";
import { fetchContacts } from "./redux/contacts/operations";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Fetch contacts on mount
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login" 
          element={<RestrictedRoute><LoginForm/></RestrictedRoute>}
        />
        <Route
          path="/register" 
          element={<RestrictedRoute><RegistrationForm/></RestrictedRoute>}
        />
        <Route 
          path="/usermenu"
          element={<PrivateRoute><UserMenu/></PrivateRoute>}
        />
        <Route
          path="/*"
          element={<PrivateRoute><LoginForm/></PrivateRoute>}
          />
      </Routes>
    </Router>
  );
}

export default App;

