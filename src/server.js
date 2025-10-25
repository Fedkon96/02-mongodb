import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Global middleware
app.use(logger); // pino-http logger
app.use(express.json());
app.use(cors());

// Routes
app.use(notesRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (last)
app.use(errorHandler);

const start = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
