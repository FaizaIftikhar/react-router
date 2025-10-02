// src/pages/MultiStepForm.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./MultiStepForm.css";

// Step Schemas
const stepOneSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const stepTwoSchema = Yup.object({
  password: Yup.string().min(6, "At least 6 chars").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

// Full schema (for final validation)
const fullSchema = stepOneSchema.concat(stepTwoSchema);

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleNext = async (validateForm, setTouched, values, errors, setStep) => {
    const currentErrors = await validateForm(values);
    if (Object.keys(currentErrors).length === 0) {
      setStep((prev) => prev + 1);
    } else {
      setTouched(
        Object.fromEntries(Object.keys(currentErrors).map((key) => [key, true]))
      );
    }
  };

  return (
    <div className="multistep-container">
      <h2>Multi-Step Signup</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={step === 1 ? stepOneSchema : step === 2 ? stepTwoSchema : fullSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("✅ Form Submitted:", values);
          alert("Form submitted successfully!");
          resetForm();
          setStep(1);
        }}
      >
        {({ values, errors, touched, validateForm, setTouched }) => (
          <Form>
            {/* Step 1 */}
            {step === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <Field name="fullName" type="text" />
                  <ErrorMessage name="fullName" component="p" className="error-text" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" />
                  <ErrorMessage name="email" component="p" className="error-text" />
                </div>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" />
                  <ErrorMessage name="password" component="p" className="error-text" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage name="confirmPassword" component="p" className="error-text" />
                </div>
              </>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="summary">
                <h3>Review Your Details</h3>
                <p><strong>Full Name:</strong> {values.fullName}</p>
                <p><strong>Email:</strong> {values.email}</p>
                <p><strong>Password:</strong> ******</p>
              </div>
            )}

            {/* Buttons */}
            <div className="buttons">
              {step > 1 && (
                <button type="button" onClick={() => setStep((s) => s - 1)}>
                  Back
                </button>
              )}

              {step < 3 && (
                <button
                  type="button"
                  onClick={() =>
                    handleNext(validateForm, setTouched, values, errors, setStep)
                  }
                >
                  Next
                </button>
              )}

              {step === 3 && <button type="submit">Submit</button>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
