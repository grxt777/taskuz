import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { tasks, taskers, statusConfig } from '../data/mockData';
import { Button, Card, Avatar, Rating, Badge, StatCard, TabBar, PriceRange, LocationBadge, TimeBadge } from '../components/ui';
import {
  Plus, Calendar, DollarSign, TrendingUp, CheckCircle2, Clock,
  MessageSquare, Star, ArrowRight, MapPin, Briefcase, BarChart3, Wallet
} from 'lucide-react';

export default function DashboardPage() {
  const { userRole, userName } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const isTasker = userRole === 'tasker';
  const myTasks = tasks;
  const tabLabels = isTasker ? ['Available', 'My Jobs', 'Completed'] : ['Active', 'Pending', 'History'];

  const filteredTasks = myTasks.filter(t => {
    if (activeTab === 0) return isTasker ? t.status === 'posted' : ['posted', 'assigned', 'in_progress'].includes(t.status);
    if (activeTab === 1) return isTasker ? ['assigned', 'in_progress'].includes(t.status) : t.status === 'posted';
    return t.status === 'completed';
  });

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {isTasker ? 'Here is an overview of your earnings and tasks.' : 'Here is what is happening with your tasks.'}
          </p>
        </div>
        <Button onClick={() => navigate(isTasker ? '/tasks' : '/tasks/new')} icon={isTasker ? <Briefcase size={16} /> : <Plus size={16} />} size="lg">
          {isTasker ? 'Find Tasks' : 'Post a Task'}
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isTasker ? (
          <>
            <StatCard label="Total Earnings" value="4,500,000 sum" change="18.5% this month" changeType="up" icon={<Wallet size={18} />} />
            <StatCard label="Tasks Completed" value="45" change="+5 this week" changeType="up" icon={<CheckCircle2 size={18} />} />
            <StatCard label="Avg Rating" value="4.7" change="+0.2" changeType="up" icon={<Star size={18} />} />
            <StatCard label="Response Time" value="12 min" change="-3 min" changeType="up" icon={<Clock size={18} />} />
          </>
        ) : (
          <>
            <StatCard label="Active Tasks" value="3" icon={<BarChart3 size={18} />} />
            <StatCard label="Completed" value="12" change="+3 this month" changeType="up" icon={<CheckCircle2 size={18} />} />
            <StatCard label="Total Spent" value="2,400,000 sum" icon={<DollarSign size={18} />} />
            <StatCard label="Avg Rating Given" value="4.8" icon={<Star size={18} />} />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main — tasks */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">Tasks</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')} iconRight={<ArrowRight size={14} />}>View All</Button>
              </div>
              <TabBar tabs={tabLabels} active={activeTab} onChange={setActiveTab} />
            </div>
            <div className="p-5 space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-3 text-neutral-300">
                    <Briefcase size={20} />
                  </div>
                  <p className="text-sm font-medium text-neutral-500">No tasks here yet</p>
                  <p className="text-xs text-neutral-400 mt-1">Your tasks will appear here</p>
                </div>
              ) : (
                filteredTasks.map(task => {
                  const sc = statusConfig[task.status];
                  return (
                    <div
                      key={task.id}
                      onClick={() => navigate(`/tasks/${task.id}`)}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={task.status === 'posted' ? 'info' : task.status === 'completed' ? 'success' : 'warning'} size="sm">
                            {sc.label}
                          </Badge>
                        </div>
                        <h3 className="text-sm font-semibold text-neutral-900 truncate group-hover:text-neutral-600 transition-colors">{task.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <LocationBadge address={task.address} />
                          <TimeBadge time={task.created_at} />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <PriceRange min={task.budget_min} max={task.budget_max} />
                        <p className="text-xs text-neutral-400 mt-0.5">{task.scheduled_date}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Earnings / Quick stats (Tasker) */}
          {isTasker && (
            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <TrendingUp size={16} /> Earnings Overview
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Today', value: '150,000 sum' },
                  { label: 'This Week', value: '650,000 sum' },
                  { label: 'This Month', value: '2,800,000 sum' },
                  { label: 'Available Balance', value: '1,200,000 sum' },
                ].map(e => (
                  <div key={e.label} className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
                    <span className="text-sm text-neutral-500">{e.label}</span>
                    <span className="text-sm font-semibold text-neutral-900">{e.value}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" fullWidth className="mt-4" size="sm" icon={<Wallet size={14} />}>
                Withdraw Funds
              </Button>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: <MessageSquare size={16} />, label: 'Messages', badge: '3', onClick: () => navigate('/chat') },
                { icon: <Calendar size={16} />, label: 'Schedule', onClick: () => {} },
                { icon: <Star size={16} />, label: 'Reviews', onClick: () => navigate('/profile') },
                { icon: <MapPin size={16} />, label: 'Addresses', onClick: () => navigate('/profile') },
              ].map(a => (
                <button
                  key={a.label}
                  onClick={a.onClick}
                  className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600">{a.icon}</div>
                    <span className="text-sm font-medium text-neutral-700">{a.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {a.badge && <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-semibold">{a.badge}</span>}
                    <ArrowRight size={14} className="text-neutral-300" />
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Top Recommended (Client) */}
          {!isTasker && (
            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Recommended Taskers</h3>
              <div className="space-y-3">
                {taskers.slice(0, 3).map(tk => (
                  <div key={tk.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer" onClick={() => navigate(`/tasker/${tk.id}`)}>
                    <Avatar name={tk.name} size="sm" verified={tk.is_verified} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">{tk.name}</p>
                      <Rating value={tk.rating} size={10} />
                    </div>
                    <span className="text-xs text-neutral-400">{tk.categories[0]}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
