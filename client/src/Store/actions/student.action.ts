import Axios from 'axios';
import actionCreator from 'Utils/actionCreator';
// import { setNotify } from './notify.action';
import { GET_ALLSTUDENT_SUCCESS, GET_ALLSTUDENT_REQUEST, GET_ALLSTUDENT_FAILURE } from 'Store/constants';

export const getStudents = (action?: () => void,
  errorAction?: () => void) => async (dispatch: any) => {
    dispatch(actionCreator(GET_ALLSTUDENT_REQUEST));

    try {
      const { data: response } = await Axios.get('/student');
      const { message, ...rest } = response;
      dispatch(actionCreator(GET_ALLSTUDENT_SUCCESS, rest));
    } catch (error) {
      errorAction && errorAction();
      dispatch(actionCreator(GET_ALLSTUDENT_FAILURE, error.response.data));
    }
  };
