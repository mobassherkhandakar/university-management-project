import express from 'express';
import { UserRoute } from '../modules/users/users.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
