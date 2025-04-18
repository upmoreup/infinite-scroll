/**
 * 페이지네이션 응답 인터페이스
 */
export interface PaginationResponse<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

/**
 * 유저정보 인터페이스
 */
export interface User {
  id: number;
  name: string;
}
