# TaskUz — Настройка

## 1. Supabase

Проект: `dgsvwqjtwqqpvmhjwtku`  
URL: https://dgsvwqjtwqqpvmhjwtku.supabase.co

### Миграция БД

В [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor выполните:

```sql
-- Файл: supabase/migrations/20250308000000_init_auth.sql
```

Скопируйте содержимое `supabase/migrations/20250308000000_init_auth.sql` и выполните.

### Edge Functions (SMS OTP)

1. Установите [Supabase CLI](https://supabase.com/docs/guides/cli)
2. В проекте выполните:

```bash
supabase login
supabase link --project-ref dgsvwqjtwqqpvmhjwtku
supabase secrets set DEVSMS_TOKEN=f931e5d7b4694789b0d542046e85e1d90fa46661141de26fecb06b997904bd0d
supabase functions deploy send-otp
supabase functions deploy verify-otp
```

## 2. DevSMS

- API: https://devsms.uz/api  
- Документация: https://devsms.uz/api/docs.php  
- Токен уже указан в `supabase secrets`

### ⚠️ Модерация SMS-шаблона (обязательно)

Перед отправкой SMS текст должен быть одобрен. Добавьте шаблон одним из способов:

1. **Через кабинет** [devsms.uz](https://devsms.uz) или [my.eskiz.uz](https://my.eskiz.uz) → СМС → Мои тексты → Добавить текст
2. **Через API** — Шаблоны → Отправить шаблон

Пример текста для добавления: `TaskUz: Ваш код: 123456` (123456 — пример, в коде подставится реальный код).

После одобрения (обычно 1 рабочий день) SMS начнёт отправляться. При необходимости измените шаблон через секрет:

```bash
npx supabase secrets set DEVSMS_MESSAGE_TEMPLATE="Ваш одобренный текст: {code}"
```

## 3. Переменные окружения (опционально)

Создайте `.env` в корне проекта:

```
VITE_SUPABASE_URL=https://dgsvwqjtwqqpvmhjwtku.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Значения по умолчанию уже встроены в код.
