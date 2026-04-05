-- Profile: address & notification preferences (persisted from app settings)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS default_address TEXT,
  ADD COLUMN IF NOT EXISTS notify_push BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS notify_email BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS notify_sms BOOLEAN NOT NULL DEFAULT true;

-- Service categories (reference data for task posting / filters)
CREATE TABLE IF NOT EXISTS public.service_categories (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'sparkles'
);

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all service_categories" ON public.service_categories
  FOR SELECT USING (true);

INSERT INTO public.service_categories (id, name_en, name_uz, name_ru, icon) VALUES
  ('cleaning', 'Cleaning', 'Tozalash', 'Уборка', 'sparkles'),
  ('furniture', 'Furniture Assembly', 'Mebel yig''ish', 'Сборка мебели', 'wrench'),
  ('mounting', 'Mounting', 'O''rnatish', 'Монтаж', 'hammer'),
  ('moving', 'Moving Help', 'Ko''chirish', 'Переезды', 'truck'),
  ('delivery', 'Delivery', 'Yetkazish', 'Доставка', 'package'),
  ('repair', 'Home Repair', 'Ta''mirlash', 'Ремонт', 'home'),
  ('plumbing', 'Plumbing', 'Santexnika', 'Сантехника', 'droplets'),
  ('electrical', 'Electrical', 'Elektrika', 'Электрика', 'zap')
ON CONFLICT (id) DO NOTHING;

-- Tasks
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tasker_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category_id TEXT NOT NULL REFERENCES public.service_categories(id),
  category_name TEXT NOT NULL DEFAULT '',
  subcategory_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'posted' CHECK (status IN ('posted', 'assigned', 'in_progress', 'completed', 'cancelled')),
  budget_min INTEGER NOT NULL DEFAULT 0,
  budget_max INTEGER NOT NULL DEFAULT 0,
  agreed_price INTEGER,
  scheduled_date TEXT NOT NULL DEFAULT '',
  scheduled_time TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tasks_client_id ON public.tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_tasker_id ON public.tasks(tasker_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all tasks" ON public.tasks
  FOR ALL USING (true) WITH CHECK (true);

-- Reviews (about a profile — tasker or client)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_subject_id ON public.reviews(subject_id);
CREATE INDEX IF NOT EXISTS idx_reviews_author_id ON public.reviews(author_id);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all reviews" ON public.reviews
  FOR ALL USING (true) WITH CHECK (true);
