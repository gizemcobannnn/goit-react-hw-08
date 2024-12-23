import PropTypes from "prop-types";
import Styles from "./Contact.module.css"
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
const Contact = ({ contact }) => {
 
  const dispatch = useDispatch(); 
  const handleDelete = ()=>{
    dispatch(deleteContact(contact.id))
  }

  return (
    <div className={Styles.contact}>
      <div className={Styles["contact-content"]} >
        {/* Kullanıcı Bilgileri */}
        <div className={Styles["contact-note"]}>
          <div className={Styles["contact-name"]}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "10px" }}
              aria-label="User Icon"
            >
              <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm0 2c-3.31 0-10 1.66-10 5v2h20v-2c0-3.34-6.69-5-10-5z" fill="grey" />
            </svg>
            <p className={Styles.userp} id="username">{contact.name}</p>
          </div>

          <div className={Styles["contact-phone"]}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "10px" }}
              aria-label="Phone Icon"
            >
              <path
                d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.27 1.12.28 2.33.43 3.57.43.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C9.39 21 3 14.61 3 7c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.15 2.45.43 3.57.09.35 0 .74-.27 1.02l-2.2 2.2z"
                fill="grey"
              />
            </svg>
            <p  className={Styles.phonep} id="phone">{contact.number}</p>
          </div>
        </div>

        {/* Silme Butonu */}
        <button
          className={Styles["delete-button"]}
          onClick={handleDelete} >
             Delete
        </button>
      </div>
    </div>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,    
    name: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default Contact;
