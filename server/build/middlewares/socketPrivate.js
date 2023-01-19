"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // here because of socket.io
const user_1 = __importDefault(require("../models/user"));
const Authorization = (socket, next) => {
    let token;
    token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Unauthorized'));
    }
    // Verify the JWT
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err, "Unauthorized");
            return next(new Error('Unauthorized'));
        }
        const user = user_1.default.findById(decoded.id);
        if (!user)
            return next(new Error('Unauthorized'));
        next();
    });
};
exports.Authorization = Authorization;
