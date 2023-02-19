"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.utilSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    status: "register",
    message: "",
    pageLoadStatus: false
};
exports.utilSlice = (0, toolkit_1.createSlice)({
    name: "utils",
    initialState,
    reducers: {
        message: (state, action) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
        pageLoadStatus: (state, action) => {
            state.pageLoadStatus = action.payload.message;
        },
    },
});
exports.message = exports.utilSlice.actions.message;
exports.default = exports.utilSlice.reducer;
