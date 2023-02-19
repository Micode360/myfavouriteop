"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHeaders = void 0;
const universal_cookie_1 = __importDefault(require("universal-cookie"));
const cookies = new universal_cookie_1.default();
exports.AuthHeaders = {
    token: cookies.get('usertkn')
};
