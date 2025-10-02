import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./MultiStepForm.css";

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

// Validation schemas for each step
const step1Validation = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const step2Validation = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const step3Validation = Yup.object({
  phoneNumbers: Yup.array()
    .of(Yup.string().required("Phone number is required"))
    .min(1, "At least one phone number is required"),
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumbers: [""],
  profilePicture: null,
};

export default function MultiStepFormWithAPI() {
  const [step, setStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: "", success: false });
  const [preview, setPreview] = useState(null);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const currentValidation = () => {
    if (step === 1) return step1Validation;
    if (step === 2) return step2Validation;
    if (step === 3) return step3Validation;
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    setFieldValue("profilePicture", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    setSubmitStatus({ loading: true, error: "", success: false });

    const formData = new FormData();
    for (const key in values) {
      if (key === "phoneNumbers") {
        values[key].forEach((num, idx) => formData.append(`phoneNumbers[${idx}]`, num));
      } else if (key === "profilePicture") {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitStatus({ loading: false, error: "", success: true });
    } catch (error) {
      setSubmitStatus({ loading: false, error: "Submission failed!", success: false });
    }
  };

  return (
    <div className="form-container">
      <h2>Multi-Step Registration</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={currentValidation()}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form>
            {/* Step 1: Name & Email */}
            {step === 1 && (
              <div>
                <div className="form-group">
                  <label>Full Name</label>
                  <Field name="fullName" />
                  <ErrorMessage name="fullName" component="p" className="error-text" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <Field name="email" type="email" />
                  <ErrorMessage name="email" component="p" className="error-text" />
                </div>
              </div>
            )}

            {/* Step 2: Passwords */}
            {step === 2 && (
              <div>
                <div className="form-group">
                  <label>Password</label>
                  <Field name="password" type="password" />
                  <ErrorMessage name="password" component="p" className="error-text" />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage name="confirmPassword" component="p" className="error-text" />
                </div>
              </div>
            )}

            {/* Step 3: Dynamic Fields & File Upload */}
            {step === 3 && (
              <div>
                <FieldArray name="phoneNumbers">
                  {({ push, remove }) => (
                    <div>
                      <label>Phone Numbers</label>
                      {values.phoneNumbers.map((num, idx) => (
                        <div key={idx} className="dynamic-field">
                          <Field name={`phoneNumbers[${idx}]`} placeholder="Enter phone number" />
                          <button type="button" onClick={() => remove(idx)}>Remove</button>
                          <ErrorMessage name={`phoneNumbers[${idx}]`} component="p" className="error-text" />
                        </div>
                      ))}
                      <button type="button" onClick={() => push("")}>Add Phone</button>
                    </div>
                  )}
                </FieldArray>

                <div className="form-group">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                  {preview && <img src={preview} alt="Preview" className="preview-img" />}
                  <ErrorMessage name="profilePicture" component="p" className="error-text" />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="buttons">
              {step > 1 && <button type="button" onClick={handleBack}>Back</button>}
              {step < 3 && <button type="button" onClick={handleNext}>Next</button>}
              {step === 3 && <button type="submit">Submit</button>}
            </div>

            {/* Submission Status */}
            {submitStatus.loading && <p>Submitting...</p>}
            {submitStatus.error && <p className="error-text">{submitStatus.error}</p>}
            {submitStatus.success && <p className="success-text">Form submitted successfully! ✅</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
