import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import fakeData from "../generated_data.json";

// Type for table row
type TableRow = {
  id: number;
  image_name: string;
  date: string;
  result: string;
};

// Initial state
interface TableState {
  rows: TableRow[];
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  rows: [],
  loading: false,
  error: null,
};

// Async thunk for fetching data
export const fetchTableData = createAsyncThunk<TableRow[]>(
  "table/fetchTableData",
  async () => {
    const response = await fetch("/api/table-data");
    if (!response.ok) {
      throw new Error("Failed to fetch table data");
    }
    console.log(response);
    const data = fakeData.slice(0, 5);
    //return response.json();
    return data;
  },
);

// Slice for table
const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow(state, action) {
      state.rows.push(action.payload);
    },
    removeRow(state, action) {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    updateRow(state, action) {
      const index = state.rows.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const selectRows = (state: RootState) => state.table.rows;
export const selectLoading = (state: RootState) => state.table.loading;
export const selectError = (state: RootState) => state.table.error;
export const { addRow, removeRow, updateRow } = tableSlice.actions;
export default tableSlice.reducer;
