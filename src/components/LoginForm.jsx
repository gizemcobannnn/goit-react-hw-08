import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Style from "./LoginForm.module.css";
import { login } from "../redux/auth/slice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token, isRefreshing } = useSelector((state) => state.auth);
  const navigate = useNavigate(); 

  console.log(`${isLoggedIn}, ${token}, ${isRefreshing}`);


  // Form Submit işlemi
  const handleSubmit = async({ email, password }, { resetForm }) => {
    if (!email || !password) {
      alert("Fill in the inputs");
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap(); // Hataları düzgün yönetmek için unwrap kullanılır
      navigate("/usermenu"); // Başarılı girişten sonra yönlendirme
    } catch (error) {
      console.error("Login failed:", error); // Giriş başarısız olursa hata konsola yazılır
      alert("Login failed: " + error.message); // Kullanıcıya hata mesajı gösterilir
    }
    resetForm(); 
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/usermenu"); // Giriş yapılmışsa yönlendirme
    }
  }, [isLoggedIn, navigate]); 

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
         className={Style.buttonlogreg}
        >
          {isRefreshing ? "Logging in..." : "Login"}
        </button>
      </Form>
    </Formik>
    <button className={Style.buttonlogreg}>Register</button>
    </>
  );

};

export default LoginForm;
