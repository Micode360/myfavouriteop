"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
exports.ENV = {
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.REACT_APP_API_BASE_URL,
    isProd() {
        return this.NODE_ENV === 'production';
    },
    isDev() {
        return this.NODE_ENV === 'development';
    },
    isTest() {
        return this.NODE_ENV === 'test';
    },
};
exports.default = exports.ENV;
