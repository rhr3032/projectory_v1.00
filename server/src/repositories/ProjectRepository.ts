import { v4 as uuidv4 } from 'uuid';
import { Project, UIUXProject, WebDevelopmentProject, MobileAppProject } from '../types/Project';
import { createError } from '../middleware/errorHandler';

export interface ProjectFilters {
  status?: string;
  priority?: string;
  type?: string;
  clientId?: string;
}

export interface ProjectQueryOptions {
  page?: number;
  limit?: number;
  filters?: ProjectFilters;
}

export class ProjectRepository {
  private static projects: (Project | UIUXProject | WebDevelopmentProject | MobileAppProject)[] = [
    {
      id: uuidv4(),
      name: 'E-commerce Mobile App',
      description: 'Mobile app for online shopping with cart and payment integration',
      problemStatement: 'Traditional e-commerce platforms lack mobile optimization',
      solutionOverview: 'Native mobile app with modern UI/UX and seamless checkout',
      businessStrategy: 'Increase mobile sales by 40% through dedicated app experience',
      objectives: [
        'Design intuitive user interface',
        'Implement secure payment processing',
        'Optimize for performance'
      ],
      successMetrics: [
        '50% increase in mobile conversions',
        '90% user satisfaction score',
        '<2s app load time'
      ],
      expectedOutcomes: [
        'Improved customer engagement',
        'Higher average order value',
        'Reduced cart abandonment'
      ],
      category: 'MOBILE_APP',
      tags: ['mobile', 'ecommerce', 'react-native'],
      startDate: new Date('2024-01-15'),
      expectedEndDate: new Date('2024-06-30'),
      clientDeadline: new Date('2024-07-15'),
      priority: 'HIGH',
      status: ['DEVELOPMENT'],
      effortEstimation: 'L',
      projectType: 'NEW_PRODUCT',
      devices: ['MOBILE', 'TABLET'],
      clientId: uuidv4(),
      assignedTeam: ['team-1'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Banking Dashboard Redesign',
      description: 'Redesign of admin dashboard for banking operations',
      problemStatement: 'Current dashboard is outdated and hard to navigate',
      solutionOverview: 'Modern dashboard with improved data visualization',
      businessStrategy: 'Improve operational efficiency through better data insights',
      objectives: [
        'Create intuitive navigation',
        'Implement real-time data visualization',
        'Ensure accessibility compliance'
      ],
      successMetrics: [
        '30% reduction in task completion time',
        '95% user satisfaction',
        '100% accessibility compliance'
      ],
      expectedOutcomes: [
        'Faster decision making',
        'Reduced training time',
        'Better data insights'
      ],
      category: 'UI_UX',
      tags: ['dashboard', 'ui-ux', 'banking'],
      startDate: new Date('2024-02-01'),
      expectedEndDate: new Date('2024-05-31'),
      clientDeadline: new Date('2024-06-15'),
      priority: 'MEDIUM',
      status: ['HIGH_FIDELITY_DESIGN'],
      effortEstimation: 'M',
      projectType: 'REDESIGN',
      devices: ['DESKTOP', 'LAPTOP'],
      clientId: uuidv4(),
      assignedTeam: ['team-2'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  static async findAll(options: ProjectQueryOptions = {}) {
    const { page = 1, limit = 10, filters } = options;
    let filteredProjects = [...this.projects];

    // Apply filters
    if (filters) {
      if (filters.status) {
        filteredProjects = filteredProjects.filter(p => p.status.includes(filters.status!));
      }
      if (filters.priority) {
        filteredProjects = filteredProjects.filter(p => p.priority === filters.priority);
      }
      if (filters.type) {
        filteredProjects = filteredProjects.filter(p => p.category === filters.type);
      }
      if (filters.clientId) {
        filteredProjects = filteredProjects.filter(p => p.clientId === filters.clientId);
      }
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return {
      projects: paginatedProjects,
      total: filteredProjects.length,
      page,
      totalPages: Math.ceil(filteredProjects.length / limit),
      hasNext: endIndex < filteredProjects.length,
      hasPrev: page > 1
    };
  }

  static async findById(id: string): Promise<Project | null> {
    return this.projects.find(p => p.id === id) || null;
  }

  static async create(projectData: any): Promise<Project> {
    const project: Project = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.projects.push(project);
    return project;
  }

  static async update(id: string, updateData: Partial<Project>): Promise<Project | null> {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) return null;

    this.projects[projectIndex] = {
      ...this.projects[projectIndex],
      ...updateData,
      updatedAt: new Date()
    };
    return this.projects[projectIndex];
  }

  static async delete(id: string): Promise<boolean> {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) return false;

    this.projects.splice(projectIndex, 1);
    return true;
  }

  static async getProjectTasks(projectId: string) {
    // Mock implementation - in real app, query Task model
    return [
      {
        id: uuidv4(),
        name: 'Create wireframes',
        description: 'Design initial wireframes for mobile app',
        projectId,
        assigneeId: 'user-1',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        dueDate: new Date('2024-03-15'),
        labels: ['design', 'wireframes'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getProjectResources(projectId: string) {
    // Mock implementation
    return [
      {
        id: uuidv4(),
        title: 'Design System Guidelines',
        url: 'https://example.com/design-system',
        category: 'DOCUMENTATION',
        description: 'Official design system documentation',
        projectId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  static async getProjectFiles(projectId: string) {
    // Mock implementation
    return [
      {
        id: uuidv4(),
        name: 'wireframes.sketch',
        size: 2048576,
        type: 'application/octet-stream',
        url: '/files/wireframes.sketch',
        projectId,
        uploadedAt: new Date(),
        uploadedBy: 'user-1'
      }
    ];
  }

  static async getProjectTimeline(projectId: string) {
    // Mock implementation
    return [
      {
        id: uuidv4(),
        projectId,
        name: 'Project Kickoff',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-15'),
        type: 'milestone',
        completed: true
      },
      {
        id: uuidv4(),
        projectId,
        name: 'Design Phase',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-04-30'),
        type: 'phase',
        completed: false
      }
    ];
  }

  static async updateStatus(id: string, status: string[]): Promise<Project | null> {
    const project = await this.findById(id);
    if (!project) return null;

    project.status = status;
    project.updatedAt = new Date();

    const projectIndex = this.projects.findIndex(p => p.id === id);
    this.projects[projectIndex] = project;

    return project;
  }

  static async clone(id: string): Promise<Project> {
    const originalProject = await this.findById(id);
    if (!originalProject) {
      throw createError('Project not found', 404);
    }

    const clonedProject = {
      ...originalProject,
      id: uuidv4(),
      name: `${originalProject.name} (Clone)`,
      status: ['BACKLOG'],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.projects.push(clonedProject);
    return clonedProject;
  }
}