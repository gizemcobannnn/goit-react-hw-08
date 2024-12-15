import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegistrationForm = ()=>{

      const validationSchema = Yup.object().shape({
        username: Yup.string()
          .required("Username is required")
          .min(3, "Username must be at least 3 characters"),
        phone: Yup.string()
          .required("Phone number is required")
          .matches(/^[0-9]+$/, "Phone number is not valid")
          .min(10, "Phone number must be at least 10 digits"),
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
                <div>
                    <label htmlFor={nameFieldId}>Name</label>
                    <Field type="text" />
                    <ErrorMessage name="username" component="span" style={{ color: "red" }} />
                
                </div>
                <div>
                    <label htmlFor={passwordFieldId}>Name</label>
                    <Field type="password" />
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
            >
        Login            </button>
            </Form>
        </Formik>
    )
}

export default RegistrationForm;