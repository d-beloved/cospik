import {
  GET_ALLSTUDENT_SUCCESS,
  GET_ALLSTUDENT_REQUEST,
  GET_ALLSTUDENT_FAILURE,
  ADD_STUDENT_FAILURE,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE,
  EDIT_STUDENT_REQUEST,
  EDIT_STUDENT_SUCCESS,
  GET_STUDENT_REQUEST,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAILURE,
} from 'Store/constants';

interface StudentProps {
  students: Object;
  loading: boolean;
  error: Object | null;
}

const initialState: StudentProps = {
  students: {},
  loading: false,
  error: null,
}

export const studentReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case GET_ALLSTUDENT_REQUEST:
    case ADD_STUDENT_REQUEST:
    case EDIT_STUDENT_REQUEST:
      return { ...state, loading: true };
    case GET_ALLSTUDENT_FAILURE:
    case ADD_STUDENT_FAILURE:
    case EDIT_STUDENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ALLSTUDENT_SUCCESS:
    case ADD_STUDENT_SUCCESS:
    case EDIT_STUDENT_SUCCESS:
      return { ...state, loading: false, error: null, student: action.payload };

    default:
      return state;
  }
}

// export const addStudentReducer = (state = initialState, action: any): any => {
//   switch (action.type) {
//     case ADD_STUDENT_REQUEST:
//       return { ...state, loading: true };
//     case ADD_STUDENT_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     case ADD_STUDENT_SUCCESS:
//       return { ...state, loading: false, error: null, student: action.payload };

//     default:
//       return state;
//   }
// }

// export const updateStudentReducer = (state = initialState, action: any): any => {
//   switch (action.type) {
//     case EDIT_STUDENT_REQUEST:
//       return { ...state, loading: true };
//     case EDIT_STUDENT_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     case EDIT_STUDENT_SUCCESS:
//       return { ...state, loading: false, error: null, student: action.payload };

//     default:
//       return state;
//   }
// }

export const oneStudentReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case GET_STUDENT_REQUEST:
      return { ...state, loading: true };
    case GET_STUDENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_STUDENT_SUCCESS:
      return { ...state, loading: false, error: null, student: action.payload };

    default:
      return state;
  }
}
