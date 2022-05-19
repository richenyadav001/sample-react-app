import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createUser } from "../redux/actions/register";

function Password(props) {
  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Too Short!")
      .max(12, "Too Long!")
      .required("Required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const formData = new FormData(); // Currently empty
  const selectedData = useSelector((state) => state.registerData);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={PasswordSchema}
      onSubmit={(values, { resetForm }) => {
        formData.append("name", selectedData.name);
        formData.append("address", selectedData.address);
        formData.append("email", selectedData.email);
        formData.append("documentType", selectedData.documentType);
        formData.append("password", values.password);
        formData.append("document", props.document, props.document.name);
        formData.append("photo", props.photo, props.photo.name);
        dispatch(createUser(formData));
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-outline mb-4" data-testid="inputPasswordField">
            <Field
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" />
          </div>
          <div className="form-outline mb-4" data-testid="inputCPasswordField">
            <Field
              className="form-control"
              name="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation"
            />
            <ErrorMessage name="passwordConfirmation" />
          </div>
          <div className="form-outline mb-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Password;
