import { useStore } from './store/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import {
  LayoutDashboard, ListTodo, MessageSquare, User,
  Bell, Menu, X, Search, Globe, ChevronDown, HelpCircle, LogOut, Plus
} from 'lucide-react';

function Navigation() {
  const {
    isAuthenticated, userRole, userName, userAvatar,
    language, setLanguage, logout, mobileMenuOpen, setMobileMenuOpen
  } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  if (!isAuthenticated || path === '/auth') return null;

  const isAdmin = userRole === 'admin';

  const navItems = isAdmin
    ? [
        { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { path: '/tasks', label: 'Tasks', icon: <ListTodo size={18} /> },
        { path: '/support', label: 'Support', icon: <HelpCircle size={18} /> },
      ]
    : [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { path: '/tasks', label: 'Tasks', icon: <ListTodo size={18} /> },
        { path: '/chat', label: 'Messages', icon: <MessageSquare size={18} /> },
        { path: '/profile', label: 'Profile', icon: <User size={18} /> },
      ];

  const isActive = (itemPath: string) => {
    if (itemPath === '/tasks') {
      return path === '/tasks' || path.startsWith('/tasks/') || path.startsWith('/tasker/');
    }
    return path === itemPath || path.startsWith(itemPath + '/');
  };

  const langLabel = language === 'en' ? 'EN' : language === 'uz' ? 'UZ' : 'RU';

  const handleNav = (to: string) => {
    navigate(to);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate(isAdmin ? '/admin' : '/dashboard')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden flex-shrink-0">
              <img src="/logo.png" alt="TaskUz Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-neutral-900 text-lg tracking-tight hidden sm:block">TaskUz</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${isActive(item.path)
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="flex items-center gap-1 h-9 px-2.5 rounded-lg text-xs font-medium text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer">
                <Globe size={14} />
                <span>{langLabel}</span>
                <ChevronDown size={12} />
              </button>
              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-neutral-200 rounded-xl shadow-elevated py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {(['en', 'uz', 'ru'] as const).map(l => (
                  <button key={l} onClick={() => setLanguage(l)} className={`w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors ${language === l ? 'bg-neutral-50 font-medium text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                    {l === 'en' ? 'English' : l === 'uz' ? "O'zbekcha" : 'Русский'}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-9 h-9 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer hidden sm:flex">
              <Search size={18} />
            </button>

            <button className="w-9 h-9 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {userRole === 'client' && (
              <button
                onClick={() => navigate('/tasks/new')}
                className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Plus size={14} /> New Task
              </button>
            )}

            <button onClick={() => navigate('/profile')} className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-semibold">
                {userAvatar || userName.charAt(0).toUpperCase()}
              </div>
              <ChevronDown size={12} className="text-neutral-400 hidden sm:block" />
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-9 h-9 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-600 cursor-pointer">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-neutral-200 shadow-elevated animate-fade-in-down">
            <nav className="p-4 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer
                    ${isActive(item.path) ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <div className="border-t border-neutral-100 pt-2 mt-2">
                <button onClick={() => handleNav('/support')} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-100 cursor-pointer">
                  <HelpCircle size={18} /> Help & Support
                </button>
                <button onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 cursor-pointer">
                  <LogOut size={18} /> Log Out
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  const location = useLocation();
  const showNav = isAuthenticated && location.pathname !== '/auth' && location.pathname !== '/';

  return (
    <div className={showNav ? 'pt-16' : ''}>
      {children}
    </div>
  );
}

function HomeNav() {
  const { isAuthenticated, language, setLanguage } = useStore();
  const navigate = useNavigate();

  const langLabel = language === 'en' ? 'EN' : language === 'uz' ? 'UZ' : 'RU';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <span className="font-bold text-neutral-900 text-lg tracking-tight">TaskUz</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-1 h-9 px-2.5 rounded-lg text-xs font-medium text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer">
              <Globe size={14} /> {langLabel} <ChevronDown size={12} />
            </button>
            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-neutral-200 rounded-xl shadow-elevated py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {(['en', 'uz', 'ru'] as const).map(l => (
                <button key={l} onClick={() => setLanguage(l)} className={`w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors ${language === l ? 'bg-neutral-50 font-medium text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50'}`}>
                  {l === 'en' ? 'English' : l === 'uz' ? "O'zbekcha" : 'Русский'}
                </button>
              ))}
            </div>
          </div>

          {isAuthenticated ? (
            <button onClick={() => navigate('/dashboard')} className="h-9 px-4 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/auth')} className="h-9 px-4 rounded-xl text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer">
                Log In
              </button>
              <button onClick={() => navigate('/auth')} className="h-9 px-4 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const location = useLocation();
  const showHomeNav = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white">
      {showHomeNav && <HomeNav />}
      <Navigation />
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </div>
  );
}
