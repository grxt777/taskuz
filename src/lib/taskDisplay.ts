import type { Category, Task, Tasker, Review } from '../store/store';

export const categories: Category[] = [];
export const reviews: Review[] = [];
export const taskers: Tasker[] = [];
export const tasks: Task[] = [];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount) + ' sum';
}

export const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  posted: { label: 'Open', color: 'text-blue-700', bg: 'bg-blue-50' },
  assigned: { label: 'Assigned', color: 'text-amber-700', bg: 'bg-amber-50' },
  in_progress: { label: 'In Progress', color: 'text-violet-700', bg: 'bg-violet-50' },
  completed: { label: 'Completed', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bg: 'bg-red-50' },
};
