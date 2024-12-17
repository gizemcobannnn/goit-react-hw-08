import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch,useSelector} from "react-redux";
import * as Yup from "yup";
import { addContact } from "../redux/contacts/operations";
import { useId } from "react";
const RegistrationForm = ()=>{

        const dispatch = useDispatch();
        const contacts = useSelector(state => state.contacts.items);
        const nameFieldId = useId();
        const emailFieldId = useId();
        const passwordFieldId = useId();
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

      const validationSchema = Yup.object().shape({
        username: Yup.string()
          .required("Username is required")
          .min(3, "Username must be at least 3 characters"),
        email: Yup.string()
          .required("Phone number is required")
          .matches(/^[0-9]+$/, "Phone number is not valid")
          .min(10, "Phone number must be at least 10 digits"),
        password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

    return(
        <Formik
        initialValues={{
            username: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
            <Form action="">
                   {/* Username Field */}
                    <div>
                      <label htmlFor={nameFieldId}>Username</label>
                      <Field id={nameFieldId} name="username" type="text" />
                      <ErrorMessage name="username" component="span" style={{ color: "red" }} />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor={emailFieldId}>Phone</label>
                      <Field id={emailFieldId} name="email" type="text" />
                      <ErrorMessage name="email" component="span" style={{ color: "red" }} />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor={passwordFieldId}>Password</label>
                      <Field id={passwordFieldId} name="password" type="password" />
                      <ErrorMessage name="password" component="span" style={{ color: "red" }} />
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
            >Register
            </button>
            </Form>
        </Formik>
    )
}

export default RegistrationForm;