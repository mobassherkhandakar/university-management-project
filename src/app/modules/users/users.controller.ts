import { RequestHandler } from 'express'
import { UserService } from './users.service'
import { z } from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })
    await createUserZodSchema.parseAsync(req)

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
