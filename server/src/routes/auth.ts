import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { UserModel } from '../models/User';
import { createError, asyncHandler } from '../middleware/errorHandler';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, rememberMe } = req.body;

  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw createError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createError('Invalid credentials', 401);
  }

  if (!user.isActive) {
    throw createError('Account is disabled', 401);
  }

  // Update last login
  await UserModel.updateLastLogin(user.id);

  // Create JWT token
  const token = jwt.sign(
    { user: { id: user.id, email: user.email, role: user.role } },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: rememberMe ? '7d' : '24h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar
    }
  });
}));

// Register
router.post('/register', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  body('role').isIn(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'MEMBER']).withMessage('Invalid role')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, role } = req.body;

  // Check if user already exists
  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    throw createError('User already exists', 400);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await UserModel.create({
    email,
    password: hashedPassword,
    name,
    role
  });

  // Generate token
  const token = jwt.sign(
    { user: { id: user.id, email: user.email, role: user.role } },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '24h' }
  );

  res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar
    }
  });
}));

// Get current user
router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user!.id);
  if (!user) {
    throw createError('User not found', 404);
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin
  });
}));

// Logout (client-side token invalidation)
router.post('/logout', authMiddleware, asyncHandler(async (req, res) => {
  // In a real app, you might want to add the token to a blacklist
  res.json({ message: 'Logged out successfully' });
}));

// Forgot password (placeholder)
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Please provide a valid email')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  // In a real app, send password reset email
  res.json({ message: 'Password reset email sent' });
}));

// Reset password (placeholder)
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // In a real app, validate token and update password
  res.json({ message: 'Password reset successful' });
}));

export default router;