import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { users } = req.body
    const result = await usersService.createUser(users)
    res.status(200).send({
      success: true,
      message: 'user Created Successfully',
      data: result,
    })
  } catch (err) {
    res.status(400).send({
      success: false,
      message: 'Failed to create user',
    })
  }
}
export default {
  createUser,
}
