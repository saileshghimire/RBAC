import express, { Request, Response, NextFunction} from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import cors from 'cors';
import { PORT } from './secrets';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middleware/error';
import rootrouter from './routes';
import { loggerMiddleware, setLoggerSocket } from './logger';
import { setupSocketServer } from './controller/socketServer';



const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", // exact origin
        credentials: true
    }
});

setLoggerSocket(io);
app.use(loggerMiddleware as any);

app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use('/api', rootrouter);

export const prisma = new PrismaClient();

app.get('/', (req: Request,res: Response)=>{
    res.json("Hello ..")
})

app.use(errorMiddleware);

setupSocketServer(io);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
