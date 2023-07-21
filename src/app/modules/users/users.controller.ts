import { RequestHandler } from 'express'
import { UserService } from './users.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { users } = req.body
    const result = await UserService.createUser(users)
    res.status(200).send({
      success: true,
      message: 'user Created Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
export const UserController = {
  createUser,
}
