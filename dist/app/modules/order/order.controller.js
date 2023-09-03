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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const userprofile_service_1 = require("../userprofile/userprofile.service");
// const createOrder = catchAsync(async (req: Request, res: Response) => {
//     const result = await OrderService.createOrder(req.body);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Book created successfully!',
//         data: result
//     });
// });
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const { userId } = yield userprofile_service_1.UserProfileService.userProfile(refreshToken);
    if (!userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'Unauthorized',
        });
    }
    // Add the user ID to the order data before creating it
    req.body.userId = userId;
    const result = yield order_service_1.OrderService.createOrder(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully!',
        data: result,
    });
}));
//Get All Order
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const token = yield userprofile_service_1.UserProfileService.userProfile(refreshToken);
    const result = yield order_service_1.OrderService.getAllOrder(token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result.data,
    });
}));
//Get Single Order Controller
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const { userId } = yield userprofile_service_1.UserProfileService.userProfile(refreshToken);
    const result = yield order_service_1.OrderService.getSingleOrder(userId);
    //const result = await OrderService.getSingleOrder(orderId)
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        // data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getSingleOrder,
    getAllOrder
};
