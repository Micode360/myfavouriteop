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
const room_1 = __importDefault(require("../models/room"));
exports.default = (io, socket) => {
    socket.on("joinRoom", (data) => {
        const { room, username } = data;
        socket.join(room);
        socket.to(data.room).emit('joinRoom', {
            message: `${username} has joined the chat room`,
            username: 'CHAT_BOT',
        });
        room_1.default.find({})
            .populate({ path: 'user' })
            .then((data) => {
            socket.emit('chatData', data);
            return data;
        });
    });
    socket.on('sendMessage', (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chat = yield new room_1.default({
                user: message.id,
                text: message.message
            });
            chat.save((error, data) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
                else {
                    room_1.default.findOne({ _id: data._id })
                        .populate({ path: 'user' })
                        .then((data) => {
                        io.in('os_room').emit('receivedMessage', data);
                    });
                }
            });
        }
        catch (err) {
            console.log(err, "err");
        }
    }));
};
