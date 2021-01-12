import { Router } from 'express';
import CourseController from './../controllers/course';
import Validation from './../validation/index';
import { authenticate } from './../utils/authStatus';
import ifCourseExists from '../utils/isCourseExist';

const routes = Router();

routes.post('/',
  authenticate,
  Validation.checkBodyContains('course_name'),
  Validation.trimsRequestBody,
  ifCourseExists,
  CourseController.createCourse
);

routes.get('/',
  authenticate,
  CourseController.getAllCourses
);

routes.delete('/:courseId',
  authenticate,
  CourseController.deleteCourse
);

routes.put('/:courseId',
  authenticate,
  Validation.trimsRequestBody,
  CourseController.updateCourse
);

export default routes;
