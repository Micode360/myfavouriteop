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
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const defaultImages_1 = require("../utils/defaultImages");
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    favOS: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minLength: 6,
        select: false,
    },
}, {
    timestamps: true,
});
/*
.pre runs a certain function to the user object before it
gets saved, deleted update and so on this one is save
*/
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            next();
        const salt = yield bcryptjs_1.default.genSalt(15);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        this.profilePic = defaultImages_1.Images[`${this.favOS}`];
        next();
    });
});
UserSchema.methods.compareToMatchPasswords = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
UserSchema.methods.getSignedInToken = function () {
    return jsonwebtoken_1.default.sign({
        id: this._id,
        username: this.username,
        favOS: this.favOS,
        profilePic: !this.profilePic || this.profilePic === "" ? defaultImages_1.Images[`${this.favOS}`] : this.profilePic
    }, process.env.JWT_SECRET, {});
};
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
