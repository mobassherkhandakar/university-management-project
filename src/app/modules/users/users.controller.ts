import { Request, Response } from 'express';
import { UserService } from './users.service';
import catchAsync from '../../../shared/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { users } = req.body;
  const result = await UserService.createUser(users);
  res.status(200).send({
    success: true,
    message: 'user Created Successfully',
    data: result,
  });
});
export const UserController = {
  createUser,
};
