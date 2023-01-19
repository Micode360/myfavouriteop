import jwt from 'jsonwebtoken'  // here because of socket.io
import User from '../models/user'


export const Authorization = (socket:any, next:any) => {
    let token:string;
  
    token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Unauthorized'));
    }
  
  
   // Verify the JWT
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded:any) => {
      if (err) {
        console.log(err, "Unauthorized")
        return next(new Error('Unauthorized'));
      }
  
      const user = User.findById(decoded.id)
      if (!user) return next(new Error('Unauthorized'))
      next();
   });
  }