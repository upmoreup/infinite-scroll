// 무한 스크롤 응답 인터페이스
export interface PaginationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

// 무한 스크롤 매개변수 인터페이스
export interface PaginationParams {
  page?: number;
  size: number;
}
