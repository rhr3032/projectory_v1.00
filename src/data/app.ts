export const projects = [
  {
    name: 'E-commerce Mobile App',
    client: 'TechCorp Inc.',
    type: 'Mobile App',
    status: 'Development',
    priority: 'High',
    due: 'Jun 18, 2026',
    progress: 75,
    owner: 'Raisul Hasan',
  },
  {
    name: 'Banking Dashboard Redesign',
    client: 'Finova Bank',
    type: 'UI/UX',
    status: 'Design Review',
    priority: 'Critical',
    due: 'Jun 24, 2026',
    progress: 60,
    owner: 'Nadia Rahman',
  },
  {
    name: 'Travel Website',
    client: 'Roamly',
    type: 'Web',
    status: 'Research',
    priority: 'Medium',
    due: 'Jul 2, 2026',
    progress: 45,
    owner: 'Tanvir Ahmed',
  },
  {
    name: 'Restaurant POS System',
    client: 'DineGrid',
    type: 'SaaS',
    status: 'UAT',
    priority: 'High',
    due: 'Jun 10, 2026',
    progress: 90,
    owner: 'Maliha Noor',
  },
];

export const tasks = [
  { name: 'Finalize checkout prototype', project: 'E-commerce Mobile App', assignee: 'Nadia', status: 'In Progress', priority: 'High', due: 'Today' },
  { name: 'Review KPI widget states', project: 'Banking Dashboard Redesign', assignee: 'Raisul', status: 'In Review', priority: 'Critical', due: 'Tomorrow' },
  { name: 'Write destination SEO briefs', project: 'Travel Website', assignee: 'Tanvir', status: 'Todo', priority: 'Medium', due: 'Jun 8' },
  { name: 'Prepare release notes', project: 'Restaurant POS System', assignee: 'Maliha', status: 'Blocked', priority: 'High', due: 'Jun 9' },
  { name: 'Audit mobile accessibility', project: 'E-commerce Mobile App', assignee: 'Sadia', status: 'Todo', priority: 'Medium', due: 'Jun 12' },
];

export const clients = [
  { name: 'TechCorp Inc.', contact: 'Sarah Mitchell', email: 'sarah@techcorp.example', country: 'United States', value: '$48,000', health: 'Excellent' },
  { name: 'Finova Bank', contact: 'Arif Chowdhury', email: 'arif@finova.example', country: 'Bangladesh', value: '$36,500', health: 'Good' },
  { name: 'Roamly', contact: 'Maya Foster', email: 'maya@roamly.example', country: 'United Kingdom', value: '$18,200', health: 'Watch' },
  { name: 'DineGrid', contact: 'Omar Malik', email: 'omar@dinegrid.example', country: 'UAE', value: '$27,900', health: 'Good' },
];

export const resources = [
  { title: 'Design Handoff Checklist', category: 'Documentation', project: 'All Projects', owner: 'Design Ops', updated: 'Jun 3' },
  { title: 'Banking UX Benchmark', category: 'Research', project: 'Banking Dashboard Redesign', owner: 'Nadia', updated: 'Jun 2' },
  { title: 'Mobile Commerce Patterns', category: 'Inspiration', project: 'E-commerce Mobile App', owner: 'Raisul', updated: 'May 31' },
  { title: 'POS Hardware Matrix', category: 'Reference', project: 'Restaurant POS System', owner: 'Maliha', updated: 'May 28' },
];

export const files = [
  { name: 'checkout-flow-v3.fig', type: 'Figma', project: 'E-commerce Mobile App', size: '18.4 MB', updated: '2 hours ago' },
  { name: 'banking-dashboard-wireframes.pdf', type: 'PDF', project: 'Banking Dashboard Redesign', size: '7.8 MB', updated: '5 hours ago' },
  { name: 'pos-uat-feedback.xlsx', type: 'Spreadsheet', project: 'Restaurant POS System', size: '1.2 MB', updated: 'Yesterday' },
  { name: 'travel-content-map.docx', type: 'Document', project: 'Travel Website', size: '812 KB', updated: 'Jun 1' },
];

export const team = [
  { name: 'Raisul Hasan', role: 'Product Lead', workload: '82%', focus: 'Delivery, client review', availability: 'Available' },
  { name: 'Nadia Rahman', role: 'Lead Designer', workload: '74%', focus: 'Design systems', availability: 'Available' },
  { name: 'Tanvir Ahmed', role: 'Frontend Engineer', workload: '68%', focus: 'Astro, React UI', availability: 'Deep work' },
  { name: 'Maliha Noor', role: 'QA Analyst', workload: '59%', focus: 'UAT, release notes', availability: 'Available' },
];

export const calendarEvents = [
  { time: '10:00 AM', title: 'Banking dashboard design review', owner: 'Nadia', project: 'Finova Bank' },
  { time: '12:30 PM', title: 'Mobile checkout QA sync', owner: 'Maliha', project: 'TechCorp Inc.' },
  { time: '03:00 PM', title: 'Roamly content strategy call', owner: 'Tanvir', project: 'Roamly' },
  { time: '05:15 PM', title: 'DineGrid release readiness', owner: 'Raisul', project: 'DineGrid' },
];

export const reports = [
  { name: 'Weekly Delivery Summary', type: 'Project', owner: 'Raisul', cadence: 'Weekly', status: 'Ready' },
  { name: 'Team Utilization', type: 'Productivity', owner: 'Operations', cadence: 'Weekly', status: 'Draft' },
  { name: 'Client Health Overview', type: 'Client', owner: 'Account Team', cadence: 'Monthly', status: 'Ready' },
  { name: 'Deadline Risk Register', type: 'Deadline', owner: 'PMO', cadence: 'Daily', status: 'Live' },
];

export const notifications = [
  { title: 'Deadline alert', message: 'Restaurant POS System UAT closes in 6 days.', status: 'Unread', time: '14 min ago' },
  { title: 'Mention', message: 'Nadia mentioned you in Banking Dashboard Redesign.', status: 'Unread', time: '1 hour ago' },
  { title: 'File uploaded', message: 'checkout-flow-v3.fig was added to TechCorp.', status: 'Read', time: '2 hours ago' },
  { title: 'Task completed', message: 'Banking Dashboard wireframes moved to done.', status: 'Read', time: 'Yesterday' },
];

export const settings = [
  { name: 'Workspace profile', value: 'Projectory Enterprise', status: 'Configured' },
  { name: 'Theme preference', value: 'System with manual toggle', status: 'Active' },
  { name: 'Notification digest', value: 'Daily at 9:00 AM', status: 'Active' },
  { name: 'Export format', value: 'PDF and CSV', status: 'Configured' },
];
