import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Images } from '../utils/defaultImages'

interface UserStructure {
  username: string
  favOS: string
  profilePic: string
  status: string
  password: string
  compareToMatchPasswords: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<UserStructure>(
  {
    username: {
      type: String,
      required: true,
    },
    favOS: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minLength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

/*
.pre runs a certain function to the user object before it 
gets saved, deleted update and so on this one is save
*/

UserSchema.pre('save', async function (this: any, next: any) {
  if (!this.isModified('password')) next()

  const salt = await bcrypt.genSalt(15)
  this.password = await bcrypt.hash(this.password, salt)
  this.profilePic = Images[`${this.favOS as string}`]
  next()
})

UserSchema.methods.compareToMatchPasswords = async function (password: any) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedInToken = function () {
  return jwt.sign({ 
    id: this._id, 
    username: this.username, 
    favOS: this.favOS ,
    profilePic: !this.profilePic || this.profilePic === ""? Images[`${this.favOS as string}`]: this.profilePic
  }, process.env.JWT_SECRET as string, {})

}

const User = mongoose.model('User', UserSchema)

export default User
