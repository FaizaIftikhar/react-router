// MultiStepWithPhones.jsx
import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import './MultiStepForm.css'

// Step-specific validation
const stepSchemas = [
  Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  }),
  Yup.object({
    password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  }),
  Yup.object({
    phoneNumbers: Yup.array()
      .of(Yup.string().required("Phone number required"))
      .min(1, "At least one phone number is required"),
  }),
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumbers: [""],
};

const MultiStepWithPhones = () => {
  const [step, setStep] = useState(0);
  const isLastStep = step === stepSchemas.length;

  const handleSubmit = (values, { setSubmitting }) => {
    if (!isLastStep) {
      setStep((s) => s + 1);
      setSubmitting(false);
    } else {
      alert("✅ Submitted: " + JSON.stringify(values, null, 2));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={stepSchemas[step]}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form style={{ maxWidth: "400px", margin: "auto" }}>
          <h2>Step {step + 1}</h2>

          {/* Step 1: Name & Email */}
          {step === 0 && (
            <>
              <label>Name</label>
              <Field name="name" placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" style={{ color: "red" }} />

              <label>Email</label>
              <Field name="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </>
          )}

          {/* Step 2: Passwords */}
          {step === 1 && (
            <>
              <label>Password</label>
              <Field type="password" name="password" placeholder="Enter password" />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />

              <label>Confirm Password</label>
              <Field type="password" name="confirmPassword" placeholder="Confirm password" />
              <ErrorMessage name="confirmPassword" component="div" style={{ color: "red" }} />
            </>
          )}

          {/* Step 3: Phone Numbers (Dynamic Fields) */}
          {step === 2 && (
            <>
              <h3>Phone Numbers</h3>
              <FieldArray name="phoneNumbers">
                {({ push, remove }) => (
                  <div>
                    {values.phoneNumbers.map((_, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <Field
                          name={`phoneNumbers[${index}]`}
                          placeholder="Enter phone number"
                        />
                        <ErrorMessage
                          name={`phoneNumbers[${index}]`}
                          component="div"
                          style={{ color: "red" }}
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          disabled={values.phoneNumbers.length === 1}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")}>
                      ➕ Add Phone
                    </button>
                  </div>
                )}
              </FieldArray>
            </>
          )}

          {/* Step 4: Summary */}
          {step === 3 && (
            <>
              <h3>Summary</h3>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </>
          )}

          {/* Navigation Buttons */}
          <div style={{ marginTop: "20px" }}>
            {step > 0 && (
              <button type="button" onClick={() => setStep((s) => s - 1)}>
                Back
              </button>
            )}
            <button type="submit">{isLastStep ? "Submit" : "Next"}</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepWithPhones;
