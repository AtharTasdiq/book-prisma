import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();


router.post(
    '/signup',
    validateRequest(UserValidation.create),
    UserController.createUser
);

router.get('/profile',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER), UserController.userProfile)

router.get('/',auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers)

router.get('/:id',auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)

router.patch(
  '/:id',
  validateRequest(
    UserValidation.update
  ),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
)

router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)

export const UserRoutes = router;