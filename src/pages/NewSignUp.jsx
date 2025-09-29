import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignupForm() {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Form Data Submitted ✅", values);
          resetForm();
        }}
      >
        {({ touched, errors }) => (
          <Form>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <Field
                name="fullName"
                type="text"
                className={touched.fullName && errors.fullName ? "input-error" : ""}
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="error-text"
              />
            </div>

            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className={touched.email && errors.email ? "input-error" : ""}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="error-text"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={touched.password && errors.password ? "input-error" : ""}
              />
              <ErrorMessage
                name="password"
                component="p"
                className="error-text"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={
                  touched.confirmPassword && errors.confirmPassword ? "input-error" : ""
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="error-text"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="signup-btn">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
