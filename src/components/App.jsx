import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { fetchContacts } from "../redux/contacts/operations";
import Approute from "./Router/Approute";


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
    <>
        <Approute/>
        <ToastContainer />
    </>
  );
}

export default App;