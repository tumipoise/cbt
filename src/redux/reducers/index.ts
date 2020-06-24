import { combineReducers } from "redux";
import student from "./studentReducer";
import apiCallsInProgress from "./apiStatusReducer";
import administrator from "./administratorReducer";
import exams from "./ExamsReducer";
import studentExamination from "./studentExamReducer";
import pin from "./pinReducer";
import otherAdministrator from "./otherAdministratorReducer";
import results from "./resultReducer";

export const rootReducer = combineReducers({
  student,
  administrator,
  apiCallsInProgress,
  exams,
  studentExamination,
  pin,
  results,
  otherAdministrator
});

// export default rootReducer;
