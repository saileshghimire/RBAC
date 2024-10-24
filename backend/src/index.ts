import express, { Request, Response} from 'express';
import cors from 'cors';
import { PORT } from './secrets';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middleware/error';
import rootrouter from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use('/api', rootrouter);

export const prisma = new PrismaClient();

app.get('/', (req: Request,res: Response)=>{
    res.json("Hello ..")
})

app.use(errorMiddleware);

app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
  });