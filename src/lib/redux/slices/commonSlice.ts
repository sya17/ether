import { useToast } from "@/components/ui/use-toast";
import { mainComponents } from "@/constant/component-constant";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CommonState {
  hideSidebar: boolean;
  page: React.ComponentType<any> | null;
  activePage: string;
}

const initialState: CommonState = {
  hideSidebar: false,
  page: null,
  activePage: "",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    hideSidebar(state) {
      state.hideSidebar = !state.hideSidebar;
    },
    setActivePage(state, action: PayloadAction<string>) {
      state.activePage = action.payload;
      state.page = mainComponents[state.activePage] ?? state.page;
    },
  },
});

export const { hideSidebar, setActivePage } = commonSlice.actions;
export default commonSlice.reducer;
