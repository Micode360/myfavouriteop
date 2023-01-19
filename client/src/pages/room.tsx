import { useEffect, useState, useRef } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import TextArea from "../components/textArea";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { sender } from "../store/room";
import { toDate } from "../services/toDate";
import { useSocket } from "../services/socketContext"


type AddSenderPayload = {
    id:string;
    textContent:string;
}
  

const Room = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const { room, auth } = useAppSelector<any>((state) => state);
  const [pageStatus, setPageStatus] = useState<Boolean>(false);
  const [chatData, setChatData] = useState<any>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [senderContent, setSenderContent] = useState<AddSenderPayload>({
      id:"",
      textContent: ""
    });


useEffect(()=>{
  if(!auth.isLoggedIn) window.location.href = "/login";
  else setPageStatus(true)
  if(id && socket) {
    socket.emit("joinRoom", { room: 'os_room', username: "emit" })
  }
},[auth, auth.isLoggedIn, id, navigate, socket])  

  useEffect(()=>{
    socket.on("chatData", (data:any) => {
      setChatData(data);
    })
},[socket, id])

useEffect(() => {
  socket.on("receivedMessage", (data:any) => {
      console.log(data, "sendMessage socket")
      setChatData((prevData:any) => [...prevData, data]);
  })

  return function() {
    socket.off("receivedMessage");
  };
},[chatData, socket])   


  useEffect(()=>{
    console.log("pinging")
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[chatData])



  const sendingMessage = () => {
    dispatch(
        sender(senderContent)
    )

    console.log(senderContent, "SenderContent")
    socket.emit("sendMessage",{ 
      id: auth.user.id,
      message: senderContent 
    });
}

  if(!pageStatus) {
      return (
        <div className="flex flex-col items-center justify-center"></div>
      )
  }
  else {
  return (
    <main className="pb-6 flex flex-col fixed top-0 bottom-0 left-0 right-0">
      <div className="bg-[#373744]">
        <Header />
      </div>
      

      <section ref={chatContainerRef} className="pt-8 h-[80%] px-4 overflow-y-scroll">
        <div className="w-full md:max-w-[40%]">
            {
            chatData.length < 1?
              <>
                <div className="w-[80%]">
                  <div className="flex flex-row mt-4 mb-1">
                    <div className=" animate-pulse bg-[#32323e] w-[3rem] h-[3rem] mr-2 rounded-full"></div>
                    <div className="max-w-[70%] animate-pulsew-[80%] w-full h-[3rem] bg-[#32323e] p-2 rounded"></div>
                  </div>
                </div>

                <div className="w-[80%]">
                  <div className="flex flex-row mt-4 mb-1">
                    <div className=" animate-pulse bg-[#32323e] w-[3rem] h-[3rem] mr-2 rounded-full"></div>
                    <div className="max-w-[70%] animate-pulsew-[80%] w-full h-[3rem] bg-[#32323e] p-2 rounded"></div>
                  </div>
                </div>

                <div className="w-[80%]">
                  <div className="flex flex-row mt-4 mb-1">
                    <div className=" animate-pulse bg-[#32323e] w-[3rem] h-[3rem] mr-2 rounded-full"></div>
                    <div className="max-w-[70%] animate-pulsew-[80%] w-full h-[3rem] bg-[#32323e] p-2 rounded"></div>
                  </div>
                </div>
              </>
            :
            chatData.map((message:any)=>{
              return(
              <div className="w-[80%]" key={message._id}>
              <div className="flex flex-row mt-4 mb-8">
                <div
                  style={{
                    backgroundImage:!message.user?'url(https://res.cloudinary.com/dw86qaw6y/image/upload/v1672761044/myfavos/504-5040528_empty-profile-picture-png-transparent-png_rtjc4v.png)' : `url(${message.user.profilePic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-[3rem] h-[3rem] mr-2 rounded-full"
                ></div>
                <div style={{background: !message.user || auth.user.id !== message.user._id? "#7f7f7f":"#f14483"}} className="relative max-w-[70%] p-2 rounded">
                  <div className="text-[0.7rem]">{!message.user? "closed account":message.user.username}</div>
                  <div>{message.text}</div>
                  <span className="absolute bottom-[-20px] right-0 text-[0.7rem] text-gray-400">{toDate(message.timestamp).time}</span>
                </div>
              </div>
              
            </div>
            )})
          }

        </div>
      </section>

      <div className="bg-[#373744] px-4 pt-2 w-[100%]">
        <TextArea sendingMessage={sendingMessage} setSenderContent={setSenderContent} />
        <Footer/>
      </div>
    </main>
  );
  }
};

export default Room;
