const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const otpStore = new Map(); // In-memory OTP storage

// JWT creation
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Setup Nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify transporter (optional for debugging)
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ Email transporter failed:', err);
  } else {
    console.log('✅ Email transporter ready');
  }
});

// ================== REGISTER ==================
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role });

    const token = createToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Register Error:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// ================== LOGIN ==================
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: 'Invalid credentials (user not found)' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials (wrong password)' });

    const token = createToken(user._id, user.role);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// ================== SEND OTP ==================
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'OTP for Password Reset',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('OTP Mail Error:', err.message);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// ================== VERIFY OTP ==================
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (!stored) return res.status(400).json({ message: 'OTP expired or not found' });
  if (Date.now() > stored.expires) {
    otpStore.delete(email);
    return res.status(400).json({ message: 'OTP expired' });
  }
  if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

  res.status(200).json({ message: 'OTP verified successfully' });
};

// ================== RESET PASSWORD ==================
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword)
    return res.status(400).json({ message: 'Email and new password required' });

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    otpStore.delete(email);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset Error:', err.message);
    res.status(500).json({ message: 'Error resetting password' });
  }
};
