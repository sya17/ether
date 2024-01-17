import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// slices
import mainSliceReducer from "./slices/mainSlice";
import commonSliceReducer from "./slices/commonSlice";
import tableSliceReducer from "./slices/tableSlice";
import apiSliceReducer from "./slices/apiSlice";

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

export const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
  cards: mainSliceReducer,
  common: commonSliceReducer,
  table: tableSliceReducer,
  api: apiSliceReducer,
});

export default rootReducer;
