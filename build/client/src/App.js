"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const darshboard_1 = __importDefault(require("./pages/darshboard"));
const login_1 = __importDefault(require("./pages/login"));
const register_1 = __importDefault(require("./pages/register"));
const room_1 = __importDefault(require("./pages/room"));
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<darshboard_1.default />}/>
          <react_router_dom_1.Route path="/login" element={<login_1.default />}/>
          <react_router_dom_1.Route path="/register" element={<register_1.default />}/>
          <react_router_dom_1.Route path="/room/:id" element={<room_1.default />}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
