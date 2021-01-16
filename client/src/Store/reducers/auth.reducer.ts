import isEmpty from 'lodash/isEmpty';
import {
  ADMIN_SIGN_IN_REQUEST,
  ADMIN_SIGN_IN_FAILURE,
  ADMIN_SIGN_IN_SUCCESS,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAILURE,
  LOGOUT_ADMIN,
  SET_ADMIN
} from 'Store/constants';

interface AdminProps {
  user: Object;
  loading: boolean;
  error: object | null;
  isAuthenticated: boolean
}

const initialState: AdminProps = {
  user: {},
  loading: false,
  error: null,
  isAuthenticated: false,
};

export default function adminReducer(state = initialState, action: any): any {
  switch (action.type) {
    case SET_ADMIN:
      return { ...state, isAuthenticated: isEmpty(action.payload), user: action.payload };
    case ADMIN_REGISTER_REQUEST:
      return { ...state, loading: true };
    case ADMIN_REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADMIN_REGISTER_SUCCESS:
    case ADMIN_SIGN_IN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };
    case ADMIN_SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case ADMIN_SIGN_IN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT_ADMIN:
      return { ...state, loading: false, isAuthenticated: false, user: null, error: null };

    default:
      return state;
  }
}
