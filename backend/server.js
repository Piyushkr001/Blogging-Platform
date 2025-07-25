const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Update with your frontend URL in production
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection + Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process on DB failure
  });
