"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../store/hooks");
const authorized_1 = require("../store/authorized");
const Header = () => {
    const { auth } = (0, hooks_1.useAppSelector)((state) => state);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const [userOpt, setUserOpt] = (0, react_1.useState)(false);
    let hUser;
    hUser = !auth.user ? "" : auth.user;
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (userOpt === true) {
                if (event.target.id === "userOpt0"
                    || event.target.id === "userOpt1"
                    || event.target.id === "userOpt2"
                    || event.target.id === "userOpt3"
                    || event.target.id === "userOpt4"
                    || event.target.id === "userOpt5") {
                    return;
                }
                else
                    return setUserOpt(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [userOpt]);
    return (<header className=" relative px-4 xl:px-8 flex justify-between items-center border-b-[1px] border-b-gray-600 py-4">
      <react_router_dom_1.Link to="/">
        <span className="font-[900] mr-1">OS</span>
        <span className="text-gray-300">My Favourite</span>
      </react_router_dom_1.Link>

      <div className="flex justify-between items-center">
        <react_router_dom_1.Link to={`/room/${hUser.id}`}>Room</react_router_dom_1.Link>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden block ml-4 z-20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
        </svg>
        <div style={{ backgroundImage: `url(${hUser.profilePic})` }} id="userOpt1" className="h-6 w-6 ml-4 bg-cover bg-center cursor-pointer rounded-full mr-1" onClick={() => setUserOpt(true)}></div>
      </div>
      {userOpt && (<div id="userOpt0" className="absolute right-5 bottom-[-140px] shadow bg-[#4e505f] py-3 px-2 w-[12rem] rounded flex flex-col justify-center items-center">
          <span onClick={() => setUserOpt(!userOpt)} className="absolute top-0 right-2 cursor-pointer">
            x
          </span>
          <div style={{ backgroundImage: `url(${hUser.profilePic})` }} id="userOpt2" className="h-8 w-8 mb-1 cursor-pointer bg-cover bg-center rounded-full"></div>
          <div id="userOpt3">{hUser.username}</div>
          <div id="userOpt4" className="mb-1 text-[0.7rem] text-gray-400">{hUser.favOS}</div>
          <button id="userOpt5" className="text-center shadow bg-[#f14483] hover:bg-[#e43c79] w-full py-1 px-2 rounded" onClick={() => {
                dispatch((0, authorized_1.logOut)({
                    logOut: true
                }));
            }}>
            Log Out
          </button>
        </div>)}
    </header>);
};
exports.default = Header;
