import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/* 配置声明 */
export interface DefaultPagination {
  orderBy: string;
  minLimit: number;
  maxLimit: number;
  orderKey: 'DESC' | 'ASC';
}

/* 声明 */
export interface PaginationRequest {
  orderBy: string;
  pageSize: number;
  pageSkip: number;
  pageCount: number;
  orderKey: 'DESC' | 'ASC';
}

const defaultOptions: DefaultPagination = {
  minLimit: 10,
  maxLimit: 100,
  orderKey: 'DESC',
  orderBy: 'create_time',
};

/* 分页参数 */
export const PaginationParams = createParamDecorator((option: Partial<DefaultPagination> = {}, input: ExecutionContext): PaginationRequest => {
  const { minLimit, maxLimit, ...order } = Object.assign(defaultOptions, option) as DefaultPagination;
  const { query } = input.switchToHttp().getRequest();
  let { pageCount, pageSize, orderKey } = query;
  const { orderBy } = query;

  pageSize = ((size) => {
    return isNaN(size) ? minLimit : Math.min(Math.max(minLimit, +size), maxLimit);
  })(parseInt(pageSize || minLimit));

  pageCount = ((count) => {
    return isNaN(count) ? 1 : count;
  })(parseInt(pageCount || '1'));

  orderKey = ((key) => {
    return ['DESC', 'ASC'].includes(key) ? key : order.orderKey;
  })(orderKey || order.orderKey);

  return { pageSize, pageCount, orderKey, pageSkip: (pageCount - 1) * pageSize, orderBy: orderBy ? orderBy || order.orderBy : undefined };
});
