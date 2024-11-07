import { Request,Response, NextFunction } from "express";
import pino from "pino";
import { Server } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./secrets"; 

let io:Server | null= null;

export const logger = pino({
    transport:{
        target:'pino/file',
        options:{ destination: './logs/backend.log', mkdir:true},
    },
    level:'info',
    formatters:{
        log:({ methods, url, statusCode, responseTime, username}) => {
            return { methods, url, statusCode, responseTime, username}
        },
    },
});

// Function to initialize Socket.IO in the logger module
export const setLoggerSocket = (socketServer: Server) => {
  io = socketServer;
};

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    // Start time for response time calculation
    const start = Date.now();
    let username = '';

    if (req.url === "/api/user/login" && req.body.username) {
        username = req.body.username; // Use username from request body during login
    } else if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
                username = decoded.username; // Use username from token
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }

      
    // // Log request details
    // logger.info({ methods: req.method, url: req.url, username });
  
    // // On response finish, calculate and log response details
    // res.on('finish', () => {
    //   const responseTime = Date.now() - start;
      
    //   const log = {
    //     methods: req.method,
    //     url: req.url,
    //     statusCode: res.statusCode,
    //     responseTime: `${responseTime}ms`,
    //     username
    //   };
    //   logger.info(log);

    //   if (io) {
    //     io.emit('new_log', log);
        
    // }
    // });

     // Initial log of request details
     const requestLog = {
        methods: req.method,
        url: req.url,
        username,
        timestamp: new Date().toISOString(),
    };
    logger.info(requestLog);

    // Emit the initial request log to the frontend if connected
    if (io) {
        io.emit('new_log', requestLog);
    }

    // On response finish, calculate and log response details
    res.on('finish', () => {
        const responseTime = Date.now() - start;

        // Log response details, appending to the initial request log
        const responseLog = {
            ...requestLog, // Spread initial request log details
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
        };
        logger.info(responseLog );

        // Emit the response log to the frontend if connected
        if (io) {
            io.emit('new_log', responseLog );
        }
    });

    next();
  };




