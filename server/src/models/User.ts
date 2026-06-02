import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'MEMBER';
  password: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export class UserModel {
  private static users: User[] = [
    {
      id: uuidv4(),
      email: 'rhr3032@yahoo.com',
      name: 'Raisul Hasan',
      role: 'SUPER_ADMIN',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  static async findAll(): Promise<User[]> {
    return this.users;
  }

  static async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  static async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      ...userData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  static async update(id: string, updateData: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
      updatedAt: new Date()
    };
    return this.users[userIndex];
  }

  static async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }

  static async updateLastLogin(id: string): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      user.lastLogin = new Date();
      await this.update(id, { lastLogin: user.lastLogin });
    }
  }
}