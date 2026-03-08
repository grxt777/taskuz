import { create } from 'zustand';

export type Language = 'en' | 'uz' | 'ru';
export type UserRole = 'client' | 'tasker' | 'admin';
export type TaskStatus = 'posted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
export type Page = 'home' | 'auth' | 'tasks' | 'task-detail' | 'create-task' | 'dashboard' | 'profile' | 'tasker-profile' | 'chat' | 'admin' | 'support';

export interface Category {
  id: string;
  name_en: string;
  name_uz: string;
  name_ru: string;
  icon: string;
  subcategories_count: number;
  available_taskers: number;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category_id: string;
  category_name: string;
  subcategory_name: string;
  status: TaskStatus;
  budget_min: number;
  budget_max: number;
  agreed_price?: number;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  city: string;
  client_name: string;
  client_avatar: string;
  client_rating: number;
  tasker_name?: string;
  tasker_avatar?: string;
  tasker_rating?: number;
  distance_km?: number;
  created_at: string;
  photos?: string[];
}

export interface Tasker {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  total_tasks: number;
  response_time: number;
  completion_rate: number;
  hourly_rate: number;
  categories: string[];
  is_verified: boolean;
  reviews: Review[];
  distance_km?: number;
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  author_avatar: string;
  date: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  from: string;
  text: string;
  time: string;
  isOwn: boolean;
  read: boolean;
}

interface AppState {
  page: Page;
  language: Language;
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string;
  userAvatar: string;
  selectedTaskId: string | null;
  selectedTaskerId: string | null;
  mobileMenuOpen: boolean;
  
  setPage: (page: Page) => void;
  setLanguage: (lang: Language) => void;
  login: (role: UserRole, name: string) => void;
  logout: () => void;
  setSelectedTaskId: (id: string | null) => void;
  setSelectedTaskerId: (id: string | null) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  page: 'home',
  language: 'en',
  isAuthenticated: false,
  userRole: 'client',
  userName: '',
  userAvatar: '',
  selectedTaskId: null,
  selectedTaskerId: null,
  mobileMenuOpen: false,

  setPage: (page) => set({ page, mobileMenuOpen: false }),
  setLanguage: (language) => set({ language }),
  login: (userRole, userName) => set({ isAuthenticated: true, userRole, userName, userAvatar: userName.charAt(0).toUpperCase(), page: userRole === 'admin' ? 'admin' : 'dashboard' }),
  logout: () => set({ isAuthenticated: false, userRole: 'client', userName: '', page: 'home' }),
  setSelectedTaskId: (selectedTaskId) => set({ selectedTaskId }),
  setSelectedTaskerId: (selectedTaskerId) => set({ selectedTaskerId }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
}));
