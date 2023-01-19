import User from '../models/user'


export const UserCheck = async (req: any, res: any, next: any) => {
  const username = req.params.user;

  const user = await User.findOne({ username });

  try {
    if(!user) {
      res.status(200).json({ message: "Your're good to go." })
    }else {
      res.status(400).json({ message: 'Username is already taken' })
    }
  }catch (error) {
    next(error)
 }
}


export const SignUp = async (req: any, res: any, next: any) => {
  const { username, password, favOS } = req.body;

  const user = await User.findOne({ username });


  if (!user) {
    try {
      const user = await User.create({
        username,
        password,
        favOS
      })

      sendToken(user, 201, res)
    } catch (error) {
      next(error)
    }
  } else if (user.username === username)
    return res.status(400).json({ message: 'Username is already taken' })
}

export const SignIn = async (req: any, res: any, next: any) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next(res.status(400).json({ message: 'Please provide username and password' }))
  }


  try {
    const user = await User.findOne({ username }).select('+password')
    if (!user) {
      return next(res.status(400).json({ message: 'Invalid username or password' }))
    }

    const isMatch = await user.compareToMatchPasswords(password)

    if (!isMatch) {
      return next(res.status(400).json({ message: 'Invalid username or password' }))
    }

    sendToken(user, 201, res)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    })
  }
}

const sendToken = (user: any, statusCode: any, res: any) => {
  const token = user.getSignedInToken()
  res.status(statusCode).json({ success: true, token })
}
