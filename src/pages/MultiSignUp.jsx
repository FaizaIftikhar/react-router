import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./MultiStepForm.css";

// Validation Schemas
const stepOneSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const stepTwoSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phones: Yup.array()
    .of(Yup.string().required("Phone number required"))
    .min(1, "At least one phone number required"),
});

const stepThreeSchema = Yup.object({
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test(
      "fileSize",
      "File too large. Max 2MB",
      (value) => value && value.size <= 2 * 1024 * 1024
    )
    .test(
      "fileFormat",
      "Unsupported Format. Only jpg/png",
      (value) => value && ["image/jpeg", "image/png"].includes(value.type)
    ),
});

const MultiStepFormWithFileUpload = () => {
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phones: [""],
    profilePicture: null,
  };

  const steps = [
    { label: "Step 1: Name & Email", validationSchema: stepOneSchema },
    { label: "Step 2: Password & Phones", validationSchema: stepTwoSchema },
    { label: "Step 3: Profile Picture", validationSchema: stepThreeSchema },
  ];

  const handleNext = async (values, actions) => {
    try {
      await steps[step].validationSchema.validate(values, { abortEarly: false });
      setStep(step + 1);
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          if (!errors[error.path]) errors[error.path] = error.message;
        });
        actions.setErrors(errors);
      }
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("profilePicture", file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Submitted", values);
    alert("Form Submitted! Check console for data.");
  };

  return (
    <div className="form-container">
      <h2>Multi-Step Registration</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <h3>{steps[step].label}</h3>

            {/* Step 1 */}
            {step === 0 && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <Field name="name" type="text" />
                  <ErrorMessage name="name" component="p" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" />
                  <ErrorMessage name="email" component="p" className="error" />
                </div>
              </>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" />
                  <ErrorMessage name="password" component="p" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="error"
                  />
                </div>

                <FieldArray name="phones">
                  {({ push, remove }) => (
                    <div className="form-group">
                      <label>Phone Numbers</label>
                      {values.phones.map((_, index) => (
                        <div key={index} className="phone-field">
                          <Field name={`phones[${index}]`} type="text" />
                          <button type="button" onClick={() => remove(index)}>
                            -
                          </button>
                          {index === values.phones.length - 1 && (
                            <button type="button" onClick={() => push("")}>
                              +
                            </button>
                          )}
                          <ErrorMessage
                            name={`phones[${index}]`}
                            component="p"
                            className="error"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <>
                <div className="form-group">
                  <label>Profile Picture (jpg/png, max 2MB)</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(event) => handleFileChange(event, setFieldValue)} 
                  />
                  {preview && (
                    <img src={preview} alt="Preview" className="preview-img" />
                  )}
                  <ErrorMessage
                    name="profilePicture"
                    component="p"
                    className="error"
                  />
                </div>
              </>
            )}

            <div className="button-group">
              {step > 0 && (
                <button type="button" onClick={handleBack}>
                  Back
                </button>
              )}
              {step < steps.length - 1 && (
                <button
                  type="button"
                  onClick={() =>
                    handleNext(values, { setErrors: () => {} })
                  }
                >
                  Next
                </button>
              )}
              {step === steps.length - 1 && <button type="submit">Submit</button>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepFormWithFileUpload;
