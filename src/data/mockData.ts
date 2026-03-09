import type { Category, Task, Tasker, Review, ChatMessage } from '../store/store';

// Категории считаем справочником и оставляем статическими,
// а остальные сущности (tasks, taskers, chat) будут приходить из БД.
export const categories: Category[] = [
  { id: 'c1', name_en: 'Cleaning', name_uz: 'Tozalash', name_ru: 'Уборка', icon: 'sparkles', subcategories_count: 8, available_taskers: 42, description: 'Professional home & office cleaning' },
  { id: 'c2', name_en: 'Furniture Assembly', name_uz: 'Mebel yig\'ish', name_ru: 'Сборка мебели', icon: 'wrench', subcategories_count: 6, available_taskers: 28, description: 'Expert furniture assembly & disassembly' },
  { id: 'c3', name_en: 'Mounting', name_uz: 'O\'rnatish', name_ru: 'Монтаж', icon: 'hammer', subcategories_count: 5, available_taskers: 35, description: 'TV mounting, shelving & installations' },
  { id: 'c4', name_en: 'Moving Help', name_uz: 'Ko\'chirish', name_ru: 'Переезды', icon: 'truck', subcategories_count: 4, available_taskers: 22, description: 'Packing, loading & moving services' },
  { id: 'c5', name_en: 'Delivery', name_uz: 'Yetkazish', name_ru: 'Доставка', icon: 'package', subcategories_count: 3, available_taskers: 55, description: 'Fast & reliable delivery services' },
  { id: 'c6', name_en: 'Home Repair', name_uz: 'Ta\'mirlash', name_ru: 'Ремонт', icon: 'home', subcategories_count: 10, available_taskers: 38, description: 'General home repairs & maintenance' },
  { id: 'c7', name_en: 'Plumbing', name_uz: 'Santexnika', name_ru: 'Сантехника', icon: 'droplets', subcategories_count: 6, available_taskers: 19, description: 'Expert plumbing solutions' },
  { id: 'c8', name_en: 'Electrical', name_uz: 'Elektrika', name_ru: 'Электрика', icon: 'zap', subcategories_count: 5, available_taskers: 24, description: 'Licensed electrical work' },
  { id: 'c9', name_en: 'Yard Work', name_uz: 'Hovli ishi', name_ru: 'Двор', icon: 'trees', subcategories_count: 7, available_taskers: 16, description: 'Garden & yard maintenance' },
  { id: 'c10', name_en: 'Tech Support', name_uz: 'Texnik yordam', name_ru: 'Техподдержка', icon: 'monitor', subcategories_count: 4, available_taskers: 31, description: 'Computer & device support' },
  { id: 'c11', name_en: 'Personal Assistant', name_uz: 'Shaxsiy yordamchi', name_ru: 'Ассистент', icon: 'user-check', subcategories_count: 5, available_taskers: 12, description: 'Personal assistance services' },
  { id: 'c12', name_en: 'Event Planning', name_uz: 'Tadbirlar', name_ru: 'Мероприятия', icon: 'calendar', subcategories_count: 6, available_taskers: 8, description: 'Event organization & planning' },
  { id: 'c13', name_en: 'Painting', name_uz: 'Bo\'yash', name_ru: 'Покраска', icon: 'paintbrush', subcategories_count: 4, available_taskers: 20, description: 'Interior & exterior painting' },
  { id: 'c14', name_en: 'Organization', name_uz: 'Tartibga solish', name_ru: 'Организация', icon: 'layout-grid', subcategories_count: 3, available_taskers: 10, description: 'Home & office organization' },
];

export const reviews: Review[] = [];

export const taskers: Tasker[] = [];

export const tasks: Task[] = [];

export const chatMessages: ChatMessage[] = [];

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US').format(amount) + ' sum';
};

export const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  posted: { label: 'Open', color: 'text-blue-700', bg: 'bg-blue-50' },
  assigned: { label: 'Assigned', color: 'text-amber-700', bg: 'bg-amber-50' },
  in_progress: { label: 'In Progress', color: 'text-violet-700', bg: 'bg-violet-50' },
  completed: { label: 'Completed', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bg: 'bg-red-50' },
};
