import { GOOGLE_SIGNIN_START, GOOGLE_SIGNIN_SUCCESS, GOOGLE_SIGNIN_FAILURE, GOOGLE_SIGN_OUT } from "./googleAuthActionTypes";

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GOOGLE_SIGNIN_START:
      return { ...state, loading: true, error: null };

    case GOOGLE_SIGNIN_SUCCESS:
      return { ...state, currentUser: action.payload, loading: false };

    case GOOGLE_SIGNIN_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case GOOGLE_SIGN_OUT:
      return { ...state, currentUser: null };

    default:
      return state;
  }
};

export default authReducer;


