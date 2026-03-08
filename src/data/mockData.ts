import type { Category, Task, Tasker, Review } from '../store/store';

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

export const reviews: Review[] = [
  { id: 'r1', rating: 5, text: 'Absolutely outstanding work. Left the apartment spotless. Will definitely hire again.', author: 'Aziz K.', author_avatar: 'A', date: '2 days ago', category: 'Cleaning' },
  { id: 'r2', rating: 5, text: 'Professional, punctual, and extremely thorough. Highly recommended.', author: 'Malika R.', author_avatar: 'M', date: '5 days ago', category: 'Cleaning' },
  { id: 'r3', rating: 4, text: 'Good work overall. Completed the job efficiently.', author: 'Sardor T.', author_avatar: 'S', date: '1 week ago', category: 'Furniture Assembly' },
  { id: 'r4', rating: 5, text: 'Incredible attention to detail. Best service I have ever used.', author: 'Nilufar M.', author_avatar: 'N', date: '2 weeks ago', category: 'Home Repair' },
  { id: 'r5', rating: 5, text: 'Very reliable and skilled. Fixed everything perfectly.', author: 'Bobur A.', author_avatar: 'B', date: '3 weeks ago', category: 'Plumbing' },
];

export const taskers: Tasker[] = [
  { id: 't1', name: 'Usmon Ochilov', avatar: 'U', bio: 'Professional cleaner with 10 years of experience. Specialized in deep cleaning and move-out cleaning.', rating: 4.9, total_tasks: 247, response_time: 8, completion_rate: 99.2, hourly_rate: 120000, categories: ['Cleaning', 'Organization'], is_verified: true, reviews: reviews.slice(0, 3), distance_km: 1.2 },
  { id: 't2', name: 'Fatima Kholova', avatar: 'F', bio: 'Expert furniture assembler and home repair specialist. Fast, reliable, and detail-oriented.', rating: 4.8, total_tasks: 183, response_time: 12, completion_rate: 98.5, hourly_rate: 100000, categories: ['Furniture Assembly', 'Mounting'], is_verified: true, reviews: reviews.slice(1, 4), distance_km: 2.5 },
  { id: 't3', name: 'Rustam Karimov', avatar: 'R', bio: 'Licensed electrician and plumber. 15 years of professional experience in residential services.', rating: 4.7, total_tasks: 312, response_time: 15, completion_rate: 97.8, hourly_rate: 150000, categories: ['Electrical', 'Plumbing'], is_verified: true, reviews: reviews.slice(2, 5), distance_km: 3.1 },
  { id: 't4', name: 'Dilnoza Ismoilova', avatar: 'D', bio: 'Professional painter and decorator with an eye for design. Transforming spaces since 2015.', rating: 4.9, total_tasks: 156, response_time: 10, completion_rate: 99.5, hourly_rate: 130000, categories: ['Painting', 'Home Repair'], is_verified: true, reviews: reviews.slice(0, 3), distance_km: 1.8 },
  { id: 't5', name: 'Alisher Nazarov', avatar: 'A', bio: 'Moving specialist with a team of 3. We handle everything from packing to final placement.', rating: 4.6, total_tasks: 89, response_time: 20, completion_rate: 96.5, hourly_rate: 90000, categories: ['Moving Help', 'Delivery'], is_verified: true, reviews: reviews.slice(1, 4), distance_km: 4.2 },
];

