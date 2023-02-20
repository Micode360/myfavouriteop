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
import path from 'path'



mainBase()
dotenv.config()

app.use(express.json())


app.use(cors())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 5000;

app.set('view engine', 'pug')

/*Using routes*/
app.use('/auth', authRoute)
app.use('/os', privateRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname + '/client/build/index.html')));
}

const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})



// Socket IO Logics

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  server,
  {
    cors: {
      origin: process.env.PATH as string,
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

// in package.json: at "start": "start": "node -r ./bootstrap.js ./build/server.js",