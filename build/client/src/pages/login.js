"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const formik_1 = require("formik");
const Yup = __importStar(require("yup"));
//import { useNavigate } from "react-router-dom";
const hooks_1 = require("../store/hooks");
const authreducer_1 = require("../store/authreducer");
const Login = () => {
    // const navigate = useNavigate();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { auth, utilSlice } = (0, hooks_1.useAppSelector)((state) => state);
    const [submit, setSubmit] = (0, react_1.useState)("");
    const initialValues = {
        username: "",
        password: "",
    };
    // dummy password: %d#sf2fdkss$kfd
    /*
      Try to remember adding a theme animation if the user exists
      where the backround of the color will slowly change to the theme color of the user
    */
    (0, react_1.useEffect)(() => {
        if (auth.isLoggedIn)
            window.location.href = '/'; //error in loading data suppose to use navigate()
        if (utilSlice.status === "logerr") {
            setSubmit("error");
        }
    }, [auth, utilSlice.status, setSubmit]);
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("What's your username"),
        password: Yup.string().required("Write your password"),
    });
    const onSubmit = (values) => {
        setSubmit("submit");
        dispatch((0, authreducer_1.ThunkSignIn)({
            username: values.username,
            password: values.password
        }));
    };
    return (<main className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      {submit === "submit" ? (<div className="flex flex-col items-center justify-center">
        <div className="w-[4rem] h-[4rem]">
        <div className="circle relative">
        <h1 className="text-center text-[2.5rem] text-[#373744] font-[900] z-20 absolute top-[0%] left-[50%] translate-x-[-50%]">OS</h1>
          <div className="wave"></div>
        </div>
        </div>
        <p className="text-center mt-4">Please Wait...</p>
      </div>) : (<div className="w-[80%] md:w-[30%]">
          <h1 className="mb-3 text-[1.5rem]">Login</h1>
          <formik_1.Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => __awaiter(void 0, void 0, void 0, function* () {
                yield onSubmit(values);
                resetForm();
            })}>
            <formik_1.Form>
              {submit === "error" ?
                <div className="flex justify-between p-2 text-center rounded text-[0.9rem] bg-blue-400 mb-4">
                    No such user or wrong password. Try again.
                    <span className="cursor-pointer" onClick={() => setSubmit("")}>x</span>
                    </div>
                : ""}
              <div className="mb-4">
                <formik_1.Field type="text" className="w-full bg-[#32323e] py-3 px-2 mb-2 placeholder:text-[0.9rem] text-[0.9rem] focus:outline-none border-[1px] border-[#63470d] focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Username" name="username"/>
                <formik_1.ErrorMessage name="username" render={(errMessage) => (<div className="error text-[#e6b89a] text-[0.9rem]">
                      {errMessage}
                    </div>)}/>
              </div>

              <div className="mb-4">
                <formik_1.Field type="password" className="w-full bg-[#32323e] py-3 px-2 mb-2 placeholder:text-[0.9rem] text-[0.9rem] focus:outline-none border-[1px] border-[#63470d] focus:border-sky-500 focus:ring-sky-500 focus:ring-1" placeholder="Password" name="password"/>
                <formik_1.ErrorMessage name="password" render={(errMessage) => (<div className="error text-[#e6b89a] text-[0.9rem]">
                      {errMessage}
                    </div>)}/>
              </div>

              <div>
                <button type="submit" className="text-center bg-[#f14483] w-full py-3 px-2">
                  Send
                </button>
              </div>
            </formik_1.Form>
          </formik_1.Formik>
          <p className="mt-4">
            Don't have a user account?{" "}
            <react_router_dom_1.Link className="text-[#0997c2]" to="/register">
              Register
            </react_router_dom_1.Link>
          </p>
        </div>)}
    </main>);
};
exports.default = Login;
