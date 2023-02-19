"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_autosize_textarea_1 = __importDefault(require("react-autosize-textarea"));
const TextArea = ({ sendingMessage, setSenderContent }) => {
    return (<div className="flex items-center">
            <react_autosize_textarea_1.default maxRows={4} onChange={(e) => setSenderContent(e.target.value)} className="bg-[#32323e] w-[85%] md:w-full px-2 mb-2 placeholder:text-[0.9rem] text-[0.9rem] border-[1px] border-[#63470d] focus:border-sky-500 focus:ring-sky-500 focus:ring-1 rounded p-2" placeholder='write here...'/>
            <button className="bg-orange-500 active:bg-orange-600 mb-2 ml-2 rounded p-1" onClick={sendingMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                    </svg>
            </button>
        </div>);
};
exports.default = TextArea;
