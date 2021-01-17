import { combineReducers } from "redux";
import adminReducer from "./auth.reducer";
import { studentReducer, addStudentReducer, updateStudentReducer } from "./student.reducer";
import { courseReducer, addCourseReducer, deleteCourseReducer } from "./course.reducer";
import notify from "./notify.reducer";

const rootReducer = combineReducers({
  adminReducer,
  studentReducer,
  addStudentReducer,
  updateStudentReducer,
  notify,
  courseReducer,
  addCourseReducer,
  deleteCourseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
