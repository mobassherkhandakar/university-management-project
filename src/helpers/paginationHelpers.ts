type IOption = {
  page?: number;
  limit?: number;
};
type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
};
const calculatePagination = (option: IOption): IOptionResult => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 1);
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
