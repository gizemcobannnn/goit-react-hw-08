import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Styles from "./RegistrationForm.module.css";
import { register } from "../../../redux/auth/slice";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const navigate = useNavigate();

  const handleSubmit = async(values, { resetForm }) => {
    const { name, email, password } = values;
    console.log({ name, email, password });
    try{ 
      await dispatch(register({ name, email, password })).unwrap();
      toast.success("Registration is successful.")
      resetForm(); // Reset the form
      navigate('/login')
    }catch(error){
      if (error.code === 11000) {
        toast.error("User already exists. Please try a different email.");
      } else {
        toast.error("Registration failed, please try again.");
      }
      resetForm();
    }

  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .required("E-mail is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form action="" className={Styles.formContainer}>
        {/* Username Field */}
        <div className={Styles.formField}>
          <label htmlFor={nameFieldId} className={Styles.label}>Username</label>
          <Field id={nameFieldId} name="name" type="text" className={Styles.input} />
          <ErrorMessage name="name" component="span" style={{ color: "red" }} className={Styles.errorMessage} />
        </div>

        {/* Email Field */}
        <div className={Styles.formField}>
          <label htmlFor={emailFieldId} className={Styles.label}>E-mail</label>
          <Field id={emailFieldId} name="email" type="email" className={Styles.input} />
          <ErrorMessage name="email" component="span" style={{ color: "red" }} className={Styles.errorMessage} />
        </div>

        {/* Password Field */}
        <div className={Styles.formField}>
          <label htmlFor={passwordFieldId} className={Styles.label}>Password</label>
          <Field id={passwordFieldId} name="password" type="password" className={Styles.input} />
          <ErrorMessage name="password" component="span" style={{ color: "red" }} className={Styles.errorMessage} />
        </div>

        <button type="submit" className={Styles.submitRegButton}>Register</button>
        <button type="button" className={Styles.submitLogButton} onClick={()=> navigate('/login')}>Login</button>

      </Form>
    </Formik>
  );
}

export default RegistrationForm;
