import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeDatabase } from './db/init';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const startServer = async () => {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
};

startServer();
