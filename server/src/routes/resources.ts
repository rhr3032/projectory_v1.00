import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { createError, asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Get all resources
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isIn(['RESEARCH', 'INSPIRATION', 'DOCUMENTATION', 'ASSETS', 'COMPETITOR', 'MEETING_NOTES', 'REFERENCES', 'OTHERS']),
  query('projectId').optional().isUUID()
], asyncHandler(async (req, res) => {
  res.json({
    resources: [],
    total: 0,
    page: Number(req.query.page || 1),
    totalPages: 0
  });
}));

// Get resource by ID
router.get('/:id', asyncHandler(async (req, res) => {
  res.json({
    id: req.params.id,
    title: 'Sample Resource',
    url: 'https://example.com/resource',
    category: 'DOCUMENTATION',
    description: 'Resource description',
    createdAt: new Date(),
    updatedAt: new Date()
  });
}));

// Create new resource
router.post('/', [
  body('title').notEmpty().withMessage('Resource title is required'),
  body('url').isURL().withMessage('Valid URL is required'),
  body('category').isIn(['RESEARCH', 'INSPIRATION', 'DOCUMENTATION', 'ASSETS', 'COMPETITOR', 'MEETING_NOTES', 'REFERENCES', 'OTHERS']).withMessage('Invalid category'),
  body('description').notEmpty().withMessage('Resource description is required')
], asyncHandler(async (req, res) => {
  const resource = {
    id: 'resource-id',
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  res.status(201).json(resource);
}));

// Update resource
router.put('/:id', [
  body('title').optional().notEmpty().withMessage('Resource title cannot be empty'),
  body('url').optional().isURL().withMessage('Valid URL is required'),
  body('category').optional().isIn(['RESEARCH', 'INSPIRATION', 'DOCUMENTATION', 'ASSETS', 'COMPETITOR', 'MEETING_NOTES', 'REFERENCES', 'OTHERS']).withMessage('Invalid category')
], asyncHandler(async (req, res) => {
  res.json({
    id: req.params.id,
    ...req.body,
    updatedAt: new Date()
  });
}));

// Delete resource
router.delete('/:id', asyncHandler(async (req, res) => {
  res.json({ message: 'Resource deleted successfully' });
}));

export default router;