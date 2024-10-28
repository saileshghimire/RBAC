import { Response, NextFunction } from "express";
import pino from "pino";


export const logger = pino({
    transport:{
        target:'pino/file',
        options:{ destination: './logs/backend.log', mkdir:true},
    },
    level:'info',
    formatters:{
        log:({ methods, url, statusCode, responseTime}) => {
            return { methods, url, statusCode, responseTime}
        },
    },
});

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    // Start time for response time calculation
    const start = Date.now();
  
    // Log request details
    logger.info({ methods: req.method, url: req.url });
  
    // On response finish, calculate and log response details
    res.on('finish', () => {
      const responseTime = Date.now() - start;
      logger.info({
        methods: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`,
      });
    });
  
    next();
  };



//  using morgan...

