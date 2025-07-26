// controllers/googleAuthController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.googleLogin = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({ message: 'Missing email or username' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        role: 'user',
        isGoogleUser: true,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

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
    console.error('Google Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
