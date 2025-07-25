const express = require('express');
const {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  resetPassword,
} = require('../controllers/authController');
const { googleLogin } = require('../controllers/googleAuthController'); // ✅ Import Google login

const router = express.Router();

// ==================== AUTH ROUTES ====================
router.post('/register', registerUser);         // Register new user
router.post('/login', loginUser);               // Login with role check
router.post('/google-login', googleLogin);      // ✅ Google login route

// ==================== OTP + PASSWORD RESET ROUTES ====================
router.post('/send-otp', sendOtp);              // Send OTP to email
router.post('/verify-otp', verifyOtp);          // Verify OTP
router.post('/reset-password', resetPassword);  // Reset password after OTP

module.exports = router;
