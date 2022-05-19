import {
  CREATE_USER_ERROR,
  CREATE_USER_STEP_1,
  CREATE_USER_STEP_2,
} from "../actionType/actionTypes";

const initialstate = {
  name: "",
  address: "",
  email: "",
  documentType: "",
  documentName: "",
  documentImageType: "",
  documentSize: "",
  photoName: "",
  photoType: "",
  photoSize: "",
};

const registerReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CREATE_USER_STEP_1:
      const stepOneState = {
        ...state,
        ...action.payload,
      };
      return stepOneState;
    case CREATE_USER_STEP_2:
      const stepTwoState = {
        ...state,
        ...action.payload,
      };
      return stepTwoState;
    case CREATE_USER_ERROR:
      const createUserError = {
        ...state,
        ...action.payload,
      };
      return createUserError;
    default:
      return state;
  }
};

export default registerReducer;
