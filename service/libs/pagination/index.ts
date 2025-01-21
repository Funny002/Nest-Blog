import { PaginationRequest } from './src/decorators';

/* 分页响应声明 */
export interface PaginationResponse<T = any> extends PaginationRequest {
  list: T[];
  total: number;
  maxPage?: number;
  hasNext: boolean;
  params: Record<string, any>;
}

/* 分页静态方法 */
export class Pagination {
  /* 响应分页参数补充 */
  static of<T = any>(page: PaginationRequest, params: Record<string, any>, total: number, list: T[]): PaginationResponse<T> {
    const { pageSize, pageCount } = page;

    const maxPage = Math.floor(total / pageSize) + (total % pageCount ? 1 : 0);

    return { ...page, params, total, list, hasNext: pageCount < maxPage, maxPage };
  }
}

export * from './src/decorators';
