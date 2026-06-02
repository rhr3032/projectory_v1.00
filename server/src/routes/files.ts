import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { createError, asyncHandler } from '../middleware/errorHandler';
import multer from 'multer';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'video/mp4'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Upload file
router.post('/upload', upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    throw createError('No file uploaded', 400);
  }

  const file = {
    id: 'file-id',
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype,
    url: `/files/${req.file.originalname}`,
    projectId: req.body.projectId || null,
    uploadedAt: new Date(),
    uploadedBy: req.user!.id
  };

  res.status(201).json(file);
}));

// Get files
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('projectId').optional().isUUID(),
  query('type').optional().isIn(['pdf', 'docx', 'xlsx', 'pptx', 'png', 'jpg', 'svg', 'mp4'])
], asyncHandler(async (req, res) => {
  res.json({
    files: [],
    total: 0,
    page: Number(req.query.page || 1),
    totalPages: 0
  });
}));

// Get file by ID
router.get('/:id', asyncHandler(async (req, res) => {
  res.json({
    id: req.params.id,
    name: 'sample.pdf',
    size: 2048576,
    type: 'application/pdf',
    url: '/files/sample.pdf',
    projectId: 'project-id',
    uploadedAt: new Date(),
    uploadedBy: 'user-id'
  });
}));

// Download file
router.get('/:id/download', asyncHandler(async (req, res) => {
  // Mock implementation
  res.download('/files/sample.pdf');
}));

// Delete file
router.delete('/:id', asyncHandler(async (req, res) => {
  res.json({ message: 'File deleted successfully' });
}));

// Create file version
router.post('/:id/versions', [
  body('comment').optional().isString()
], asyncHandler(async (req, res) => {
  const version = {
    id: 'version-id',
    fileId: req.params.id,
    version: 1,
    url: '/files/sample_v1.pdf',
    comment: req.body.comment,
    createdAt: new Date(),
    createdBy: req.user!.id
  };

  res.status(201).json(version);
}));

// Get file versions
router.get('/:id/versions', asyncHandler(async (req, res) => {
  res.json({
    versions: []
  });
}));

export default router;