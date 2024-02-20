import mainSliceReducer from "../lib/redux//slices/mainSlice";
import commonSliceReducer from "../lib/redux//slices/commonSlice";
import tableSliceReducer from "../lib/redux//slices/tableSlice";
import apiSliceReducer from "../lib/redux//slices/apiSlice";
import companySlice from "../lib/redux/slices/companySlice";
import customerSlice from "../lib/redux/slices/customerSlice";
import userSlice from "../lib/redux/slices/userSlice";

export const combineReducersConstan = {
  cards: mainSliceReducer,
  common: commonSliceReducer,
  table: tableSliceReducer,
  api: apiSliceReducer,
  apiCompany: companySlice,
  apiCustomer: customerSlice,
  apiUser: userSlice,
};
