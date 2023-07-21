import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { users } = req.body
    const result = await usersService.createUser(users)
    res.status(200).send({
      success: true,
      message: 'user Created Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
export default {
  createUser,
}
