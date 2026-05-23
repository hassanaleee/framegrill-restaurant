import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Base Health Check Route
app.get('/', (req, res) => {
  res.json({ message: 'FlameGrill API is running successfully' });
});

// Connect to MongoDB Atlas & Start Server
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri || mongoUri.includes('<username>')) {
      console.warn('\n======================================================');
      console.warn('WARNING: MONGODB_URI is not set or has placeholders in server/.env.');
      console.warn('Please configure your database connection string to enable full database features.');
      console.warn('======================================================\n');
    } else {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB Atlas successfully.');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
