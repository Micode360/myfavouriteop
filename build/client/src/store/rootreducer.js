"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authreducer_1 = __importDefault(require("./authreducer"));
const utils_1 = __importDefault(require("./utils"));
const authorized_1 = __importDefault(require("./authorized"));
const room_1 = __importDefault(require("./room"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: authreducer_1.default,
        utilSlice: utils_1.default,
        authorized: authorized_1.default,
        room: room_1.default
    }
});
