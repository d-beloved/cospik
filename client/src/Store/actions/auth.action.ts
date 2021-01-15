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
import { setNotify } from './notify.action';

export const registerAdmin = (
  { username, password }: { username: string; password: string; }, action?: () => void, errorAction?: () => void,
) => async (dispatch: any) => {
  dispatch(actionCreator(ADMIN_REGISTER_REQUEST));
  try {
    const { data: response } = await Axios.post("/auth/signup", {
      username,
      password
    });
    if (response.success) {
      Axios.defaults.headers.common['Authorization'] = response.token;
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      dispatch(
        actionCreator(ADMIN_REGISTER_SUCCESS, {
          ...response,
        })
      );
      dispatch(
        setNotify({
          title: 'Signup',
          body: response.message,
          type: 'success'
        })
      );

      action && action();
    }
  } catch (error) {
    errorAction && errorAction();
    dispatch(actionCreator(ADMIN_REGISTER_FAILURE));
    dispatch(
      setNotify({
        title: 'Error',
        body: error.response.message,
        type: 'error'
      }));
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
    if (response.success) {
      Axios.defaults.headers.common['Authorization'] = response.authToken;
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.authToken);
      dispatch(
        actionCreator(ADMIN_SIGN_IN_SUCCESS, {
          ...response,
        })
      );
      dispatch(
        setNotify({
          title: 'Login',
          body: response.message,
          type: 'success'
        })
      );

      action && action();
    }
  } catch (error) {
    errorAction && errorAction();
    dispatch(actionCreator(ADMIN_SIGN_IN_FAILURE));
    dispatch(
      setNotify({
        title: error.response.errors.param,
        body: error.response.errors.msg,
        type: 'error'
      }));
  }
};

export const logoutAdmin = (history: any) => async (dispatch: any) => {
  try {
    localStorage.clear();

    dispatch(actionCreator(LOGOUT_ADMIN));
    dispatch(
      setNotify({
        title: 'Session expired',
        body: 'Please login again',
        type: 'error'
      })
    );
  } catch (error) {}

  return history && history.push('/login');
};
