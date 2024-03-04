import mainSliceReducer from "../lib/redux//slices/mainSlice";
import commonSliceReducer from "../lib/redux//slices/commonSlice";
import tableSliceReducer from "../lib/redux//slices/tableSlice";
import customerSlice from "../lib/redux/slices/customerSlice";
// import companySlice from "../lib/redux/slices/companySlice";
import companySlice from "../lib/redux/slices/companySliceNew";
import userSlice from "../lib/redux/slices/userSliceNew";

export const combineReducersConstan = {
  cards: mainSliceReducer,
  common: commonSliceReducer,
  table: tableSliceReducer,
  apiCompany: companySlice,
  apiCustomer: customerSlice,
  apiUser: userSlice,
};
