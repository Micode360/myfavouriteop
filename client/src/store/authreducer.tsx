import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../api/fetchRequests";
import { message } from  "./utils";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

let cookies = new Cookies();
let cookie = cookies.get('usertkn');
let user = cookie? jwt_decode(cookie) : undefined;


type initialState = {
  isLoggedIn: Boolean,
  user: {
        id:string;
        iat:string;
        favOS:string;
        profilePic: string;
        username:string;
    } | undefined | unknown
}


export const ThunkSignUp = createAsyncThunk(
  "auth/signup",
  async (object: {FavOS:string, user:{ username: string; password: string; }}, thunkAPI) => {
    try {
      const response = await Api.Post({
          username: object.user.username,
          password: object.user.password,
          favOS: object.FavOS
      }, '/auth/signup');

      cookies.set("usertkn", response.data.token, { maxAge: 604800 });
      let cookie = cookies.get('usertkn');
      user = jwt_decode(cookie)
      return response.data;
    } catch (err:any) {
      thunkAPI.dispatch(message(err.response.data.message?{status:"regerr", message:err.response.data.message}:'Registeration Error. Try again later'));
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const ThunkSignIn = createAsyncThunk(
  "auth/signin",
  async (object: { username: string; password: string; }, thunkAPI) => {
    try {
      const response = await Api.Post({
          username: object.username,
          password: object.password,
      }, '/auth/signin');


      cookies.set("usertkn", response.data.token, { maxAge: 604800 });
      let cookie = cookies.get('usertkn');
      user = jwt_decode(cookie)
      return response.data;
    } catch (err:any) {
      thunkAPI.dispatch(message(err.response.data.message?{status:"logerr", message:err.response.data.message}:'Login Error. Try again later'));
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


const auth = createSlice({
  name: "auth",
  initialState: user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: undefined },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ThunkSignUp.pending, (state:initialState) => {
        state.isLoggedIn = false;
        state.user = undefined;
    })

    builder.addCase(ThunkSignUp.fulfilled, (state:initialState) => {
      state.isLoggedIn = true;
      state.user = user;
    })

    builder.addCase(ThunkSignUp.rejected, (state:initialState) => {
      state.isLoggedIn = false;
      state.user = undefined;
    })
    builder.addCase(ThunkSignIn.pending, (state:initialState) => {
      state.isLoggedIn = false;
      state.user = undefined;
  })

  builder.addCase(ThunkSignIn.fulfilled, (state:initialState) => {
    state.isLoggedIn = true;
    state.user = user;
  })

  builder.addCase(ThunkSignIn.rejected, (state:initialState) => {
    state.isLoggedIn = false;
    state.user = undefined;
  })
  },
});



export default auth.reducer;
