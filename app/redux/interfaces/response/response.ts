export interface GenericResponse<T> {
  data: T;
}

export interface GenericPaginationResponse<T> {
  code: number;
  data: {
    currentPage: number;
    currentPageSize: number;
    firstPage: boolean;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    lastPage: boolean;
    totalElements: number;
    totalPages: number;
    data: T;
  };
  status: string;
}
