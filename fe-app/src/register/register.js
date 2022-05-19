import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Api from "../api/axios";
import { register } from "../redux/actions/register";
import DocUpload from "./docUpload";
const AxiosApi = new Api();

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  documentType: Yup.string().required("Required"),
});

function Register(props) {
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const [isPartOneComplete, setIsPartOneComplete] = useState(false);

  const dispatch = useDispatch();

  return (
    <div
      className={props.isLogin ? "tab-pane fade" : "tab-pane fade show active"}
      id="pills-register"
      role="tabpanel"
      aria-labelledby="tab-register"
    >
      <Formik
        initialValues={{
          name: "",
          address: "",
          email: "",
          documentType: "adhaar",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          setIsError({ status: false, msg: "" });
          AxiosApi.request("/user-exists", "POST", JSON.stringify(values)).then(
            (data) => {
              console.log(data);
              if (data) {
                setIsError({ status: true, msg: "User already existed" });
              } else {
                // add data to global redux store and proceed to next step
                dispatch(register(values));
                setIsPartOneComplete(true);
              }
            }
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-outline mb-4" data-testid="inputNameField">
              <Field className="form-control" name="name" placeholder="Name" />
              <ErrorMessage name="name" />
            </div>
            <div className="form-outline mb-4" data-testid="inputAddressField">
              <Field
                className="form-control"
                name="address"
                placeholder="Address"
              />
              <ErrorMessage name="address" />
            </div>
            <div className="form-outline mb-4" data-testid="inputEmailField">
              <Field
                className="form-control"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" />
            </div>
            <div className="form-outline mb-4" data-testid="inputDocField">
              <Field name="documentType" as="select" className="form-control">
                <option value="adhaar">Adhaar</option>
                <option value="pan">Pan Card</option>
                <option value="passport">Passport</option>
              </Field>
              <ErrorMessage name="documentType" />
            </div>
            {isPartOneComplete ? (
              <></>
            ) : (
              <div className="form-outline mb-4">
                <button type="submit" className="btn btn-primary">
                  Next
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {isError.status ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {isError.msg}
        </div>
      ) : (
        <></>
      )}
      {isPartOneComplete ? <DocUpload /> : <></>}
    </div>
  );
}

export default Register;
