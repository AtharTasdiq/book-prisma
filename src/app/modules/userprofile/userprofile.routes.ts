import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UserProfileController } from './userprofile.controller';
const router = express.Router();


router.get('/profile',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER), UserProfileController.userProfile)



export const UserProfileRoutes = router;