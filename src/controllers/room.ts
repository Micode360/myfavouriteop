import RoomModel from "../models/room"


export default (io:any, socket:any) => {

  socket.on("joinRoom", (data:any) => {
    const { room, username } = data;
      socket.join(room)

      socket.to(data.room).emit('joinRoom', {
        message: `${username} has joined the chat room`,
        username: 'CHAT_BOT',
      });

      RoomModel.find({})
      .populate({path: 'user'})
      .then((data:any)=>{
        socket.emit('chatData', data)
        return data;
    })
    
  })




  socket.on('sendMessage',async(message:any) => {

    try {
      const chat = await new RoomModel({
        user: message.id,
        text: message.message
      });
      chat.save((error, data) => {
        if (error) {
          console.log(error);
          throw error;
        } else {
          RoomModel.findOne({_id:data._id})
          .populate({path: 'user'})
          .then((data:any)=>{
            io.in('os_room').emit('receivedMessage', data)
        })
        }
      })
     }catch(err) {
        console.log(err, "err")
     }
  })

}


