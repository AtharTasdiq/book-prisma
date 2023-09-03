import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';
import { Book } from '@prisma/client';
import { bookFilterableFields } from './book.constant';
import pick from '../../../shared/pick';


const createBook = catchAsync(async (req: Request, res: Response) => {
    const data = await BookService.createBook(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book created successfully!',
        data: data
    });
});

//Get All User Controller
const getAllBook = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder', 'minPrice', 'maxPrice']);
    const result = await BookService.getAllBook(filters, options)
  
    sendResponse<Book[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book fetched successfully',
      data: result.data,
    })
  })
  
  
  //Get Single User Controller
  const getSingleBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BookService.getSingleBook(id)
  
    sendResponse<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book fetched successfully',
      data: result,
    })
  })
  
  
  //Update User Controller
  const updateBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BookService.updateBook(id, req.body)
  
    sendResponse<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book updated successfully',
      data: result,
    })
  })
  
  
  //Delete User Controller
  const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await BookService.deleteBook(id)
  
    sendResponse<Book>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully',
      data: result,
    })
  })
  
  
  
  
  export const BookController = {
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook,
  }