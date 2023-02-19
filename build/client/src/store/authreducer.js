"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThunkSignIn = exports.ThunkSignUp = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const fetchRequests_1 = __importDefault(require("../api/fetchRequests"));
const utils_1 = require("./utils");
const universal_cookie_1 = __importDefault(require("universal-cookie"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
let cookies = new universal_cookie_1.default();
let cookie = cookies.get('usertkn');
let user = cookie ? (0, jwt_decode_1.default)(cookie) : undefined;
exports.ThunkSignUp = (0, toolkit_1.createAsyncThunk)("auth/signup", (object, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetchRequests_1.default.Post({
            username: object.user.username,
            password: object.user.password,
            favOS: object.FavOS
        }, '/auth/signup');
        cookies.set("usertkn", response.data.token, { maxAge: 604800 });
        let cookie = cookies.get('usertkn');
        user = (0, jwt_decode_1.default)(cookie);
        return response.data;
    }
    catch (err) {
        thunkAPI.dispatch((0, utils_1.message)(err.response.data.message ? { status: "regerr", message: err.response.data.message } : 'Registeration Error. Try again later'));
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
}));
exports.ThunkSignIn = (0, toolkit_1.createAsyncThunk)("auth/signin", (object, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetchRequests_1.default.Post({
            username: object.username,
            password: object.password,
        }, '/auth/signin');
        cookies.set("usertkn", response.data.token, { maxAge: 604800 });
        let cookie = cookies.get('usertkn');
        user = (0, jwt_decode_1.default)(cookie);
        return response.data;
    }
    catch (err) {
        thunkAPI.dispatch((0, utils_1.message)(err.response.data.message ? { status: "logerr", message: err.response.data.message } : 'Login Error. Try again later'));
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
}));
const auth = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState: user
        ? { isLoggedIn: true, user }
        : { isLoggedIn: false, user: undefined },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(exports.ThunkSignUp.pending, (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
        });
        builder.addCase(exports.ThunkSignUp.fulfilled, (state) => {
            state.isLoggedIn = true;
            state.user = user;
        });
        builder.addCase(exports.ThunkSignUp.rejected, (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
        });
        builder.addCase(exports.ThunkSignIn.pending, (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
        });
        builder.addCase(exports.ThunkSignIn.fulfilled, (state) => {
            state.isLoggedIn = true;
            state.user = user;
        });
        builder.addCase(exports.ThunkSignIn.rejected, (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
        });
    },
});
exports.default = auth.reducer;
