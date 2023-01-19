export interface ServerToClientEvents {
    chatData: (a:object) => void;
    joinRoom: (a:object) => void;
    receivedMessage: (a:object) => void;
  }
  
export interface ClientToServerEvents {
    joinRoom: (a:object) => void;
    sendMessage: (a:object) => void;
    receivedMessage: (a:object) => void;
  }
  
export interface InterServerEvents {
    ping: () => void
  }
  
export interface SocketData {
    name: string
    age: number
  }