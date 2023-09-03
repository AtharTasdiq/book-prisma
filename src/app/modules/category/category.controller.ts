import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';


const createCategory = catchAsync(async (req: Request, res: Response) => {
    const data = await CategoryService.createCategory(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successfully!',
        data: data
    });
});

//Get All User Controller
const getAllCategory = catchAsync(async (req: Request, res: Response) => {

    const result = await CategoryService.getAllCategory()
  
    sendResponse<Category[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category fetched successfully',
      data: result.data,
    })
  })
  
  

  const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoryService.getSingleCategory(id)
  
    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category fetched successfully',
      data: result,
    })
  })
  

  const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoryService.updateCategory(id, req.body)
  
    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully',
      data: result,
    })
  })
  
  
  //Delete User Controller
  const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoryService.deleteCategory(id)
  
    sendResponse<Category>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully',
      data: result,
    })
  })
  
  
  
  
  export const CategoryController = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
  }