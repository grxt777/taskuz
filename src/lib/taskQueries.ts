import { supabase } from './supabase';
import type { Task, TaskStatus } from '../store/store';
import type { Profile } from './auth';
import type { Category } from '../store/store';

type DbTaskRow = {
  id: string;
  client_id: string;
  tasker_id: string | null;
  title: string;
  description: string;
  category_id: string;
  category_name: string;
  subcategory_name: string;
  status: TaskStatus;
  budget_min: number;
  budget_max: number;
  agreed_price: number | null;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  city: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  client?: { name: string } | null;
  tasker?: { name: string } | null;
};

export function mapDbTaskToTask(row: DbTaskRow): Task {
  const cn = row.client?.name ?? 'Client';
  const tn = row.tasker?.name;
  return {
    id: row.id,
    client_id: row.client_id,
    tasker_id: row.tasker_id,
    title: row.title,
    description: row.description,
    category_id: row.category_id,
    category_name: row.category_name,
    subcategory_name: row.subcategory_name,
    status: row.status,
    budget_min: row.budget_min,
    budget_max: row.budget_max,
    agreed_price: row.agreed_price ?? undefined,
    scheduled_date: row.scheduled_date,
    scheduled_time: row.scheduled_time,
    address: row.address,
    city: row.city,
    client_name: cn,
    client_avatar: cn,
    client_rating: 0,
    tasker_name: tn ?? undefined,
    tasker_avatar: tn,
    tasker_rating: 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
    completed_at: row.completed_at,
  };
}

const taskSelect = `
  *,
  client:profiles!tasks_client_id_fkey(name),
  tasker:profiles!tasks_tasker_id_fkey(name)
`;

export async function fetchTaskById(taskId: string): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .select(taskSelect)
    .eq('id', taskId)
    .maybeSingle();
  if (error || !data) return null;
  return mapDbTaskToTask(data as DbTaskRow);
}

export async function fetchTasksForClient(clientId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select(taskSelect)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as DbTaskRow[]).map(mapDbTaskToTask);
}

/** Open marketplace: posted, no tasker yet */
export async function fetchOpenTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select(taskSelect)
    .eq('status', 'posted')
    .is('tasker_id', null)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as DbTaskRow[]).map(mapDbTaskToTask);
}

/** All posted tasks (client browse / tasker sees pool) */
export async function fetchAllPostedTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select(taskSelect)
    .eq('status', 'posted')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as DbTaskRow[]).map(mapDbTaskToTask);
}

export async function fetchTasksForTaskerJobs(taskerId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select(taskSelect)
    .eq('tasker_id', taskerId)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as DbTaskRow[]).map(mapDbTaskToTask);
}

export async function fetchServiceCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('service_categories').select('*').order('id');
  if (error || !data) return [];
  return data.map((r: { id: string; name_en: string; name_uz: string; name_ru: string; icon: string }) => ({
    id: r.id,
    name_en: r.name_en,
    name_uz: r.name_uz,
    name_ru: r.name_ru,
    icon: r.icon,
    subcategories_count: 0,
    available_taskers: 0,
    description: '',
  }));
}

export async function createTask(params: {
  clientId: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  city: string;
}): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      client_id: params.clientId,
      title: params.title,
      description: params.description,
      category_id: params.categoryId,
      category_name: params.categoryName,
      subcategory_name: '',
      status: 'posted',
      budget_min: params.budgetMin,
      budget_max: params.budgetMax,
      scheduled_date: params.scheduledDate,
      scheduled_time: params.scheduledTime,
      address: params.address,
      city: params.city,
    })
    .select(taskSelect)
    .single();
  if (error || !data) {
    console.error(error);
    return null;
  }
  return mapDbTaskToTask(data as DbTaskRow);
}

export async function averageRating(subjectId: string): Promise<number | null> {
  const { data, error } = await supabase.from('reviews').select('rating').eq('subject_id', subjectId);
  if (error || !data?.length) return null;
  const sum = data.reduce((a: number, r: { rating: number }) => a + r.rating, 0);
  return Math.round((sum / data.length) * 10) / 10;
}

export async function fetchReviewsForSubject(subjectId: string): Promise<
  Array<{
    id: string;
    rating: number;
    body: string;
    category: string;
    created_at: string;
    author?: { name: string } | null;
  }>
> {
  const { data, error } = await supabase
    .from('reviews')
    .select('id, rating, body, category, created_at, author:profiles!reviews_author_id_fkey(name)')
    .eq('subject_id', subjectId)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as Array<{
    id: string;
    rating: number;
    body: string;
    category: string;
    created_at: string;
    author?: { name: string } | null;
  }>;
}

export async function averageRatingGiven(authorId: string): Promise<number | null> {
  const { data, error } = await supabase.from('reviews').select('rating').eq('author_id', authorId);
  if (error || !data?.length) return null;
  const sum = data.reduce((a: number, r: { rating: number }) => a + r.rating, 0);
  return Math.round((sum / data.length) * 10) / 10;
}

export interface TaskerSummary {
  id: string;
  name: string;
  rating: number;
}

export async function fetchTaskerSummaries(limit: number): Promise<TaskerSummary[]> {
  const { data: profs, error: pe } = await supabase.from('profiles').select('id,name').eq('role', 'tasker').limit(limit);
  if (pe || !profs?.length) return [];
  const ids = profs.map((p: { id: string }) => p.id);
  const { data: revs } = await supabase.from('reviews').select('subject_id,rating').in('subject_id', ids);
  const avgBy = new Map<string, { sum: number; count: number }>();
  for (const r of revs ?? []) {
    const row = r as { subject_id: string; rating: number };
    const cur = avgBy.get(row.subject_id) ?? { sum: 0, count: 0 };
    cur.sum += row.rating;
    cur.count += 1;
    avgBy.set(row.subject_id, cur);
  }
  return profs.map((p: { id: string; name: string }) => {
    const a = avgBy.get(p.id);
    return {
      id: p.id,
      name: p.name,
      rating: a && a.count ? Math.round((a.sum / a.count) * 10) / 10 : 0,
    };
  });
}

export async function fetchDashboardDataForClient(clientId: string): Promise<{
  tasks: Task[];
  avgGiven: number | null;
}> {
  const [tasks, avgGiven] = await Promise.all([
    fetchTasksForClient(clientId),
    averageRatingGiven(clientId),
  ]);
  return { tasks, avgGiven };
}

export async function fetchDashboardDataForTasker(taskerId: string): Promise<{
  open: Task[];
  mine: Task[];
  avgRating: number | null;
}> {
  const [open, mine, avgRating] = await Promise.all([
    fetchOpenTasks(),
    fetchTasksForTaskerJobs(taskerId),
    averageRating(taskerId),
  ]);
  return { open, mine, avgRating };
}
