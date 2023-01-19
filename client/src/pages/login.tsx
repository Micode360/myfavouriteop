import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { ThunkSignIn } from "../store/authreducer";

const Login = () => {
 // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth, utilSlice } = useAppSelector((state) => state);
  const [submit, setSubmit] = useState<string>("");
  const initialValues = {
    username: "",
    password: "",
  };
// dummy password: %d#sf2fdkss$kfd

/*
  Try to remember adding a theme animation if the user exists
  where the backround of the color will slowly change to the theme color of the user
*/

  useEffect(() => {
    if (auth.isLoggedIn) window.location.href = '/'; //error in loading data suppose to use navigate()
    if (utilSlice.status === "logerr") {
      setSubmit("error");
    }
  }, [auth, utilSlice.status, setSubmit]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("What's your username"),
    password: Yup.string().required("Write your password"),
  });


  const onSubmit = (values: any) => {
    setSubmit("submit")
    dispatch(
      ThunkSignIn({
        username:values.username,
        password: values.password
      })
    );
  };

  return (
    <main className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      {submit === "submit" ? (
        <div className="flex flex-col items-center justify-center">
        <div className="w-[4rem] h-[4rem]">
        <div className="circle relative">
        <h1 className="text-center text-[2.5rem] text-[#373744] font-[900] z-20 absolute top-[0%] left-[50%] translate-x-[-50%]">OS</h1>
          <div className="wave"></div>
        </div>
        </div>
        <p className="text-center mt-4">Please Wait...</p>
      </div>
      ) : (
        <div className="w-[80%] md:w-[30%]">
          <h1 className="mb-3 text-[1.5rem]">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values: any, { resetForm }: any) => {
              await onSubmit(values);
              resetForm();
            }}
          >
            <Form>
              {
                submit === "error"?
                  <div className="flex justify-between p-2 text-center rounded text-[0.9rem] bg-blue-400 mb-4">
                    No such user or wrong password. Try again.
                    <span className="cursor-pointer" onClick={()=>setSubmit("")}>x</span>
                    </div>
                :""
              }
              <div className="mb-4">
                <Field
                  type="text"
                  className="w-full bg-[#32323e] py-3 px-2 mb-2 placeholder:text-[0.9rem] text-[0.9rem] focus:outline-none border-[1px] border-[#63470d] focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  placeholder="Username"
                  name="username"
                />
                <ErrorMessage
                  name="username"
                  render={(errMessage: any) => (
                    <div className="error text-[#e6b89a] text-[0.9rem]">
                      {errMessage}
                    </div>
                  )}
                />
              </div>

              <div className="mb-4">
                <Field
                  type="password"
                  className="w-full bg-[#32323e] py-3 px-2 mb-2 placeholder:text-[0.9rem] text-[0.9rem] focus:outline-none border-[1px] border-[#63470d] focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  placeholder="Password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  render={(errMessage: any) => (
                    <div className="error text-[#e6b89a] text-[0.9rem]">
                      {errMessage}
                    </div>
                  )}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="text-center bg-[#f14483] w-full py-3 px-2"
                >
                  Send
                </button>
              </div>
            </Form>
          </Formik>
          <p className="mt-4">
            Don't have a user account?{" "}
            <Link className="text-[#0997c2]" to="/register">
              Register
            </Link>
          </p>
        </div>
      )}
    </main>
  );
};

export default Login;
