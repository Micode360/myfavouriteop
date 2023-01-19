import jwt from 'jsonwebtoken'
import User from '../models/user'

export const protect = async (req: any, res: any, next: any) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Possessor')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to accesss this route' })
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)

    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ message: 'User not found' })

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to accesss this route' })
  }
}
