import {
  CLIENTDETAILS,
  CLIENTFILTER,
  PROJECTDETAILS,
  PROJECTFILTER,
  REFRESH,
} from "../constants/Constants";

const initialState = {
  projectDetails: [],
  clientDetails: [],
  projectFilter: {},
  clientFilter: {},
  refresh: false,
};

const Reducers = (state = initialState, action) => {
  console.log("reducer action type", action.type);
  switch (action.type) {
    case PROJECTDETAILS:
      return {
        ...state,
        projectDetails: action.payload,
      };
    case CLIENTDETAILS:
      return {
        ...state,
        clientDetails: action.payload,
      };
    case CLIENTFILTER:
      return {
        ...state,
        clientFilter: action.payload,
      };
    case PROJECTFILTER:
      return {
        ...state,
        projectFilter: action.payload,
      };
    case REFRESH:
      return {
        ...state,
        refresh: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default Reducers;
