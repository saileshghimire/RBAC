import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { PORT } from './secrets';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middleware/error';
import rootrouter from './routes';
import { loggerMiddleware } from './logger';


const app = express();

app.use(express.json());
app.use(cors());
app.use(loggerMiddleware as any);

// Create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// app.use(morgan('combined', { stream: accessLogStream }));

// app.use(morgan('tiny'));
// app.disable('x-powered-by');
app.use('/api', rootrouter);

export const prisma = new PrismaClient();

app.get('/', (req: Request,res: Response)=>{
    res.json("Hello ..")
})

app.use(errorMiddleware);

app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
  });