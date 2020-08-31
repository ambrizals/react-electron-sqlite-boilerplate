import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogicMiddleware } from "redux-logic";
import storage from "redux-persist/lib/storage";
import allReducers from "./reducers";
import logic from "./logic";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const persistedReducer = persistReducer(persistConfig, allReducers);
const deps = {
  SECRET_KEY: "dsfjsdkfjsdlfjls",
};

const logicMiddleware = createLogicMiddleware(logic, deps);
const composedMiddleware = compose(applyMiddleware(logicMiddleware));

const store = createStore(persistedReducer, composedMiddleware);
let persistor = persistStore(store);

export default {
  store,
  persistor,
};
