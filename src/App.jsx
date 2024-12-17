import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import ContactForm from "./components/ContactForm";
import SearchBox from "./components/SearchBox";
import ContactList from "./components/ContactList";
import LoginForm from "./components/LoginForm";
import UserMenu from "./components/UserMenu";
import RegistrationForm from "./components/RegistrationForm";
import RestrictedRoute from "./pages/RestrictedRoute"
import PrivateRoute from "./pages/PrivateRoute"

import "./App.css";
import { fetchContacts } from "./redux/contacts/operations";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Fetch contacts on mount
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
    <div className="App">
      {/* Conditional Routing */}
      <Routes>
        <Route
          path="/"
          element={<RestrictedRoute isLoggedIn={isLoggedIn}>
          <LoginForm />
        </RestrictedRoute>}
        />
        <Route
          path="/register"
          element={<RestrictedRoute isLoggedIn={isLoggedIn}>
          <RegistrationForm />
        </RestrictedRoute>}
        />
        <Route
          path="/contacts"
          element={ <PrivateRoute isLoggedIn={isLoggedIn}>
              <>
                <UserMenu />
                <h1>Phonebook</h1>
                <ContactForm />
                <SearchBox />
                <ContactList />
                {isLoading && <p>Loading...</p>}
              </>
              </PrivateRoute>
          }
            
        />
       <Route path="*" element={<Navigate to={isLoggedIn ? "/contacts" : "/"} />} />

      </Routes>
    </div>
    </>
  );
}

export default App;
