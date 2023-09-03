import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();


router.post('/create-category',validateRequest(CategoryValidation.create), auth(ENUM_USER_ROLE.ADMIN),CategoryController.createCategory);

router.get('/', CategoryController.getAllCategory)

router.get('/:id', CategoryController.getSingleCategory)

router.patch('/:id',validateRequest(CategoryValidation.update),auth(ENUM_USER_ROLE.ADMIN),CategoryController.updateCategory)

router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteCategory)

export const CategoryRoutes = router;