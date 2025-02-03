import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health Check
app.get('/', (req: Request, res: Response) => {  
  res.send('Hello world!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
