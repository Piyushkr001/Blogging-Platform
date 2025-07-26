const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String }, // Made optional for Google login
  role:      { type: String, enum: ['user', 'admin'], default: 'user' },
  isGoogleUser: { type: Boolean, default: false }, // ✅ Google login flag
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
