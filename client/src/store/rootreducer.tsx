import { configureStore } from "@reduxjs/toolkit";
import auth from "./authreducer";
import utilSlice from "./utils";
import authorized from "./authorized";
import room from "./room";

export const store = configureStore(
    {
        reducer: {
            auth,
            utilSlice,
            authorized,
            room
        }
    }
);


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>


