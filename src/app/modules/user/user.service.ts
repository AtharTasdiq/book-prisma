import {  User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';


const createUser = async (data: User): Promise<User> => {
    const result = await prisma.user.create({
        data,
    });
    return result;
};


const getAllUsers = async () => {
    const result = await prisma.user.findMany()
    return {
      data: result,
    }
};


//Get Single User Service
const getSingleUser = async (
    id: string
  ): Promise<User | null> => {
    const result = await prisma.user.findUnique({
                where: {
                    id
                }
            });
            return result;
  }
  
  
  //Update User Service
  const updateUser = async (
    id: string,
    payload: Partial<User>
  ): Promise<User | null> => {
    const result = await prisma.user.update({
                where: {
                    id
                },
                data: payload,
            });
            return result;
  }
  
  
  //Delete User Service
  const deleteUser = async (
    id: string
  ): Promise<User | null> => {
    const result = await prisma.user.delete({
                where: {
                    id
                },
            })
            return result;
  }


  
  //User Profile
  const userProfile =async (token : string) =>{
    const verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    return verifiedToken;
  }

  
  
 
  export const UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    userProfile,
  }
  
