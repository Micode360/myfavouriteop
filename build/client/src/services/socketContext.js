"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSocket = exports.SocketContext = exports.socket = void 0;
const react_1 = __importStar(require("react"));
const socket_io_client_1 = require("socket.io-client");
const socket_config_1 = require("../api/socket.config");
const env_1 = __importDefault(require("../config/env"));
exports.socket = (0, socket_io_client_1.io)(env_1.default.BASE_URL, {
    transports: ['websocket', 'polling', 'flashsocket'],
    auth: {
        token: socket_config_1.AuthHeaders.token
    }
});
exports.SocketContext = react_1.default.createContext(null);
const useSocket = () => {
    const socket = (0, react_1.useContext)(exports.SocketContext);
    return socket;
};
exports.useSocket = useSocket;