export const tasks: Task[] = [
  { id: 'task1', title: 'Deep cleaning for 3-bedroom apartment', description: 'Need thorough cleaning of all rooms including kitchen and bathrooms. Have 2 cats.', category_id: 'c1', category_name: 'Cleaning', subcategory_name: 'Deep Cleaning', status: 'posted', budget_min: 300000, budget_max: 500000, scheduled_date: '2026-03-15', scheduled_time: '10:00', address: 'Chilanzar, Block 7', city: 'Tashkent', client_name: 'Ahmad K.', client_avatar: 'A', client_rating: 4.8, distance_km: 2.3, created_at: '2 hours ago' },
  { id: 'task2', title: 'IKEA wardrobe assembly — PAX system', description: 'Need to assemble 2 PAX wardrobes with sliding doors. All parts are unpacked and ready.', category_id: 'c2', category_name: 'Furniture Assembly', subcategory_name: 'Wardrobe Assembly', status: 'posted', budget_min: 200000, budget_max: 350000, scheduled_date: '2026-03-16', scheduled_time: '14:00', address: 'Yunusabad, Block 19', city: 'Tashkent', client_name: 'Malika R.', client_avatar: 'M', client_rating: 4.9, distance_km: 1.5, created_at: '3 hours ago' },
  { id: 'task3', title: 'TV wall mounting — 65 inch Samsung', description: 'Mount 65" TV on brick wall. Need to hide cables inside the wall. Bracket included.', category_id: 'c3', category_name: 'Mounting', subcategory_name: 'TV Mounting', status: 'assigned', budget_min: 150000, budget_max: 250000, agreed_price: 200000, scheduled_date: '2026-03-14', scheduled_time: '11:00', address: 'Mirzo Ulugbek, Block 3', city: 'Tashkent', client_name: 'Sardor T.', client_avatar: 'S', client_rating: 4.7, tasker_name: 'Rustam K.', tasker_avatar: 'R', tasker_rating: 4.7, created_at: '5 hours ago' },
  { id: 'task4', title: 'Full apartment move — 2 rooms to new building', description: 'Moving all furniture and boxes from old apartment to new one. 3rd floor to 8th floor (elevator available).', category_id: 'c4', category_name: 'Moving Help', subcategory_name: 'Full Move', status: 'in_progress', budget_min: 500000, budget_max: 800000, agreed_price: 650000, scheduled_date: '2026-03-13', scheduled_time: '09:00', address: 'Sergeli, Block 5', city: 'Tashkent', client_name: 'Bobur A.', client_avatar: 'B', client_rating: 4.5, tasker_name: 'Alisher N.', tasker_avatar: 'A', tasker_rating: 4.6, created_at: '1 day ago' },
  { id: 'task5', title: 'Kitchen faucet replacement', description: 'Old faucet is leaking. Need to remove and install new Grohe faucet. Parts will be provided.', category_id: 'c7', category_name: 'Plumbing', subcategory_name: 'Faucet Installation', status: 'completed', budget_min: 100000, budget_max: 200000, agreed_price: 150000, scheduled_date: '2026-03-10', scheduled_time: '15:00', address: 'Yakkasaray, Block 2', city: 'Tashkent', client_name: 'Nilufar M.', client_avatar: 'N', client_rating: 4.9, tasker_name: 'Rustam K.', tasker_avatar: 'R', tasker_rating: 4.7, created_at: '3 days ago' },
  { id: 'task6', title: 'Garden landscaping and cleanup', description: 'Need complete yard cleanup, tree trimming, and flower bed preparation for spring.', category_id: 'c9', category_name: 'Yard Work', subcategory_name: 'Landscaping', status: 'posted', budget_min: 400000, budget_max: 700000, scheduled_date: '2026-03-17', scheduled_time: '08:00', address: 'Mirabad, Private House', city: 'Tashkent', client_name: 'Kamol S.', client_avatar: 'K', client_rating: 4.6, distance_km: 5.1, created_at: '4 hours ago' },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', from: 'Usmon', text: 'Hi! I saw your cleaning task. I can do it on March 15th at 10am.', time: '10:30 AM', isOwn: false, read: true },
  { id: 'm2', from: 'You', text: 'Great! Do you bring your own cleaning supplies?', time: '10:32 AM', isOwn: true, read: true },
  { id: 'm3', from: 'Usmon', text: 'Yes, I bring everything — eco-friendly products, microfiber cloths, vacuum cleaner. All included in the price.', time: '10:33 AM', isOwn: false, read: true },
  { id: 'm4', from: 'You', text: 'Perfect. I have 2 cats — is that an issue?', time: '10:35 AM', isOwn: true, read: true },
  { id: 'm5', from: 'Usmon', text: 'Not at all! I have experience with pet-friendly cleaning. I use hypoallergenic products.', time: '10:36 AM', isOwn: false, read: true },
  { id: 'm6', from: 'You', text: 'Sounds great. Can we agree on 400,000 sum?', time: '10:38 AM', isOwn: true, read: true },
  { id: 'm7', from: 'Usmon', text: 'That works for me. I will be there at 10am sharp. See you then!', time: '10:39 AM', isOwn: false, read: false },
];

export interface ChatMessage {
  id: string;
  from: string;
  text: string;
  time: string;
  isOwn: boolean;
  read: boolean;
}

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
