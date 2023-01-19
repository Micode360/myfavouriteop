import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { ThunkSignUp } from "../store/authreducer";
import ENV from "../config/env";
import axios from "axios";

interface userInt {
  username: string;
  password: string;
}

const Register = () => {
 // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth, utilSlice } = useAppSelector((state) => state);
  const [submit, setSubmit] = useState<string>("");
  const [FavOS, setFavOS] = useState<string>("");
  const [user, setUser] = useState<userInt>({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (auth.isLoggedIn) window.location.href = '/';
    if (utilSlice.status === "regerr") {
      setSubmit("error");
    }
  }, [auth, utilSlice.status, setSubmit]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Create your username")
      .test(
        "Unique Email",
        "Email already in use", 
        function (value) {
          return new Promise((resolve, reject) => {
            axios
              .get(`${ENV.BASE_URL}/auth/check/${value}`)
              .then((res) => {
                resolve(true);
              })
              .catch((error) => {
                if (
                  error.response.data.message === "Username is already taken"
                ) {
                  resolve(false);
                }
              });
          });
        }
      ),
    password: Yup.string().required("Create your password"),
  });
  const onSubmit = (values: any) => {
    setUser({ ...values });
    setSubmit("favOS");
  };

  const submitFavOS = () => {
    setSubmit("submit");
    dispatch(
      ThunkSignUp({
        user,
        FavOS,
      })
    )
  };

  return (
    <main className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      {submit === "error" ? (
        <div className="flex flex-col w-[80%] md:w-[30%] text-center">
          <h1 className="text-[1.5rem] mb-4">
            Something went wrong: Please reload page.
          </h1>
          <button
            className="text-center bg-[#f14483] w-full py-3 px-2"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      ) : submit === "favOS" ? (
        <div className="flex flex-col w-[80%] md:w-[30%] text-center">
          <h1 className="text-[1.5rem] mb-4">
            Which one is your favorite operating system?
          </h1>
          <button
            className="w-full bg-[#32323e] py-4 px-2 mb-2 focus:outline-none border-[1px] border-[#63470d] focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            onClick={() => setFavOS("mac")}
          >
            Mac
          </button>
          <button
            className="w-full bg-[#32323e] py-4 px-2 mb-2 focus:outline-none border-[1px] border-[#63470d] focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            onClick={() => setFavOS("windows")}
          >
            Windows
          </button>
          <button
            className="w-full bg-[#32323e] py-4 px-2 mb-2 focus:outline-none border-[1px] border-[#63470d] focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            onClick={() => setFavOS("linux")}
          >
            Linux
          </button>
          <button
            className="text-center bg-[#f14483] w-full py-3 px-2"
            onClick={submitFavOS}
          >
            Send
          </button>
        </div>
      ) : submit === "" ? (
        <div className="w-[80%] md:w-[30%]">
          <h1 className="mb-3 text-[1.5rem]">Register</h1>
          {utilSlice.status === "register" ? (
            <div>{utilSlice.message}</div>
          ) : (
            ""
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values: any, { resetForm }: any) => {
              await onSubmit(values);
              resetForm();
            }}
          >
            <Form>
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
            Already have a user account?{" "}
            <Link className="text-[#0997c2]" to="/login">
              Login
            </Link>
          </p>
        </div>
      ) : submit === "submit" ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-[4rem] h-[4rem]">
            <div className="circle relative">
              <h1 className="text-center text-[2.5rem] text-[#373744] font-[900] z-20 absolute top-[0%] left-[50%] translate-x-[-50%]">
                OS
              </h1>
              <div className="wave"></div>
            </div>
          </div>
          <p className="text-center mt-4">Please Wait...</p>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default Register;
