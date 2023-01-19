import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

type stateType = {
  sender: {
    id:string;
    textContent: string;
  },
  chatData: Array<object>
}

type AddSenderPayload = {
  id:string;
  textContent: string;
}

const initialState = {
  sender: {
    id:"",
    textContent: ""
  },
  chatData: []
};

export const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    sender: (state:stateType, action:PayloadAction<AddSenderPayload>) => {
     // state.user = action.payload.user;
     console.log(action, "sender reducer")
    },
    chatData: (state:stateType, action:any) => {
      //state.graph = action.payload;
    }
  },
});

export const { sender, chatData } = room.actions;
export default room.reducer;