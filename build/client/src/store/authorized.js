"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.graph = exports.user = exports.authorized = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const universal_cookie_1 = __importDefault(require("universal-cookie"));
let cookies = new universal_cookie_1.default();
const initialState = {
    status: "",
    user: [],
    graph: [],
    notification: [],
    logOut: false
};
exports.authorized = (0, toolkit_1.createSlice)({
    name: "authorized",
    initialState,
    reducers: {
        user: (state, action) => {
            // state.user = action.payload.user;
        },
        graph: (state, action) => {
            state.graph = action.payload;
        },
        notification: (state, action) => {
            // state.notification = action.payload.user;
        },
        logOut: (state, action) => {
            if (action.payload.logOut === true) {
                cookies.remove('usertkn');
                window.location.reload();
            }
        },
    },
});
_a = exports.authorized.actions, exports.user = _a.user, exports.graph = _a.graph, exports.logOut = _a.logOut;
exports.default = exports.authorized.reducer;
