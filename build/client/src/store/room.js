"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatData = exports.sender = exports.room = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    sender: {
        id: "",
        textContent: ""
    },
    chatData: []
};
exports.room = (0, toolkit_1.createSlice)({
    name: "room",
    initialState,
    reducers: {
        sender: (state, action) => {
            // state.user = action.payload.user;
            console.log(action, "sender reducer");
        },
        chatData: (state, action) => {
            //state.graph = action.payload;
        }
    },
});
_a = exports.room.actions, exports.sender = _a.sender, exports.chatData = _a.chatData;
exports.default = exports.room.reducer;
