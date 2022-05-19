import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerUpload } from "../redux/actions/register";
import Password from "./password";
import Thumb from "./thumb";

function DocUpload() {
  const [isStepTwoComplete, setStepTwoComplete] = useState(false);
  const [imageData, setImageData] = useState({ document: {}, photo: {} });
  const FILE_SIZE = 90000; // bytes
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{ photo: null, document: null }}
        onSubmit={(values) => {
          setImageData({ document: values.document, photo: values.photo });
          dispatch(
            registerUpload({
              documentName: values.document.name,
              documentImageType: values.document.type,
              documentSize: `${values.document.size} bytes`,
              photoName: values.photo.name,
              photoType: values.photo.type,
              photoSize: `${values.photo.size} bytes`,
            })
          );
          setStepTwoComplete(true);
        }}
        validationSchema={Yup.object().shape({
          photo: Yup.mixed()
            .required("A file is required")
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
          document: Yup.mixed()
            .required("A file is required")
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
        })}
        render={({ values, handleSubmit, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4" data-testid="inputNameField">
                <label className="float-left" htmlFor="photo">
                  Photo Upload
                  <span className="alert-danger">
                    <ErrorMessage name="photo" />
                  </span>
                </label>
                <input
                  data-testid="inputPhotoField"
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                  className="form-control"
                />

                <Thumb file={values.photo} />
              </div>
              <div className="form-group mb-4">
                <label className="float-left" htmlFor="document">
                  Document Upload
                  <span className="alert-danger">
                    <ErrorMessage name="document" />
                  </span>
                </label>
                <input
                  data-testid="inputDocumentField"
                  id="document"
                  name="document"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("document", event.currentTarget.files[0]);
                  }}
                  className="form-control"
                />
                <Thumb file={values.document} />
              </div>
              {isStepTwoComplete ? (
                <></>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Next
                </button>
              )}
            </form>
          );
        }}
      />
      {isStepTwoComplete ? <Password {...imageData} /> : <></>}
    </>
  );
}

export default DocUpload;
