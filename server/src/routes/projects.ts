import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { createError, asyncHandler } from '../middleware/errorHandler';
import { requireRole } from '../middleware/auth';

const router = Router();

// Get all projects
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['BACKLOG', 'DISCOVERY', 'DEVELOPMENT', 'COMPLETED', 'ON_HOLD', 'CANCELLED']),
  query('priority').optional().isIn(['CRITICAL', 'HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST']),
  query('type').optional().isIn(['UI_UX', 'WEB_DEVELOPMENT', 'MOBILE_APP']),
  query('clientId').optional().isUUID()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { page = 1, limit = 10, status, priority, type, clientId } = req.query;
  const projects = await ProjectRepository.findAll({
    page: Number(page),
    limit: Number(limit),
    filters: { status, priority, type, clientId }
  });

  res.json(projects);
}));

// Get project by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const project = await ProjectRepository.findById(req.params.id);
  if (!project) {
    throw createError('Project not found', 404);
  }
  res.json(project);
}));

// Create new project
router.post('/', [
  body('name').notEmpty().withMessage('Project name is required'),
  body('description').notEmpty().withMessage('Project description is required'),
  body('category').isIn(['UI_UX', 'WEB_DEVELOPMENT', 'MOBILE_APP']).withMessage('Invalid project category'),
  body('clientId').isUUID().withMessage('Valid client ID is required'),
  body('priority').isIn(['CRITICAL', 'HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST']).withMessage('Invalid priority'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('expectedEndDate').isISO8601().withMessage('Invalid expected end date'),
  body('clientDeadline').isISO8601().withMessage('Invalid client deadline')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const projectData = req.body;
  const project = await ProjectRepository.create(projectData);

  res.status(201).json(project);
}));

// Update project
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Project name cannot be empty'),
  body('description').optional().notEmpty().withMessage('Project description cannot be empty'),
  body('status').optional().isArray().withMessage('Status must be an array'),
  body('priority').optional().isIn(['CRITICAL', 'HIGHEST', 'HIGH', 'MEDIUM', 'LOW', 'LOWEST']).withMessage('Invalid priority')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const project = await ProjectRepository.update(req.params.id, req.body);
  if (!project) {
    throw createError('Project not found', 404);
  }

  res.json(project);
}));

// Delete project
router.delete('/:id', requireRole(['SUPER_ADMIN', 'ADMIN']), asyncHandler(async (req, res) => {
  const success = await ProjectRepository.delete(req.params.id);
  if (!success) {
    throw createError('Project not found', 404);
  }

  res.json({ message: 'Project deleted successfully' });
}));

// Get project tasks
router.get('/:id/tasks', asyncHandler(async (req, res) => {
  const tasks = await ProjectRepository.getProjectTasks(req.params.id);
  res.json(tasks);
}));

// Get project resources
router.get('/:id/resources', asyncHandler(async (req, res) => {
  const resources = await ProjectRepository.getProjectResources(req.params.id);
  res.json(resources);
}));

// Get project files
router.get('/:id/files', asyncHandler(async (req, res) => {
  const files = await ProjectRepository.getProjectFiles(req.params.id);
  res.json(files);
}));

// Get project timeline
router.get('/:id/timeline', asyncHandler(async (req, res) => {
  const timeline = await ProjectRepository.getProjectTimeline(req.params.id);
  res.json(timeline);
}));

// Update project status
router.patch('/:id/status', [
  body('status').isArray().withMessage('Status must be an array'),
  body('status').custom((value) => {
    const validStatuses = ['BACKLOG', 'DISCOVERY', 'DEVELOPMENT', 'COMPLETED', 'ON_HOLD', 'CANCELLED'];
    return value.every((s: string) => validStatuses.includes(s));
  }).withMessage('Invalid status values')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const project = await ProjectRepository.updateStatus(req.params.id, req.body.status);
  if (!project) {
    throw createError('Project not found', 404);
  }

  res.json(project);
}));

// Clone project
router.post('/:id/clone', asyncHandler(async (req, res) => {
  const project = await ProjectRepository.clone(req.params.id);
  if (!project) {
    throw createError('Project not found', 404);
  }

  res.status(201).json(project);
}));

export default router;