import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TableState {
  tableFilter: {
    id: string;
    listFilter: string[];
    listColumns: string[] | undefined;
  };
}

const initialState: TableState = {
  tableFilter: {
    id: "",
    listFilter: [],
    listColumns: [],
  },
};

const tableSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    addColumnTable(
      state,
      action: PayloadAction<{ id: string; list: string[] | undefined }>
    ) {
      state.tableFilter.id = action.payload.id;
      state.tableFilter.listColumns = action.payload.list;
    },
    addFilter(state, action: PayloadAction<{ id: string; column: string }>) {
      if (state.tableFilter.id == action.payload.id) {
        let indexToRemove: number = state.tableFilter.listColumns!.findIndex(
          (e) => e === action.payload.column
        );
        if (indexToRemove !== -1) {
          state.tableFilter.listColumns!.splice(indexToRemove, 1);
        }
        state.tableFilter.listFilter.push(action.payload.column);
      }
    },
    removeFilter(state, action: PayloadAction<{ id: string; column: string }>) {
      if (state.tableFilter.id == action.payload.id) {
        let indexToRemove: number = state.tableFilter.listFilter.findIndex(
          (e) => e === action.payload.column
        );
        if (indexToRemove !== -1) {
          state.tableFilter.listFilter.splice(indexToRemove, 1);
        }
        state.tableFilter.listColumns!.push(action.payload.column);
      }
    },
  },
});

export const { addColumnTable, addFilter, removeFilter } = tableSlice.actions;
export default tableSlice.reducer;
