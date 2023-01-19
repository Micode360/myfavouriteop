import express from 'express'
import cors from 'cors'
const app = express()
import mainBase from './config/base'
import authRoute from './routes/auth'
import privateRoute from './routes/private'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "./types/socketTypes"
import room from "./controllers/room"
import { Authorization } from './middlewares/socketPrivate'
import RoomModel from "./models/room"


mainBase()
dotenv.config()

app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.set('view engine', 'pug')

/*Using routes*/
app.use('/auth', authRoute)
app.use('/os', privateRoute)

const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})



// Socket IO Logics

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  server,
  {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST']
    },
    path: '/socket.io',
    serveClient: true,
    pingInterval: 10000,
    pingTimeout: 5000,
  }
)

//Establishing headers
io.use(Authorization);


io.on('connection', socket => {
  console.log(socket.id, "connection");
  room(io, socket);       
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
