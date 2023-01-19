import mongoose, { Mixed } from 'mongoose'
const Schema = mongoose.Schema


interface RoomStructure {
  user: Mixed
  text: string
  image: string
  timestamp: {
    type: Function,
    required: boolean,
    default: Function,
  }
}

const RoomSchema = new Schema<RoomStructure>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)


const RoomModel = mongoose.model('RoomModel', RoomSchema)

export default RoomModel
