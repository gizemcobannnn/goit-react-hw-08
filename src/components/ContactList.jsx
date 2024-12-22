import Contact from "./Contact";
import Styles from "./ContactList.module.css"
import { useSelector } from "react-redux";

import { selectNameFilter } from "../redux/filters/selectors";

const ContactList = () => {
  
  const contacts = useSelector((state) => state.contacts.items); // Select contacts
  const nameFilter = useSelector(selectNameFilter); // Select name filter

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  
  return (
    <div className={Styles["contact-list"]}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <Contact key={contact.id}
            contact={contact}
           />
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};


export default ContactList;
