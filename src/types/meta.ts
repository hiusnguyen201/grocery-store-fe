export type MetaData = {
  page: number;
  limit: number;
  totalCount: number;
  offset: number;
  totalPage: number;
  isPrevious: boolean;
  isNext: boolean;
  previousUrl?: string;
  nextUrl?: string;
};
