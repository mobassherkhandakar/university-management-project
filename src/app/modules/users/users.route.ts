import express from 'express'
import { UserController } from './users.controller'
import validatedRequest from '../../../middlewares/validationRequest'
import { UserValidation } from './users.validation'

const router = express.Router()
router.post(
  '/create-user',
  validatedRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
)

export const UserRoute = router
