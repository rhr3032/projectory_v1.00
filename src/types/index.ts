// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'MEMBER';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  problemStatement: string;
  solutionOverview: string;
  businessStrategy: string;
  objectives: string[];
  successMetrics: string[];
  expectedOutcomes: string[];
  thumbnail?: string;
  coverImage?: string;
  category: ProjectCategory;
  tags: string[];
  startDate: Date;
  expectedEndDate: Date;
  actualEndDate?: Date;
  clientDeadline: Date;
  priority: Priority;
  status: ProjectStatus[];
  effortEstimation: EffortSize;
  projectType: ProjectType;
  devices: Device[];
  clientId: string;
  assignedTeam: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Project specific types
export interface UIUXProject extends Project {
  figmaFileURL?: string;
  prototypeURL?: string;
  designSystemURL?: string;
  researchRepository?: string;
  userPersonaDocuments?: string[];
  journeyMaps?: string[];
  wireframes?: string[];
  designTokens?: Record<string, any>;
  colorSystem?: Record<string, string>;
  typographySystem?: Record<string, string>;
  componentLibrary?: string;
  usabilityReports?: string[];
  accessibilityReports?: string[];
  designHandoffNotes?: string;
  developerHandoffChecklist?: string[];
  designQANotes?: string;
  designVersionHistory?: DesignVersion[];
  designMaturityScore?: number;
}

export interface WebDevelopmentProject extends Project {
  repositoryURL?: string;
  frontendRepository?: string;
  backendRepository?: string;
  documentationURL?: string;
  deploymentURL?: string;
  stagingURL?: string;
  productionURL?: string;
  apiDocumentation?: string;
  postmanCollection?: string;
  swaggerURL?: string;
  environmentVariables?: Record<string, string>;
  techStack: TechStack;
  buildVersion?: string;
  releaseVersion?: string;
  ciCdStatus?: CI_CD_Status;
}

export interface MobileAppProject extends Project {
  platform: Platform;
  appStoreURL?: string;
  playStoreURL?: string;
  buildNumber?: string;
  versionNumber?: string;
  firebaseConfig?: Record<string, any>;
  crashlytics?: boolean;
  pushNotifications?: boolean;
  deepLinks?: string[];
  testFlightURL?: string;
  apkURL?: string;
  aabURL?: string;
  releaseNotes?: string;
  storeSubmissionStatus?: StoreSubmissionStatus;
  mobileAnalytics?: string;
}

// Client types
export interface Client {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  country?: string;
  website?: string;
  linkedIn?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  behance?: string;
  dribbble?: string;
  portfolioURL?: string;
  notes?: string;
  type: ClientType;
  createdAt: Date;
  updatedAt: Date;
}

// Task types
export interface Task {
  id: string;
  name: string;
  description: string;
  assigneeId: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: Date;
  labels: string[];
  attachments: Attachment[];
  timeEntries: TimeEntry[];
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Resource types
export interface Resource {
  id: string;
  title: string;
  url: string;
  category: ResourceCategory;
  description: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// File types
export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface FileVersion {
  id: string;
  fileId: string;
  version: number;
  url: string;
  comment?: string;
  createdAt: Date;
  createdBy: string;
}

// Enum types
export enum ProjectCategory {
  UI_UX = 'UI_UX',
  WEB_DEVELOPMENT = 'WEB_DEVELOPMENT',
  MOBILE_APP = 'MOBILE_APP'
}

export enum Priority {
  CRITICAL = 'CRITICAL',
  HIGHEST = 'HIGHEST',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  LOWEST = 'LOWEST'
}

export enum ProjectStatus {
  BACKLOG = 'BACKLOG',
  DISCOVERY = 'DISCOVERY',
  REQUIREMENT_GATHERING = 'REQUIREMENT_GATHERING',
  RESEARCH = 'RESEARCH',
  COMPETITOR_ANALYSIS = 'COMPETITOR_ANALYSIS',
  USER_INTERVIEWS = 'USER_INTERVIEWS',
  USER_JOURNEY = 'USER_JOURNEY',
  INFORMATION_ARCHITECTURE = 'INFORMATION_ARCHITECTURE',
  USER_FLOW = 'USER_FLOW',
  WIREFRAMING = 'WIREFRAMING',
  LOW_FIDELITY_DESIGN = 'LOW_FIDELITY_DESIGN',
  HIGH_FIDELITY_DESIGN = 'HIGH_FIDELITY_DESIGN',
  DESIGN_REVIEW = 'DESIGN_REVIEW',
  PROTOTYPE = 'PROTOTYPE',
  USABILITY_TESTING = 'USABILITY_TESTING',
  DESIGN_ITERATION = 'DESIGN_ITERATION',
  DEVELOPMENT_PLANNING = 'DEVELOPMENT_PLANNING',
  DEVELOPMENT = 'DEVELOPMENT',
  QA_TESTING = 'QA_TESTING',
  BUG_FIXING = 'BUG_FIXING',
  STAGING = 'STAGING',
  UAT = 'UAT',
  HANDOFF = 'HANDOFF',
  DEPLOYMENT = 'DEPLOYMENT',
  MONITORING = 'MONITORING',
  MAINTENANCE = 'MAINTENANCE',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED'
}

export enum EffortSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL'
}

export enum ProjectType {
  NEW_PRODUCT = 'NEW_PRODUCT',
  NEW_FEATURE = 'NEW_FEATURE',
  MVP = 'MVP',
  REDESIGN = 'REDESIGN',
  DESIGN_SYSTEM = 'DESIGN_SYSTEM',
  RESEARCH = 'RESEARCH',
  EXPLORATION = 'EXPLORATION',
  MAINTENANCE = 'MAINTENANCE',
  OPTIMIZATION = 'OPTIMIZATION',
  MIGRATION = 'MIGRATION',
  INTERNAL_TOOL = 'INTERNAL_TOOL',
  SAAS_PRODUCT = 'SAAS_PRODUCT',
  ENTERPRISE_PRODUCT = 'ENTERPRISE_PRODUCT',
  E_COMMERCE = 'E_COMMERCE',
  DASHBOARD = 'DASHBOARD',
  LANDING_PAGE = 'LANDING_PAGE',
  MOBILE_APP = 'MOBILE_APP',
  WEB_APP = 'WEB_APP'
}

export enum Device {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
  LAPTOP = 'LAPTOP',
  SMART_WATCH = 'SMART_WATCH',
  POS = 'POS',
  KIOSK = 'KIOSK',
  SMART_TV = 'SMART_TV',
  WEB = 'WEB',
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  FOLDABLE_DEVICE = 'FOLDABLE_DEVICE'
}

export enum ClientType {
  EXISTING = 'EXISTING',
  NEW = 'NEW',
  REFERRAL = 'REFERRAL'
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE',
  BLOCKED = 'BLOCKED'
}

export enum ResourceCategory {
  RESEARCH = 'RESEARCH',
  INSPIRATION = 'INSPIRATION',
  DOCUMENTATION = 'DOCUMENTATION',
  ASSETS = 'ASSETS',
  COMPETITOR = 'COMPETITOR',
  MEETING_NOTES = 'MEETING_NOTES',
  REFERENCES = 'REFERENCES',
  OTHERS = 'OTHERS'
}

export enum Platform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  CROSS_PLATFORM = 'CROSS_PLATFORM'
}

