import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";  // Correct import
import Styles from "./LoginForm.module.css";
import { login } from "../../../redux/auth/slice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const LoginForm = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const navigate = useNavigate();

  // Form Submit işlemi
  const handleSubmit = async(values, { resetForm }) => {
    const {email, password} = values;
    if (!email || !password) {
      alert("Fill in the inputs");
      toast.error("Fill in the inputs")
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap(); // Hataları düzgün yönetmek için unwrap kullanılır
      toast.success("Login successful!");

    } catch (error) {
      console.error("Login failed:", error); // Log detailed error
     toast.error('Login failed! Please check your credentials and try again.'); // User-friendly error message

    }
    resetForm(); 
  };


  
  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });


  return (
    <>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={Styles.loginFormContainer}>
        <div className={Styles.loginFormInput}>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="text"  className={Styles.input} />
          <ErrorMessage name="email" component="span" className={Styles.errorMessage} />
        </div>
        <div className={Styles.loginFormInput}>
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" className={Styles.input}/>
          <ErrorMessage
            name="password"
            component="span"
            className={Styles.errorMessage}
          />
        </div>
        <button
          disabled={isRefreshing}
          type="submit"
         className={Styles.buttonlog}
        >
          {isRefreshing ? "Logging in..." : "Login"}
        </button>

        <button
          disabled={isRefreshing}
          type="button"
         className={Styles.buttonreg}
         onClick={()=>  navigate('/register')}
        >
          {isRefreshing ? "Register in..." : "Register"}
        </button>
      </Form>
    </Formik>
   
    </>
  );

};

export default LoginForm;
