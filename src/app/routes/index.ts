import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.routes';
import { BookRoutes } from '../modules/book/book.routes';
import { UserProfileRoutes } from '../modules/userprofile/userprofile.routes';
import { OrderRoutes } from '../modules/order/order.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/auth",
    route: UserRoutes
  },
  {
    path: "/users",
    route: UserRoutes
  },
  {
    path: "/",
    route: UserProfileRoutes
  },
  {
    path: "/categories",
    route: CategoryRoutes
  },
  {
    path: "/books",
    route: BookRoutes
  },
  {
    path: "/orders",
    route: OrderRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
