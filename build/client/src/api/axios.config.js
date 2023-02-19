"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const universal_cookie_1 = __importDefault(require("universal-cookie"));
const cookies = new universal_cookie_1.default();
function makeApi(baseURL) {
    const api = axios_1.default.create({
        baseURL,
    });
    api.defaults.headers.post['Content-Type'] = "application/json";
    api.defaults.headers.put['Content-Type'] = "application/json";
    api.defaults.headers.delete['Content-Type'] = "application/json";
    api.interceptors.request.use((config) => {
        if (cookies.get('usertkn')) {
            config.headers = Object.assign(Object.assign({}, config.headers), { Authorization: `Possessor ${cookies.get('usertkn')}` });
        }
        return config;
    }, (error) => Promise.reject(error));
    api.interceptors.response.use((response) => response.data, // return data object
    (error) => Promise.reject(error));
    return api;
}
exports.default = makeApi;