export enum StoreSubmissionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PUBLISHED = 'PUBLISHED'
}

export enum CI_CD_Status {
  PENDING = 'PENDING',
  BUILDING = 'BUILDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

// Tech Stack types
export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  hosting: string;
  cdn?: string;
  monitoring?: string;
  analytics?: string;
  thirdPartyIntegrations?: string[];
}

// Design version type
export interface DesignVersion {
  id: string;
  version: number;
  name: string;
  description?: string;
  url: string;
  thumbnail?: string;
  createdAt: Date;
  createdBy: string;
}

// Time tracking type
export interface TimeEntry {
  id: string;
  taskId: string;
  hours: number;
  description?: string;
  date: Date;
  createdAt: Date;
  createdBy: string;
}

// Dashboard types
export interface DashboardMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  delayedProjects: number;
  upcomingDeadlines: number;
  projectProgressOverview: ProjectProgress[];
  teamWorkload: TeamWorkload[];
  recentActivity: Activity[];
  priorityDistribution: PriorityDistribution[];
  statusDistribution: StatusDistribution[];
}

export interface ProjectProgress {
  projectId: string;
  projectName: string;
  progress: number;
  status: ProjectStatus[];
}

export interface TeamWorkload {
  teamId: string;
  teamName: string;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  utilization: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  projectId?: string;
  userId: string;
  timestamp: Date;
}

export enum ActivityType {
  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_UPDATED = 'PROJECT_UPDATED',
  TASK_CREATED = 'TASK_CREATED',
  TASK_UPDATED = 'TASK_UPDATED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  CLIENT_ADDED = 'CLIENT_ADDED',
  FILE_UPLOADED = 'FILE_UPLOADED',
  COMMENT_ADDED = 'COMMENT_ADDED'
}

export interface PriorityDistribution {
  priority: Priority;
  count: number;
  percentage: number;
}

export interface StatusDistribution {
  status: ProjectStatus;
  count: number;
  percentage: number;
}

// Notification types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  userId: string;
  data?: Record<string, any>;
}

export enum NotificationType {
  TASK_REMINDER = 'TASK_REMINDER',
  DEADLINE_ALERT = 'DEADLINE_ALERT',
  PROJECT_UPDATE = 'PROJECT_UPDATE',
  MENTION = 'MENTION',
  SYSTEM = 'SYSTEM'
}

// Search types
export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  relevance: number;
}

export enum SearchResultType {
  PROJECT = 'PROJECT',
  TASK = 'TASK',
  CLIENT = 'CLIENT',
  RESOURCE = 'RESOURCE',
  USER = 'USER'
}

// Report types
export interface Report {
  id: string;
  name: string;
  type: ReportType;
  data: any;
  format: ReportFormat;
  generatedAt: Date;
  generatedBy: string;
}

export enum ReportType {
  PROJECT = 'PROJECT',
  TEAM = 'TEAM',
  CLIENT = 'CLIENT',
  PRODUCTIVITY = 'PRODUCTIVITY',
  DEADLINE = 'DEADLINE'
}

export enum ReportFormat {
  PDF = 'PDF',
  CSV = 'CSV',
  EXCEL = 'EXCEL'
}