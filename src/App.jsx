import { useEffect } from "react";
import ContactForm from "./components/ContactForm";
import SearchBox from "./components/SearchBox";
import ContactList from "./components/ContactList";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/operations";
import {Route,Routes} from 'react-router-dom'
import LoginForm from "./components/LoginForm";
import UserMenu from "./components/UserMenu";
import RegistrationForm from "./components/RegistrationForm";


function App() {
  const dispatch = useDispatch();
  //const contacts = useSelector(state => state.contact.items);
  const isLoading = useSelector(state => state.contacts.isLoading)

  //*dispatch ile fetchContacts çağrılır.
  useEffect(()=>{
    dispatch(fetchContacts());
  },[dispatch]);


  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm/>}></Route>
        <Route path="/usermenu" element={<UserMenu/>}></Route>
        <Route path="register" element={<RegistrationForm/>}></Route>
      </Routes>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox  />
      <ContactList />
      {isLoading === true && <p>Loading ...</p>}
    </div>
  );
}

export default App;
