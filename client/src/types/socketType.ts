export interface ServerToClientEvents {
    chatData: (a:Array<object>) => void;
    sendMessage: (a:object) => void;
    joinRoom: (a:object) => void;
    receivedMessage: (a:object) => void;
}
  
export interface ClientToServerEvents {
    sendMessage: (a:object) => void;
    chatData: (a:Array<object>) => void;
    joinRoom: (a:object) => void;
    receivedMessage: (a:object) => void;
}
  