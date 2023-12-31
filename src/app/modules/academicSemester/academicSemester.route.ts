import express from 'express';
import validatedRequest from '../../middlewares/validationRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();
router.post(
  '/create-semester',
  validatedRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemesters);
router.patch(
  '/:id',
  validatedRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
);

export const AcademicSemesterRouter = router;
