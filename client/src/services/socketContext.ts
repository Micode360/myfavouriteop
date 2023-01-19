import React, { useContext } from "react";
import { io, Socket } from "socket.io-client"; 
import { ServerToClientEvents, ClientToServerEvents } from "../types/socketType"
import { AuthHeaders } from "../api/socket.config"
import ENV from "../config/env";

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

socket = io(ENV.BASE_URL as string,
        {
         transports: ['websocket', 'polling', 'flashsocket'],
         auth: {
           token: AuthHeaders.token
         }
    });

export const SocketContext = React.createContext<any>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
}