"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const RoomSchema = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const RoomModel = mongoose_1.default.model('RoomModel', RoomSchema);
exports.default = RoomModel;
