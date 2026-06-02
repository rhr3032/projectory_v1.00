import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { createError, asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Get all clients
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('type').optional().isIn(['EXISTING', 'NEW', 'REFERRAL'])
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Mock implementation
  res.json({
    clients: [
      {
        id: 'client-id-1',
        name: 'TechCorp Inc.',
        companyName: 'TechCorp Inc.',
        email: 'contact@techcorp.com',
        type: 'EXISTING',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    total: 1,
    page: Number(req.query.page || 1),
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  });
}));

// Get client by ID
router.get('/:id', asyncHandler(async (req, res) => {
  // Mock implementation
  res.json({
    id: req.params.id,
    name: 'TechCorp Inc.',
    companyName: 'TechCorp Inc.',
    email: 'contact@techcorp.com',
    phone: '+1 234 567 8900',
    whatsapp: '+1 234 567 8900',
    address: '123 Tech Street, Silicon Valley, CA',
    country: 'United States',
    website: 'https://techcorp.com',
    linkedIn: 'https://linkedin.com/company/techcorp',
    type: 'EXISTING',
    notes: 'Valued client with multiple ongoing projects',
    createdAt: new Date(),
    updatedAt: new Date()
  });
}));

// Create new client
router.post/', [
  body('name').notEmpty().withMessage('Client name is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('type').isIn(['EXISTING', 'NEW', 'REFERRAL']).withMessage('Invalid client type')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Mock implementation
  const client = {
    id: 'client-id-new',
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  res.status(201).json(client);
}));

// Update client
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Client name cannot be empty'),
  body('companyName').optional().notEmpty().withMessage('Company name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('type').optional().isIn(['EXISTING', 'NEW', 'REFERRAL']).withMessage('Invalid client type')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Mock implementation
  res.json({
    id: req.params.id,
    ...req.body,
    updatedAt: new Date()
  });
}));

// Delete client
router.delete('/:id', asyncHandler(async (req, res) => {
  // Mock implementation
  res.json({ message: 'Client deleted successfully' });
}));

export default router;