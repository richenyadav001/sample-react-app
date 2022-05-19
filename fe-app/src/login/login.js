import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { doLogin } from "../redux/actions/login";

function Login(props) {
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.loginData);
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(12, "Too Long!")
      .required("Required"),
  });

  return (
    <div
      className={props.isLogin ? "tab-pane fade show active" : "tab-pane fade"}
      id="pills-login"
      role="tabpanel"
      aria-labelledby="tab-login"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          dispatch(doLogin(values));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-outline mb-4" data-testid="inputFIeld">
              <Field
                className="form-control"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" />
            </div>
            <div className="form-outline mb-4" data-testid="inputPassField">
              <Field
                className="form-control"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" />
            </div>
            <div className="form-outline mb-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {selectedData.error ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {selectedData.message}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
