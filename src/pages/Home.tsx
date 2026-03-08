import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { categories, taskers } from '../data/mockData';
import { Button, Card, Avatar, Rating, VerifiedBadge, Badge } from '../components/ui';
import {
  ArrowRight, Sparkles, Wrench, Hammer, Truck, Package, Home,
  Droplets, Zap, Trees, Monitor, UserCheck, Calendar, Paintbrush,
  LayoutGrid, Shield, Clock, CheckCircle2, Star, ChevronRight, Users, Award
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles size={20} />, wrench: <Wrench size={20} />, hammer: <Hammer size={20} />,
  truck: <Truck size={20} />, package: <Package size={20} />, home: <Home size={20} />,
  droplets: <Droplets size={20} />, zap: <Zap size={20} />, trees: <Trees size={20} />,
  monitor: <Monitor size={20} />, 'user-check': <UserCheck size={20} />,
  calendar: <Calendar size={20} />, paintbrush: <Paintbrush size={20} />,
  'layout-grid': <LayoutGrid size={20} />,
};

export default function HomePage() {
  const { isAuthenticated, language } = useStore();
  const navigate = useNavigate();

  const t = (en: string, uz: string, ru: string) => {
    if (language === 'uz') return uz;
    if (language === 'ru') return ru;
    return en;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,0,0,0.05),transparent)]" />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600 mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              {t('Trusted by 10,000+ users in Uzbekistan', "O'zbekistonda 10,000+ foydalanuvchi ishonadi", 'Более 10 000 пользователей в Узбекистане')}
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] mb-5">
              {t('Get things done with', "Ishlarni bajarib bering", 'Решайте задачи с')}{' '}
              <span className="text-gradient">{t('verified professionals', "tasdiqlangan mutaxassislar", 'проверенными специалистами')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-500 max-w-xl mx-auto mb-8 leading-relaxed">
              {t(
                'From home cleaning to electrical work — find skilled taskers near you, get transparent pricing, and pay securely.',
                "Uy tozalashdan elektr ishlargacha — yaqin atrofdagi mohir ijrochilarni toping.",
                'От уборки до электрики — найдите квалифицированных исполнителей рядом с вами.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="xl"
                onClick={() => navigate(isAuthenticated ? '/tasks/new' : '/auth')}
                iconRight={<ArrowRight size={18} />}
              >
                {t('Post a Task', "Vazifa yarating", 'Создать задачу')}
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate(isAuthenticated ? '/tasks' : '/auth')}
              >
                {t('Become a Tasker', "Ijrochi bo'ling", 'Стать исполнителем')}
              </Button>
            </div>

            {/* Trust metrics */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-12">
              {[
                { icon: <Users size={16} />, label: '10,000+', sub: t('Users', 'Foydalanuvchilar', 'Пользователей') },
                { icon: <CheckCircle2 size={16} />, label: '95.8%', sub: t('Completion Rate', 'Bajarilish', 'Завершено') },
                { icon: <Star size={16} />, label: '4.8', sub: t('Avg Rating', "O'rtacha baho", 'Средний рейтинг') },
                { icon: <Shield size={16} />, label: '100%', sub: t('Verified', 'Tasdiqlangan', 'Проверено') },
              ].map((m) => (
                <div key={m.sub} className="flex items-center gap-2">
                  <span className="text-neutral-400">{m.icon}</span>
                  <span className="text-sm font-bold text-neutral-900">{m.label}</span>
                  <span className="text-xs text-neutral-400">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 animate-fade-in-up stagger-1">
            <Badge variant="outline" size="md">{t('How it works', 'Qanday ishlaydi', 'Как это работает')}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mt-4">
              {t('Three simple steps', "Uch oddiy qadam", 'Три простых шага')}
            </h2>
            <p className="text-neutral-500 mt-3 max-w-lg mx-auto">
              {t(
                'Post your task, choose a professional, and get it done — all within the platform.',
                "Vazifangizni joylashtiring, mutaxassisni tanlang va bajarilsin.",
                'Опубликуйте задачу, выберите специалиста и получите результат.'
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: t('Describe your task', 'Vazifangizni tasvirlang', 'Опишите задачу'),
                desc: t('Tell us what you need done, when, and where. Set your budget and preferences.', "Nima qilish kerakligini, qachon va qayerda ekanligini ayting.", 'Расскажите, что нужно сделать, когда и где.'),
                icon: <Sparkles size={22} />,
              },
              {
                step: '02',
                title: t('Choose a tasker', 'Ijrochini tanlang', 'Выберите исполнителя'),
                desc: t('Browse verified professionals, compare ratings and prices. Chat before you hire.', "Tasdiqlangan mutaxassislarni ko'ring, baholar va narxlarni solishtiring.", 'Просматривайте проверенных профессионалов, сравнивайте рейтинги.'),
                icon: <UserCheck size={22} />,
              },
              {
                step: '03',
                title: t('Get it done', 'Bajarilsin', 'Получите результат'),
                desc: t('Track progress in real-time, pay securely through the platform, and leave a review.', "Jarayonni real vaqtda kuzating, xavfsiz to'lang.", 'Отслеживайте прогресс, платите безопасно и оставьте отзыв.'),
                icon: <CheckCircle2 size={22} />,
              },
            ].map((s, i) => (
              <Card key={s.step} hover className={`animate-fade-in-up stagger-${i + 2} group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-[72px] font-black text-neutral-50 leading-none select-none pointer-events-none pr-4 -mt-2">{s.step}</div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="outline" size="md">{t('Services', 'Xizmatlar', 'Услуги')}</Badge>
              <h2 className="text-3xl font-bold text-neutral-900 tracking-tight mt-3">
                {t('Browse categories', 'Kategoriyalarni ko\'ring', 'Категории услуг')}
              </h2>
            </div>
            <button onClick={() => navigate('/tasks')} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer">
              {t('View all', 'Hammasini ko\'rish', 'Смотреть все')} <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => navigate('/tasks')}
                className={`group flex items-center gap-3.5 p-4 rounded-2xl border border-neutral-200/70 hover:border-neutral-300 hover:shadow-premium bg-white transition-all duration-300 text-left cursor-pointer animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center text-neutral-600 transition-all duration-300 shrink-0">
                  {iconMap[cat.icon]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 truncate">
                    {language === 'uz' ? cat.name_uz : language === 'ru' ? cat.name_ru : cat.name_en}
                  </p>
                  <p className="text-xs text-neutral-400">{cat.available_taskers} {t('taskers', 'ijrochilar', 'специалистов')}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Taskers ── */}
      <section className="py-20 bg-neutral-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" size="md">{t('Top Rated', 'Eng yaxshi', 'Лучшие')}</Badge>
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight mt-3">
              {t('Featured professionals', 'Tanlangan mutaxassislar', 'Лучшие специалисты')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {taskers.slice(0, 3).map((tasker, i) => (
              <Card key={tasker.id} hover className={`animate-fade-in-up stagger-${i + 1}`}>
                <div className="flex items-start gap-4 mb-4">
                  <Avatar name={tasker.name} size="lg" verified={tasker.is_verified} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-neutral-900 truncate">{tasker.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Rating value={tasker.rating} count={tasker.total_tasks} />
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <VerifiedBadge />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{tasker.bio}</p>
                <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
                  <span className="flex items-center gap-1"><Clock size={12} /> {tasker.response_time}min</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={12} /> {tasker.completion_rate}%</span>
                  <span className="flex items-center gap-1"><Award size={12} /> {tasker.total_tasks} tasks</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tasker.categories.map(c => (
                    <Badge key={c} variant="outline">{c}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <p className="text-sm">
                    <span className="font-bold text-neutral-900">{new Intl.NumberFormat().format(tasker.hourly_rate)}</span>
                    <span className="text-neutral-400"> sum/hr</span>
                  </p>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/tasker/${tasker.id}`)}>
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust & Safety ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" size="md">{t('Trust & Safety', 'Ishonch', 'Безопасность')}</Badge>
              <h2 className="text-3xl font-bold text-neutral-900 tracking-tight mt-4 mb-6">
                {t('Your safety is our priority', 'Sizning xavfsizligingiz bizning ustuvorligimiz', 'Ваша безопасность — наш приоритет')}
              </h2>
              <div className="space-y-5">
                {[
                  { icon: <Shield size={18} />, title: t('Verified Professionals', 'Tasdiqlangan mutaxassislar', 'Проверенные специалисты'), desc: t('Every tasker undergoes background checks and identity verification.', "Har bir ijrochi tekshiruvdan o'tadi.", 'Каждый исполнитель проходит проверку.') },
                  { icon: <CheckCircle2 size={18} />, title: t('Secure Payments', 'Xavfsiz to\'lovlar', 'Безопасные платежи'), desc: t('Your payment is held in escrow and only released when work is done.', "To'lov faqat ish bajarilgandan keyin chiqariladi.", 'Оплата удерживается до завершения работы.') },
                  { icon: <Star size={18} />, title: t('Ratings & Reviews', 'Baholar va sharhlar', 'Рейтинги и отзывы'), desc: t('Transparent reviews from real customers help you make informed decisions.', "Haqiqiy mijozlarning sharhlari sizga yordam beradi.", 'Прозрачные отзывы помогают принять решение.') },
                  { icon: <Clock size={18} />, title: t('24/7 Support', 'Doimiy qo\'llab-quvvatlash', 'Поддержка 24/7'), desc: t('Our support team is available around the clock to assist you.', "Bizning qo'llab-quvvatlash jamoamiz doimo tayyor.", 'Наша команда поддержки всегда на связи.') },
                ].map(f => (
                  <div key={f.title} className="flex gap-4 group">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center text-neutral-600 transition-all duration-300">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900">{f.title}</h4>
                      <p className="text-sm text-neutral-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-neutral-50 rounded-3xl p-8 sm:p-10">
                <div className="space-y-4">
                  {[
                    { label: t('Tasks Completed', 'Bajarilgan vazifalar', 'Задач выполнено'), value: '25,847', change: '+12.3%' },
                    { label: t('Active Taskers', 'Faol ijrochilar', 'Активных исполнителей'), value: '1,248', change: '+8.1%' },
                    { label: t('Cities Covered', 'Shaharlarda', 'Городов'), value: '12', change: '+3' },
                    { label: t('Total Revenue', 'Umumiy daromad', 'Общий оборот'), value: '4.2B sum', change: '+18.5%' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between py-3 border-b border-neutral-200/50 last:border-0">
                      <span className="text-sm text-neutral-500">{s.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-900">{s.value}</span>
                        <span className="text-xs text-emerald-600 font-medium">{s.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-neutral-900 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_-20%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                {t('Ready to get started?', 'Boshlashga tayyormisiz?', 'Готовы начать?')}
              </h2>
              <p className="text-neutral-400 max-w-md mx-auto mb-8 text-lg">
                {t('Join thousands of happy customers and professionals on TaskUz.', "TaskUz'da minglab baxtli mijozlar va mutaxassislarga qo'shiling.", 'Присоединяйтесь к тысячам довольных пользователей TaskUz.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="xl" onClick={() => navigate('/auth')} className="!bg-white !text-neutral-900 hover:!bg-neutral-100">
                  {t('Get Started Free', "Bepul boshlang", 'Начать бесплатно')}
                </Button>
                <Button variant="ghost" size="xl" onClick={() => navigate('/tasks')} className="!text-neutral-300 hover:!text-white hover:!bg-white/10">
                  {t('Browse Tasks', 'Vazifalarni ko\'ring', 'Просмотреть задачи')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-neutral-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <span className="font-bold text-neutral-900">TaskUz</span>
            </div>
            <p className="text-xs text-neutral-400">&copy; 2026 TaskUz. {t('All rights reserved.', 'Barcha huquqlar himoyalangan.', 'Все права защищены.')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
