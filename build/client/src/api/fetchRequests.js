"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../config/env"));
const universal_cookie_1 = __importDefault(require("universal-cookie"));
let baseUrl = env_1.default.BASE_URL;
const cookies = new universal_cookie_1.default();
axios_1.default.interceptors.request.use((config) => {
    if (cookies.get('usertkn')) {
        config.headers = Object.assign(Object.assign({}, config.headers), { Authorization: `Possessor ${cookies.get('usertkn')}` });
    }
    return config;
}, (error) => Promise.reject(error));
const Get = (path) => axios_1.default.get(`${baseUrl}${path}`);
const Post = (data, path) => axios_1.default.post(`${baseUrl}${path}`, data);
const PostWithParams = (params, path) => axios_1.default.post(`${baseUrl}${path}:/${params}`);
const PostWithParamsAndData = (params, path, data) => axios_1.default.post(`${baseUrl}${path}:/${params}`, data);
const Api = {
    Get,
    Post,
    PostWithParams,
    PostWithParamsAndData,
};
exports.default = Api;
