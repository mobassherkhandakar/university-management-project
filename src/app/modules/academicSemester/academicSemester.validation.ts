import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constens';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...(academicSemesterTitles as [string, ...string[]])], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum([...(academicSemesterCodes as [string, ...string[]])], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...(academicSemesterMonths as [string, ...string[]])], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...(academicSemesterMonths as [string, ...string[]])], {
      required_error: 'Start Month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
