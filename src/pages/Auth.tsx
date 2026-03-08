import { useState } from 'react';
import { useStore } from '../store/store';
import { Button, Input } from '../components/ui';
import { Phone, ArrowRight, ArrowLeft, Lock, User, Briefcase } from 'lucide-react';

type AuthStep = 'phone' | 'otp' | 'role' | 'profile';

export default function AuthPage() {
  const { login, setPage, language } = useStore();
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('+998');
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState<'client' | 'tasker'>('client');
  const [name, setName] = useState('');

  const t = (en: string, uz: string, ru: string) => {
    if (language === 'uz') return uz;
    if (language === 'ru') return ru;
    return en;
  };

  const handlePhoneSubmit = () => {
    if (phone.length >= 13) setStep('otp');
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) setStep('role');
  };

  const handleRoleSubmit = () => {
    setStep('profile');
  };

  const handleProfileSubmit = () => {
    login(selectedRole, name || 'User');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left — branding panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />
        <div className="relative flex flex-col justify-between p-12 w-full">
          <button onClick={() => setPage('home')} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-neutral-900 text-sm font-bold">T</span>
            </div>
            <span className="text-white font-bold text-lg">TaskUz</span>
          </button>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">
              {t('The smarter way to get things done.', "Ishlarni bajarish uchun aqlli yo'l.", 'Умный способ решать задачи.')}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
              {t(
                'Join the largest marketplace for local services in Uzbekistan. Trusted by thousands.',
                "O'zbekistondagi eng katta mahalliy xizmatlar bozoriga qo'shiling.",
                'Присоединяйтесь к крупнейшей площадке местных услуг в Узбекистане.'
              )}
            </p>
            <div className="flex items-center gap-6 pt-4">
              {[
                { n: '10K+', l: t('Users', 'Foydalanuvchilar', 'Пользователей') },
                { n: '4.8', l: t('Rating', 'Reyting', 'Рейтинг') },
                { n: '95%', l: t('Success', 'Muvaffaqiyat', 'Успех') },
              ].map(m => (
                <div key={m.l}>
                  <p className="text-2xl font-bold text-white">{m.n}</p>
                  <p className="text-xs text-neutral-500">{m.l}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-neutral-600">&copy; 2026 TaskUz</p>
        </div>
      </div>

      {/* Right — auth form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <button onClick={() => setPage('home')} className="lg:hidden flex items-center gap-2 mb-10 cursor-pointer">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">T</span>
            </div>
            <span className="text-neutral-900 font-bold text-lg">TaskUz</span>
          </button>

          {/* ── Step: Phone ── */}
          {step === 'phone' && (
            <div className="animate-fade-in-up">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
                {t('Welcome back', 'Xush kelibsiz', 'Добро пожаловать')}
              </h1>
              <p className="text-sm text-neutral-500 mb-8">
                {t('Enter your phone number to get started.', "Boshlash uchun telefon raqamingizni kiriting.", 'Введите номер телефона.')}
              </p>
              <Input
                label={t('Phone Number', 'Telefon raqami', 'Номер телефона')}
                value={phone}
                onChange={setPhone}
                placeholder="+998 90 123 45 67"
                icon={<Phone size={16} />}
                hint={t('We will send a verification code', "Tasdiqlash kodini yuboramiz", 'Мы отправим код подтверждения')}
              />
              <Button
                size="xl"
                fullWidth
                onClick={handlePhoneSubmit}
                disabled={phone.length < 13}
                iconRight={<ArrowRight size={16} />}
                className="mt-6"
              >
                {t('Continue', 'Davom etish', 'Продолжить')}
              </Button>
              <p className="text-xs text-neutral-400 text-center mt-6">
                {t('By continuing, you agree to our', "Davom etib, siz rozilik bildirasiz", 'Продолжая, вы соглашаетесь с')}{' '}
                <span className="text-neutral-600 underline cursor-pointer">{t('Terms', 'Shartlar', 'Условиями')}</span>{' '}
                {t('and', 'va', 'и')}{' '}
                <span className="text-neutral-600 underline cursor-pointer">{t('Privacy Policy', 'Maxfiylik siyosati', 'Политикой конфиденциальности')}</span>
              </p>
            </div>
          )}

          {/* ── Step: OTP ── */}
          {step === 'otp' && (
            <div className="animate-fade-in-up">
              <button onClick={() => setStep('phone')} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors cursor-pointer">
                <ArrowLeft size={14} /> {t('Back', 'Orqaga', 'Назад')}
              </button>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
                {t('Verification code', 'Tasdiqlash kodi', 'Код подтверждения')}
              </h1>
              <p className="text-sm text-neutral-500 mb-8">
                {t('Enter the 6-digit code sent to', "Yuborilgan 6 xonali kodni kiriting", 'Введите 6-значный код, отправленный на')} <span className="font-medium text-neutral-900">{phone}</span>
              </p>
              <Input
                label={t('Verification Code', 'Tasdiqlash kodi', 'Код подтверждения')}
                value={otp}
                onChange={(v) => setOtp(v.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                icon={<Lock size={16} />}
              />
              <Button
                size="xl"
                fullWidth
                onClick={handleOtpSubmit}
                disabled={otp.length < 6}
                iconRight={<ArrowRight size={16} />}
                className="mt-6"
              >
                {t('Verify', 'Tasdiqlash', 'Подтвердить')}
              </Button>
              <button className="w-full text-center text-sm text-neutral-500 hover:text-neutral-900 mt-4 transition-colors cursor-pointer">
                {t('Resend code', 'Kodni qayta yuborish', 'Отправить код повторно')}
              </button>
            </div>
          )}

          {/* ── Step: Role ── */}
          {step === 'role' && (
            <div className="animate-fade-in-up">
              <button onClick={() => setStep('otp')} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors cursor-pointer">
                <ArrowLeft size={14} /> {t('Back', 'Orqaga', 'Назад')}
              </button>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
                {t('How will you use TaskUz?', 'TaskUz\'dan qanday foydalanasiz?', 'Как вы будете использовать TaskUz?')}
              </h1>
              <p className="text-sm text-neutral-500 mb-8">
                {t('You can always switch roles later.', "Keyinroq rolni o'zgartira olasiz.", 'Вы всегда можете сменить роль позже.')}
              </p>
              <div className="space-y-3">
                {[
                  { role: 'client' as const, icon: <User size={20} />, title: t('I need help', "Menga yordam kerak", 'Мне нужна помощь'), desc: t('Post tasks and hire verified professionals.', "Vazifalarni joylashtiring va mutaxassislarni yollang.", 'Публикуйте задачи и нанимайте проверенных специалистов.') },
                  { role: 'tasker' as const, icon: <Briefcase size={20} />, title: t('I want to earn', "Men ishlashni xohlayman", 'Хочу зарабатывать'), desc: t('Browse tasks near you and earn money.', "Yaqin atrofdagi vazifalarni ko'ring va pul ishlang.", 'Находите задачи рядом и зарабатывайте.') },
                ].map(r => (
                  <button
                    key={r.role}
                    onClick={() => setSelectedRole(r.role)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer
                      ${selectedRole === r.role
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }
                    `}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200
                      ${selectedRole === r.role ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'}
                    `}>
                      {r.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">{r.title}</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                size="xl"
                fullWidth
                onClick={handleRoleSubmit}
                iconRight={<ArrowRight size={16} />}
                className="mt-6"
              >
                {t('Continue', 'Davom etish', 'Продолжить')}
              </Button>
            </div>
          )}

          {/* ── Step: Profile ── */}
          {step === 'profile' && (
            <div className="animate-fade-in-up">
              <button onClick={() => setStep('role')} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors cursor-pointer">
                <ArrowLeft size={14} /> {t('Back', 'Orqaga', 'Назад')}
              </button>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
                {t('Complete your profile', 'Profilingizni to\'ldiring', 'Заполните профиль')}
              </h1>
              <p className="text-sm text-neutral-500 mb-8">
                {t('Tell us a bit about yourself.', "O'zingiz haqingizda ozgina ayting.", 'Расскажите немного о себе.')}
              </p>
              <div className="space-y-4">
                <Input
                  label={t('Full Name', 'To\'liq ism', 'Полное имя')}
                  value={name}
                  onChange={setName}
                  placeholder={t('Enter your full name', 'Ismingizni kiriting', 'Введите полное имя')}
                  icon={<User size={16} />}
                />
                <Input
                  label={t('Email', 'Email', 'Email')}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <Button
                size="xl"
                fullWidth
                onClick={handleProfileSubmit}
                disabled={!name.trim()}
                iconRight={<ArrowRight size={16} />}
                className="mt-6"
              >
                {t('Get Started', 'Boshlash', 'Начать')}
              </Button>
            </div>
          )}

          {/* Step progress */}
          <div className="flex justify-center gap-2 mt-10">
            {['phone', 'otp', 'role', 'profile'].map((s, i) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all duration-300 ${
                  ['phone', 'otp', 'role', 'profile'].indexOf(step) >= i
                    ? 'w-8 bg-neutral-900'
                    : 'w-4 bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
