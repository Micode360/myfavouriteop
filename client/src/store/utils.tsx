
import { createSlice } from "@reduxjs/toolkit";

type stateType = {
  status: string,
  message: string,
  pageLoadStatus: Boolean
}

const initialState = {
  status: "register",
  message: "",
  pageLoadStatus: false
};

export const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    message: (state:stateType, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    pageLoadStatus: (state:stateType, action) => {
      state.pageLoadStatus = action.payload.message;
    }, 
  },
});

export const { message } = utilSlice.actions;
export default utilSlice.reducer;