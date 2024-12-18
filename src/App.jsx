import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestrictedRoute from "./pages/PrivateRoute"
import PrivateRoute from "./pages/RestrictedRoute"

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
    {isLoggedIn && !isLoading && <PrivateRoute/>}
    {!isLoggedIn && !isLoading && <RestrictedRoute/>}
    </>
  );
}

export default App;

