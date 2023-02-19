"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const base_1 = __importDefault(require("./config/base"));
const auth_1 = __importDefault(require("./routes/auth"));
const private_1 = __importDefault(require("./routes/private"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const room_1 = __importDefault(require("./controllers/room"));
const socketPrivate_1 = require("./middlewares/socketPrivate");
const path_1 = __importDefault(require("path"));
(0, base_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
app.set('view engine', 'pug');
/*Using routes*/
app.use('/auth', auth_1.default);
app.use('/os', private_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('../client/build'));
    app.get('/*', (req, res) => res.sendFile(path_1.default.resolve(__dirname + '/usr/src/app/client/build/index.html')));
}
const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
// Socket IO Logics
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.PATH,
        credentials: true,
        methods: ['GET', 'POST']
    },
    path: '/socket.io',
    serveClient: true,
    pingInterval: 10000,
    pingTimeout: 5000,
});
//Establishing headers
io.use(socketPrivate_1.Authorization);
io.on('connection', socket => {
    console.log(socket.id, "connection");
    (0, room_1.default)(io, socket);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// in package.json: at "start": "start": "node -r ./bootstrap.js ./build/server.js",
