import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { UserProfileService } from '../userprofile/userprofile.service';

// const createOrder = catchAsync(async (req: Request, res: Response) => {
   
//     const result = await OrderService.createOrder(req.body);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Book created successfully!',
//         data: result
//     });
// });


const createOrder = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const {userId} = await UserProfileService.userProfile(refreshToken)

  if (!userId) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Unauthorized',
    });
  }

  // Add the user ID to the order data before creating it
  req.body.userId = userId;

  const result = await OrderService.createOrder(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});



//Get All Order
const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const token = await UserProfileService.userProfile(refreshToken)

    const result = await OrderService.getAllOrder(token)
  
    sendResponse<Order[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order fetched successfully',
      data: result.data,
    })
  })
  
  
  //Get Single Order Controller
  const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const {userId} = await UserProfileService.userProfile(refreshToken)
    const result = await OrderService.getSingleOrder(userId)

    //const result = await OrderService.getSingleOrder(orderId)
  
    sendResponse<Order>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order fetched successfully',
      // data: result,
    })
  })

 
export const OrderController = {
  createOrder,
  getSingleOrder,
  getAllOrder

}