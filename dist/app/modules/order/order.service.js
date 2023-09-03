"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: Object.assign(Object.assign({}, data), { orderedBooks: {
                create: data.orderedBooks, // Create ordered books with the provided data
            } }),
        include: {
            orderedBooks: true, // Include ordered books in the response
        },
    });
    return {
        data: result,
    };
});
const getAllOrder = (decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
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
        orders = yield prisma_1.default.order.findMany({
            include: {
                user: true,
                orderedBooks: true, // Include ordered books if needed
            },
        });
    }
    else if (decodedToken.role === 'customer') {
        // Customers can only see their specific orders
        orders = yield prisma_1.default.order.findMany({
            where: {
                userId: decodedToken.userId, // Filter orders by customer's user ID
            },
            include: {
                user: true,
                orderedBooks: true, // Include ordered books if needed
            },
        });
    }
    else {
        // Handle other roles if needed
        return {
            success: false,
            statusCode: 403,
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
});
// const getUser =async (token : string) =>{
//     const verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//     return verifiedToken;
//   }
// //Get Single User Service
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        where: {
            id
        },
        include: {
            user: true,
        }
    });
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getSingleOrder,
};
