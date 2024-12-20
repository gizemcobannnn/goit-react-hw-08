import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Style from "./LoginForm.module.css";
import { login } from "../redux/auth/slice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, isRefreshing } = useSelector((state) => state.auth);

  console.log(`${isLoggedIn}, ${token}, ${isRefreshing}`);


  // Form Submit işlemi
  const handleSubmit = ({ email, password }, { resetForm }) => {
    if (!email || !password) {
      alert("Fill in the inputs");
      return;
    }

    dispatch(login({ email, password }))
      .unwrap() // Redux Toolkit ile hata ayıklama
      .then(() => {
        navigate("/usermenu"); // Başarılı giriş sonrası yönlendirme
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });

    resetForm();
  };

  
  if (isLoggedIn) {
    navigate("/usermenu");
  }
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
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className={Style.loginFormInput}>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="text" />
          <ErrorMessage name="email" component="span" style={{ color: "red" }} />
        </div>
        <div className={Style.loginFormInput}>
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
          <ErrorMessage
            name="password"
            component="span"
            style={{ color: "red" }}
          />
        </div>
        <button
          disabled={isRefreshing}
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
          {isRefreshing ? "Logging in..." : "Login"}
        </button>
      </Form>
    </Formik>
  );

};

export default LoginForm;
