import { combineReducers } from "redux";
import questionModule from "./questionModule";

export default combineReducers({
    questionModule: questionModule,
});