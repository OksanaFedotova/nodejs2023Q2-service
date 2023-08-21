import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { method, params, url } = req;
    res.on('close', () => {
      const { statusCode } = res;
      this.logger.log(
        `method: ${method}, params: ${JSON.stringify(
          params,
        )}, url: ${url}, statusCode: ${statusCode}`,
      );
    });
    if (next) next();
  }
}
