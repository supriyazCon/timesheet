//import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import axios from "axios";
import RootReducer from "../reducers/RootReducer";
import thunk from "redux-thunk";
import { multiClientMiddleware } from "redux-axios-middleware";
import createSagaMiddleware from "redux-saga";

const defaultClient = axios.create({
  baseURL: "",
  responseType: "json",
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["Reducers"],
};

const clients = {
  default: {
    client: defaultClient,
  },
};
const sagaMiddleware = createSagaMiddleware();
const middleware = [];

middleware.push(thunk);

const persistedReducer = persistReducer(persistConfig, RootReducer);

const configStore = createStore(
  persistedReducer,
  applyMiddleware(
    createLogger(),
    multiClientMiddleware(clients),
    sagaMiddleware,
    ...middleware
  )
);

let persistor = persistStore(configStore);

export { persistor, configStore };
