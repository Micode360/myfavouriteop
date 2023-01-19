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
exports.Darshboard = void 0;
const user_1 = __importDefault(require("../models/user"));
const toPercentage = (totalUsers, specificUsers) => Math.round((specificUsers / totalUsers) * 100);
const filterOsUsers = (user, os) => {
    const totalUsers = user.length;
    const userSet = user.filter((item) => item.favOS === os);
    return { percentage: toPercentage(totalUsers, userSet.length), length: userSet.length };
};
const Darshboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find();
    try {
        const result = [
            {
                name: 'mac',
                users: filterOsUsers(user, 'mac').length,
                percentageVal: filterOsUsers(user, 'mac').percentage,
            },
            {
                name: 'windows',
                users: filterOsUsers(user, 'windows').length,
                percentageVal: filterOsUsers(user, 'windows').percentage,
            },
            {
                name: 'linux',
                users: filterOsUsers(user, 'linux').length,
                percentageVal: filterOsUsers(user, 'linux').percentage,
            },
        ];
        res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json('Error');
    }
    next();
});
exports.Darshboard = Darshboard;
