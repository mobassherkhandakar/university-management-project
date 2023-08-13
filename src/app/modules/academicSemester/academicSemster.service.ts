import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constens';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modal';
import { IPaginationOption } from '../../../interfaces/pagination';
import {
  IAcademicSemesterFilter,
  IGenericResponse,
} from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid input code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilter,
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTram } = filters;

  const searchTramField = ['title', 'year', 'code'];

  const andCondition = [];
  if (searchTram) {
    andCondition.push({
      $or: searchTramField.map(field => ({
        [field]: {
          $regex: searchTram,
          $options: 'i',
        },
      })),
    });
  }

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTram,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTram,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTram,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({ $and: andCondition })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
