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
exports.SignIn = exports.SignUp = exports.UserCheck = void 0;
const user_1 = __importDefault(require("../models/user"));
const UserCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.user;
    const user = yield user_1.default.findOne({ username });
    try {
        if (!user) {
            res.status(200).json({ message: "Your're good to go." });
        }
        else {
            res.status(400).json({ message: 'Username is already taken' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.UserCheck = UserCheck;
const SignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, favOS } = req.body;
    const user = yield user_1.default.findOne({ username });
    if (!user) {
        try {
            const user = yield user_1.default.create({
                username,
                password,
                favOS
            });
            sendToken(user, 201, res);
        }
        catch (error) {
            next(error);
        }
    }
    else if (user.username === username)
        return res.status(400).json({ message: 'Username is already taken' });
});
exports.SignUp = SignUp;
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(res.status(400).json({ message: 'Please provide username and password' }));
    }
    try {
        const user = yield user_1.default.findOne({ username }).select('+password');
        if (!user) {
            return next(res.status(400).json({ message: 'Invalid username or password' }));
        }
        const isMatch = yield user.compareToMatchPasswords(password);
        if (!isMatch) {
            return next(res.status(400).json({ message: 'Invalid username or password' }));
        }
        sendToken(user, 201, res);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
});
exports.SignIn = SignIn;
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedInToken();
    res.status(statusCode).json({ success: true, token });
};
