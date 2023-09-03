import {  Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (data: Order): Promise<{data: Order }> => {
    const result = await prisma.order.create({
      data: {
        ...data,
        orderedBooks: {
          create: data.orderedBooks, // Create ordered books with the provided data
        },
      },
      include: {
        orderedBooks: true, // Include ordered books in the response
      },
    });

    return {
      data: result,
    };
};




const getAllOrder = async (decodedToken:any) => {
    // const result = await prisma.order.findMany()
    // return {
    //   data: result,
    //   include: {
    //     user: true,
    // }
    // }
      let orders;
  
      if (decodedToken.role === 'admin') {
        // Admin can see all orders
        orders = await prisma.order.findMany({
          include: {
            user: true,
            orderedBooks: true, // Include ordered books if needed
          },
        });
      } else if (decodedToken.role === 'customer') {
        // Customers can only see their specific orders
        orders = await prisma.order.findMany({
          where: {
            userId: decodedToken.userId, // Filter orders by customer's user ID
          },
          include: {
            user: true,
            orderedBooks: true, // Include ordered books if needed
          },
        });
      } else {
        // Handle other roles if needed
        return {
          success: false,
          statusCode: 403, // Forbidden
          message: 'Unauthorized',
          data: null,
        };
      }
  
      return {
        success: true,
        statusCode: 200,
        message: 'Orders retrieved successfully',
        data: orders,
      };

    
};


// const getUser =async (token : string) =>{
//     const verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//     return verifiedToken;
//   }

// //Get Single User Service

const getSingleOrder = async (
    id: string
  )=> {
    const result = await prisma.order.findMany({
                where: {
                    id
                },
                include: {
                  user: true,
              }
            });
            return result;
  }

  export const OrderService = {
    createOrder,
    getAllOrder,
    getSingleOrder,
  }