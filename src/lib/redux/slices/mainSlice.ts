import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addItem(state: any, action: any) {
      state.items.push(action.payload);
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { addItem, setLoading, setError } = mainSlice.actions;
export default mainSlice.reducer;
