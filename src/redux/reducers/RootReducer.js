import { combineReducers } from "redux";
import Reducers from "./Reducers";

const RootReducers = combineReducers({
  Reducers: Reducers,
});

export default RootReducers;
