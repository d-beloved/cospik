import { combineReducers } from "redux";
import adminReducer from "./auth.reducer";
import studentReducer from "./student.reducer";
import notify from "./notify.reducer";

const rootReducer = combineReducers({
  adminReducer,
  studentReducer,
  notify,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
