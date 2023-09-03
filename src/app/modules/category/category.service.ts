import {  Category } from '@prisma/client';
import prisma from '../../../shared/prisma';


const createCategory = async (data: Category): Promise<Category> => {
    const result = await prisma.category.create({
        data,
        include: {
          books: true,
      }
    });
    return result;
};


const getAllCategory = async () => {
    const result = await prisma.category.findMany()
    return {
      data: result,
      include: {
        books: true,
    }
    }
};


//Get Single User Service
const getSingleCategory = async (
    id: string
  ): Promise<Category | null> => {
    const result = await prisma.category.findUnique({
                where: {
                    id
                },
                include: {
                  books: true,
              }
            });
            return result;
  }
  
  
  //Update User Service
  const updateCategory = async (
    id: string,
    payload: Partial<Category>
  ): Promise<Category | null> => {
    const result = await prisma.category.update({
                where: {
                    id
                },
                include: {
                  books: true,
              },
                data: payload,
            });
            return result;
  }
  
  
  //Delete User Service
  const deleteCategory = async (
    id: string
  ): Promise<Category | null> => {
    const result = await prisma.category.delete({
                where: {
                    id
                },
                include: {
                  books: true,
              }
            })
            return result;
  }
  
  
  
 
  export const CategoryService = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
  }