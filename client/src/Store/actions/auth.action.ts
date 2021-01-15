import actionCreator from 'Utils/actionCreator';
import Axios from 'axios';
import {
  ADMIN_SIGN_IN_REQUEST,
  ADMIN_SIGN_IN_FAILURE,
  ADMIN_SIGN_IN_SUCCESS,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAILURE,
  LOGOUT_ADMIN
} from 'Store/constants';

export const registerAdmin = (
  { username, password }: { username: string; password: string; }, action?: () => void, errorAction?: () => void,
) => async (dispatch: any) => {
  dispatch(actionCreator(ADMIN_REGISTER_REQUEST));
  try {
    const { data: response } = await Axios.post("/auth/signup", {
      username,
      password
    });
    if (response.status === '201') {
      Axios.defaults.headers.common['Authorization'] = response.token;
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      dispatch(
        actionCreator(ADMIN_REGISTER_SUCCESS, {
          ...response,
        })
      );

      action && action();
    }
  } catch (error) {
    errorAction && errorAction();
    dispatch(actionCreator(ADMIN_REGISTER_FAILURE));
  }
};

export const adminLogin = (
  { username, password }: { username: string; password: string; }, action?: () => void, errorAction?: () => void,
) => async (dispatch: any) => {
  dispatch(actionCreator(ADMIN_SIGN_IN_REQUEST));
  try {
    const { data: response } = await Axios.post("/auth/login", {
      username,
      password
    });
    if (response.status === '201') {
      Axios.defaults.headers.common['Authorization'] = response.authToken;
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.authToken);
      dispatch(
        actionCreator(ADMIN_SIGN_IN_SUCCESS, {
          ...response,
        })
      );

      action && action();
    }
  } catch (error) {
    errorAction && errorAction();
    dispatch(actionCreator(ADMIN_SIGN_IN_FAILURE));
  }
};

export const logoutAdmin = (history: any) => async (dispatch: any) => {
  try {
    localStorage.clear();

    dispatch(actionCreator(LOGOUT_ADMIN));
  } catch (error) {}

  return history && history.push('/login');
};
