import { Routes, Route, Navigate } from 'react-router-dom';
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

function ProtectedRoute({ children, requireAdmin }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { isAuthenticated, userRole } = useStore();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (requireAdmin && userRole !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>;
}

function ChatLayout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-7xl mx-auto px-6 py-4">{children}</div>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Layout><TaskListPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/new"
        element={
          <ProtectedRoute>
            <Layout><CreateTaskPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/:taskId"
        element={
          <ProtectedRoute>
            <Layout><TaskDetailPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasker/:taskerId"
        element={
          <ProtectedRoute>
            <Layout><TaskerProfilePage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout><DashboardPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <Layout><AdminPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout><ProfilePage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatLayout><ChatPage /></ChatLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <Layout><SupportPage /></Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
