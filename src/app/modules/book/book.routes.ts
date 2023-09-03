import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();


router.post('/create-book',validateRequest(BookValidation.create), auth(ENUM_USER_ROLE.ADMIN),BookController.createBook);

router.get('/', BookController.getAllBook)

router.get('/:id', BookController.getSingleBook)

router.patch('/:id',validateRequest(BookValidation.update),auth(ENUM_USER_ROLE.ADMIN),BookController.updateBook)

router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook)

export const BookRoutes = router;