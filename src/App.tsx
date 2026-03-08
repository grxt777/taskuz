import { useStore } from './store/store';
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import { TaskListPage, TaskDetailPage, CreateTaskPage } from './pages/Tasks';
import DashboardPage from './pages/Dashboard';
import AdminPage from './pages/Admin';
import ProfilePage from './pages/Profile';
import TaskerProfilePage from './pages/TaskerProfile';
import ChatPage from './pages/Chat';
import SupportPage from './pages/Support';
import {
  LayoutDashboard, ListTodo, MessageSquare, User,
  Bell, Menu, X, Search, Globe, ChevronDown, HelpCircle, LogOut, Plus
} from 'lucide-react';

function Navigation() {
  const {
    page, setPage, isAuthenticated, userRole, userName, userAvatar,
    language, setLanguage, logout, mobileMenuOpen, setMobileMenuOpen
  } = useStore();

  if (!isAuthenticated || page === 'auth') return null;

  const isAdmin = userRole === 'admin';

  const navItems = isAdmin
    ? [
        { id: 'admin' as const, label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'tasks' as const, label: 'Tasks', icon: <ListTodo size={18} /> },
        { id: 'support' as const, label: 'Support', icon: <HelpCircle size={18} /> },
      ]
    : [
        { id: 'dashboard' as const, label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'tasks' as const, label: 'Tasks', icon: <ListTodo size={18} /> },
        { id: 'chat' as const, label: 'Messages', icon: <MessageSquare size={18} /> },
        { id: 'profile' as const, label: 'Profile', icon: <User size={18} /> },
      ];

  const langLabel = language === 'en' ? 'EN' : language === 'uz' ? 'UZ' : 'RU';

  return (
    <>
      {/* Desktop Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setPage('dashboard')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden flex-shrink-0">
              <img src="/logo.png" alt="TaskUz Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-neutral-900 text-lg tracking-tight hidden sm:block">TaskUz</span>
          </button>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${page === item.id || (item.id === 'tasks' && (page === 'task-detail' || page === 'create-task' || page === 'tasker-profile'))
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

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Language */}
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

            {/* Search */}
            <button className="w-9 h-9 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer hidden sm:flex">
              <Search size={18} />
            </button>

            {/* Notifications */}
            <button className="w-9 h-9 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* New task (client) */}
            {userRole === 'client' && (
              <button
                onClick={() => setPage('create-task')}
                className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Plus size={14} /> New Task
              </button>
            )}

            {/* Avatar */}
            <button onClick={() => setPage('profile')} className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-semibold">
                {userAvatar || userName.charAt(0).toUpperCase()}
              </div>
              <ChevronDown size={12} className="text-neutral-400 hidden sm:block" />
            </button>

            {/* Mobile menu */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-9 h-9 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-600 cursor-pointer">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-neutral-200 shadow-elevated animate-fade-in-down">
            <nav className="p-4 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer
                    ${page === item.id ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <div className="border-t border-neutral-100 pt-2 mt-2">
                <button onClick={() => { setPage('support'); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-100 cursor-pointer">
                  <HelpCircle size={18} /> Help & Support
                </button>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 cursor-pointer">
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

// ─── Page Layout ──────────────────────────────────
function PageLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, page } = useStore();
  const showNav = isAuthenticated && page !== 'auth' && page !== 'home';

  return (
    <div className={showNav ? 'pt-16' : ''}>
      {children}
    </div>
  );
}

// ─── App ──────────────────────────────────────────
export default function App() {
  const { page } = useStore();

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />;
      case 'auth': return <AuthPage />;
      case 'tasks': return <div className="max-w-7xl mx-auto px-6 py-8"><TaskListPage /></div>;
      case 'task-detail': return <div className="max-w-7xl mx-auto px-6 py-8"><TaskDetailPage /></div>;
      case 'create-task': return <div className="max-w-7xl mx-auto px-6 py-8"><CreateTaskPage /></div>;
      case 'dashboard': return <div className="max-w-7xl mx-auto px-6 py-8"><DashboardPage /></div>;
      case 'admin': return <div className="max-w-7xl mx-auto px-6 py-8"><AdminPage /></div>;
      case 'profile': return <div className="max-w-7xl mx-auto px-6 py-8"><ProfilePage /></div>;
      case 'tasker-profile': return <div className="max-w-7xl mx-auto px-6 py-8"><TaskerProfilePage /></div>;
      case 'chat': return <div className="max-w-7xl mx-auto px-6 py-4"><ChatPage /></div>;
      case 'support': return <div className="max-w-7xl mx-auto px-6 py-8"><SupportPage /></div>;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Home page has its own nav */}
      {page === 'home' && <HomeNav />}
      <Navigation />
      <PageLayout>
        {renderPage()}
      </PageLayout>
    </div>
  );
}

// ─── Home Page Navigation ─────────────────────────
function HomeNav() {
  const { setPage, isAuthenticated, language, setLanguage } = useStore();

  const langLabel = language === 'en' ? 'EN' : language === 'uz' ? 'UZ' : 'RU';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => setPage('home')} className="flex items-center gap-2.5 cursor-pointer">
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
            <button onClick={() => setPage('dashboard')} className="h-9 px-4 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => setPage('auth')} className="h-9 px-4 rounded-xl text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer">
                Log In
              </button>
              <button onClick={() => setPage('auth')} className="h-9 px-4 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
