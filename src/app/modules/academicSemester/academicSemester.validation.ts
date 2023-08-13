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
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...(academicSemesterTitles as [string, ...string[]])], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...(academicSemesterCodes as [string, ...string[]])], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...(academicSemesterMonths as [string, ...string[]])], {
          required_error: 'Start Month is required',
        })
        .optional(),
      endMonth: z
        .enum([...(academicSemesterMonths as [string, ...string[]])], {
          required_error: 'Start Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.title),
    {
      message: 'Entries Eider both Neither nothing',
    },
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
