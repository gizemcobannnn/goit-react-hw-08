import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Styles from "./ContactForm.module.css"
import { useDispatch,useSelector } from "react-redux";
import { addContact} from "../../redux/contacts/operations";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const nameFieldId = useId();
  const phoneFieldId = useId();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number is not valid")
      .min(10, "Phone number must be at least 10 digits"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === values.username.trim().toLowerCase() ||
        contact.phone === values.phone.trim()
    );

    if (isDuplicate) {
      alert("This contact already exists!");
      return; // Ekleme işlemini durdur
    }
    const newContact = {
      name: values.username.trim(),
      phone: values.phone.trim(),
    };
    dispatch(addContact(newContact));

    resetForm(); // Formu sıfırla
  };

  return (
    <div className={Styles["contact-form"]} >
      <Formik
        initialValues={{
          username: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className={Styles["user-form"]}>
              <label htmlFor={nameFieldId}>Name</label>
              <Field type="text" name="username" id={nameFieldId} />
              <ErrorMessage name="username" component="span" style={{ color: "red" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
              <label htmlFor={phoneFieldId}>Phone</label>
              <Field type="text" name="phone" id={phoneFieldId} />
              <ErrorMessage name="phone" component="span" style={{ color: "red" }} />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                padding: "10px 15px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Add Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default ContactForm;
