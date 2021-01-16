import { GET_ALLSTUDENT_SUCCESS, GET_ALLSTUDENT_REQUEST, GET_ALLSTUDENT_FAILURE } from 'Store/constants';

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

export default function studentReducer(state = initialState, action: any): any {
  switch (action.type) {
    case GET_ALLSTUDENT_REQUEST:
      return { ...state, loading: true };
    case GET_ALLSTUDENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ALLSTUDENT_SUCCESS:
      return { ...state, loading: false, error: null, student: action.payload };

      default:
        return state;
  }
}
