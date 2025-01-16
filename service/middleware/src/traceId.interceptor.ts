import { Request } from 'express';
import * as uuid from 'uuid';

/* 拦截&验证 TraceId */
export function useTraceIdInterceptor(traceId = 'TraceId') {
  return function (req: Request, _: any, next: () => void) {
    const TraceId = req.headers[traceId];
    if (!TraceId || typeof TraceId !== 'string' || !uuid.validate(TraceId)) {
      req.headers[traceId] = uuid.v4();
    }
    next();
  };
}
