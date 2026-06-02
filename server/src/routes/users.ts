import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { createError, asyncHandler, requireRole } from '../middleware/errorHandler';
import { UserModel } from '../models/User';

const router = Router();

// Get all users
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('role').optional().isIn(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'MEMBER'])
], requireRole(['SUPER_ADMIN', 'ADMIN']), asyncHandler(async (req, res) => {
  const users = await UserModel.findAll();
  res.json(users);
}));

// Get current user profile
router.get('/me', asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user!.id);
  if (!user) {
    throw createError('User not found', 404);
  }
  res.json(user);
}));

// Update user profile
router.put('/profile', [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required')
], asyncHandler(async (req, res) => {
  const updatedUser = await UserModel.update(req.user!.id, req.body);
  if (!updatedUser) {
    throw createError('User not found', 404);
  }
  res.json(updatedUser);
}));

// Change password
router.put('/change-password', [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], asyncHandler(async (req, res) => {
  // Mock implementation
  res.json({ message: 'Password changed successfully' });
}));

// Admin: Create new user
router.post('/', requireRole(['SUPER_ADMIN', 'ADMIN']), [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  body('role').isIn(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'MEMBER']).withMessage('Invalid role')
], asyncHandler(async (req, res) => {
  const user = await UserModel.create(req.body);
  res.status(201).json(user);
}));

// Admin: Update user
router.put('/:id', requireRole(['SUPER_ADMIN', 'ADMIN']), [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('role').optional().isIn(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'MEMBER']).withMessage('Invalid role'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
], asyncHandler(async (req, res) => {
  const user = await UserModel.update(req.params.id, req.body);
  if (!user) {
    throw createError('User not found', 404);
  }
  res.json(user);
}));

// Admin: Delete user
router.delete('/:id', requireRole(['SUPER_ADMIN', 'ADMIN']), asyncHandler(async (req, res) => {
  const success = await UserModel.delete(req.params.id);
  if (!success) {
    throw createError('User not found', 404);
  }
  res.json({ message: 'User deleted successfully' });
}));

export default router;