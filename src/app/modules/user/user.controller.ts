import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { User } from '@prisma/client';


const createUser = catchAsync(async (req: Request, res: Response) => {
    const {password, ...data} = await UserService.createUser(req.body);
    console.log(password)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully!',
        data: data
    });
});

//Get All User Controller
const getAllUsers = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.getAllUsers()
  
    sendResponse<User[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: result.data,
    })
  })
  
  
  //Get Single User Controller
  const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await UserService.getSingleUser(id)
  
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      data: result,
    })
  })
  
  
  //Update User Controller
  const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await UserService.updateUser(id, req.body)
  
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
    })
  })
  
  
  //Delete User Controller
  const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await UserService.deleteUser(id)
  
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
    })
  })


  //User Profile
  const userProfile = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const {userId} = await UserService.userProfile(refreshToken)
    const result = await UserService.getSingleUser(userId)

  
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Profile successfully',
      data: result,
    })
  })
  
  
  
  
  export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    userProfile,
  }