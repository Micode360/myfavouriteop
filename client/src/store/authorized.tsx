import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

let cookies = new Cookies();

type stateType = {
  status: string,
  user: Array<object>,
  graph: Array<object>,
  notification:Array<object>
  logOut: Boolean
}

const initialState = {
  status: "",
  user: [],
  graph: [],
  notification:[],
  logOut: false
};


type AddLogOutPayload = {
  logOut:Boolean;
}

export const authorized = createSlice({
  name: "authorized",
  initialState,
  reducers: {
    user: (state:stateType, action:any) => {
     // state.user = action.payload.user;
    },
    graph: (state:stateType, action:any) => {
      state.graph = action.payload;
    },
    notification: (state:stateType, action:any) => {
     // state.notification = action.payload.user;
    },
    logOut: (state:stateType, action:PayloadAction<AddLogOutPayload>) => {
      if(action.payload.logOut === true) {
        cookies.remove('usertkn')
        window.location.reload()
      }
     },
  },
});

export const { user, graph, logOut } = authorized.actions;
export default authorized.reducer;