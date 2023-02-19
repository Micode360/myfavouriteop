"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const footer_1 = __importDefault(require("../components/footer"));
const header_1 = __importDefault(require("../components/header"));
const textArea_1 = __importDefault(require("../components/textArea"));
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../store/hooks");
const room_1 = require("../store/room");
const toDate_1 = require("../services/toDate");
const socketContext_1 = require("../services/socketContext");
const Room = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const socket = (0, socketContext_1.useSocket)();
    const { room, auth } = (0, hooks_1.useAppSelector)((state) => state);
    const [pageStatus, setPageStatus] = (0, react_1.useState)(false);
    const [chatData, setChatData] = (0, react_1.useState)([]);
    const chatContainerRef = (0, react_1.useRef)(null);
    const [senderContent, setSenderContent] = (0, react_1.useState)({
        id: "",
        textContent: ""
    });
    (0, react_1.useEffect)(() => {
        if (!auth.isLoggedIn)
            window.location.href = "/login";
        else
            setPageStatus(true);
        if (id && socket) {
            socket.emit("joinRoom", { room: 'os_room', username: "emit" });
        }
    }, [auth, auth.isLoggedIn, id, navigate, socket]);
    (0, react_1.useEffect)(() => {
        socket.on("chatData", (data) => {
            setChatData(data);
        });
    }, [socket, id]);
    (0, react_1.useEffect)(() => {
        socket.on("receivedMessage", (data) => {
            console.log(data, "sendMessage socket");
            setChatData((prevData) => [...prevData, data]);
        });
        return function () {
            socket.off("receivedMessage");
        };
    }, [chatData, socket]);
    (0, react_1.useEffect)(() => {
        console.log("pinging");
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatData]);
    const sendingMessage = () => {
        dispatch((0, room_1.sender)(senderContent));
        console.log(senderContent, "SenderContent");
        socket.emit("sendMessage", {
            id: auth.user.id,
            message: senderContent
        });
    };
    if (!pageStatus) {
        return (<div className="flex flex-col items-center justify-center"></div>);
    }
    else {
        return (<main className="pb-6 flex flex-col fixed top-0 bottom-0 left-0 right-0">
      <div className="bg-[#373744]">
        <header_1.default />
      </div>
      

      <section ref={chatContainerRef} className="pt-8 h-[80%] px-4 overflow-y-scroll">
        <div className="w-full md:max-w-[40%]">
            {chatData.length < 1 ?
                <>
                <div className="w-[80%]">
                  <div className="flex flex-row mt-4 mb-1">
                    <div className=" animate-pulse bg-[#32323e] w-[3rem] h-[3rem] mr-2 rounded-full"></div>
                    <div className="max-w-[70%] animate-pulsew-[80%] w-full h-[3rem] bg-[#32323e] p-2 rounded"></div>
                  </div>
                </div>

                <div className="w-[80%]">
                  <div className="flex flex-row mt-4 mb-1">
                    <div className=" animate-pulse bg-[#32323e] w-[3rem] h-[3rem] mr-2 rounded-full"></div>
                    <div className="max-w-[70%] animate-pulsew-[80%] w-full h-[3rem] bg-[#32323e] p-2 rounded"></div>
                  </div>
                </div>

                <div className="w-[80%]">
                  <div className="flex flex-row mt-4 mb-1">
                    <div className=" animate-pulse bg-[#32323e] w-[3rem] h-[3rem] mr-2 rounded-full"></div>
                    <div className="max-w-[70%] animate-pulsew-[80%] w-full h-[3rem] bg-[#32323e] p-2 rounded"></div>
                  </div>
                </div>
              </>
                :
                    chatData.map((message) => {
                        return (<div className="w-[80%]" key={message._id}>
              <div className="flex flex-row mt-4 mb-8">
                <div style={{
                                backgroundImage: !message.user ? 'url(https://res.cloudinary.com/dw86qaw6y/image/upload/v1672761044/myfavos/504-5040528_empty-profile-picture-png-transparent-png_rtjc4v.png)' : `url(${message.user.profilePic})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }} className="w-[3rem] h-[3rem] mr-2 rounded-full"></div>
                <div style={{ background: !message.user || auth.user.id !== message.user._id ? "#7f7f7f" : "#f14483" }} className="relative max-w-[70%] p-2 rounded">
                  <div className="text-[0.7rem]">{!message.user ? "closed account" : message.user.username}</div>
                  <div>{message.text}</div>
                  <span className="absolute bottom-[-20px] right-0 text-[0.7rem] text-gray-400">{(0, toDate_1.toDate)(message.timestamp).time}</span>
                </div>
              </div>
              
            </div>);
                    })}

        </div>
      </section>

      <div className="bg-[#373744] px-4 pt-2 w-[100%]">
        <textArea_1.default sendingMessage={sendingMessage} setSenderContent={setSenderContent}/>
        <footer_1.default />
      </div>
    </main>);
    }
};
exports.default = Room;
