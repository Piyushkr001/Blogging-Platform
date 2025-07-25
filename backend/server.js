const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// DB + Server
  const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server @ http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB error:', err));
