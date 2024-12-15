import { useEffect } from "react";
import ContactForm from "./components/ContactForm";
import SearchBox from "./components/SearchBox";
import ContactList from "./components/ContactList";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/operations";

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
      
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox  />
      <ContactList />
      {isLoading === true && <p>Loading ...</p>}
    </div>
  );
}

export default App;
