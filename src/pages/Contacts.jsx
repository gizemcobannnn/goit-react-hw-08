import ContactForm from "../components/Contacts/ContactForm";
import ContactList from "../components/Contacts/ContactList"
import Filter from "../components/SearchBox/SearchBox"
import { useSelector} from "react-redux";

const Contacts = () => {


  const {token} = useSelector((state) => state.auth);
  console.log(token)



  return (
    <div>
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  )
}

export default Contacts;