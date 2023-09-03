import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { User } from "@prisma/client";
import { UserProfileService } from "./userprofile.service";
import { UserService } from "../user/user.service";

 //User Profile
 const userProfile = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const {userId} = await UserProfileService.userProfile(refreshToken)
    const result = await UserService.getSingleUser(userId)

  
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Profile successfully',
      data: result,
    })
  })


  export const UserProfileController = {
    userProfile,
  }