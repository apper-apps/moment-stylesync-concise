import mockUsers from '@/services/mockData/users.json';
import { toast } from 'react-toastify';

class UserService {
  constructor() {
    this.users = [...mockUsers];
    this.currentUser = this.loadCurrentUser();
  }

  loadCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  saveCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  clearCurrentUser() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const userWithoutPassword = { ...user };
          delete userWithoutPassword.password;
          this.saveCurrentUser(userWithoutPassword);
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 300);
    });
  }

  async signup(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = this.users.find(u => u.email === userData.email);
        if (existingUser) {
          reject(new Error('User with this email already exists'));
          return;
        }

        // Create new user with auto-generated ID
        const newUser = {
          Id: Math.max(...this.users.map(u => u.Id)) + 1,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          avatar: null,
          createdAt: new Date().toISOString(),
          preferences: {
            style: 'casual',
            colors: [],
            brands: []
          }
        };

        this.users.push(newUser);
        
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        this.saveCurrentUser(userWithoutPassword);
        
        resolve(userWithoutPassword);
      }, 300);
    });
  }

  async logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.clearCurrentUser();
        resolve();
      }, 200);
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const usersWithoutPasswords = this.users.map(user => {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        });
        resolve([...usersWithoutPasswords]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.Id === parseInt(id));
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve({ ...userWithoutPassword });
        } else {
          reject(new Error('User not found'));
        }
      }, 200);
    });
  }

  async update(id, userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(u => u.Id === parseInt(id));
        if (userIndex !== -1) {
          // Don't allow ID changes
          const { Id, ...updateData } = userData;
          this.users[userIndex] = { ...this.users[userIndex], ...updateData };
          
          const { password, ...userWithoutPassword } = this.users[userIndex];
          resolve({ ...userWithoutPassword });
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(u => u.Id === parseInt(id));
        if (userIndex !== -1) {
          this.users.splice(userIndex, 1);
          resolve();
        } else {
          reject(new Error('User not found'));
        }
      }, 200);
    });
  }

  async create(userData) {
    return this.signup(userData);
  }
}

export const userService = new UserService();