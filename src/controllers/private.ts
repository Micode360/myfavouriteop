import User from '../models/user'

const toPercentage = (totalUsers: number, specificUsers: number) =>
  Math.round((specificUsers / totalUsers) * 100)

const filterOsUsers = (user: any, os: string) => {
  const totalUsers = user.length
  const userSet = user.filter((item: any) => item.favOS === os)
  return { percentage: toPercentage(totalUsers, userSet.length), length: userSet.length }
}

export const Darshboard = async (req: any, res: any, next: any) => {
  const user = await User.find()

  try {
    const result = [
      {
        name: 'mac',
        users: filterOsUsers(user, 'mac').length,
        percentageVal: filterOsUsers(user, 'mac').percentage,
      },
      {
        name: 'windows',
        users: filterOsUsers(user, 'windows').length,
        percentageVal: filterOsUsers(user, 'windows').percentage,
      },
      {
        name: 'linux',
        users: filterOsUsers(user, 'linux').length,
        percentageVal: filterOsUsers(user, 'linux').percentage,
      },
    ]

    res.status(200).json(result)
  } catch (e) {
    res.status(400).json('Error')
  }

  next()
}
