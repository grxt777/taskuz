import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { loadProfile } from '../lib/auth';
import { statusConfig, formatPrice } from '../lib/taskDisplay';
import {
  fetchDashboardDataForClient,
  fetchDashboardDataForTasker,
  fetchTaskerSummaries,
  type TaskerSummary,
} from '../lib/taskQueries';
import type { Task } from '../store/store';
import { Button, Card, Avatar, Rating, Badge, StatCard, TabBar, PriceRange, LocationBadge, TimeBadge } from '../components/ui';
import {
  Plus, Calendar, DollarSign, CheckCircle2, Clock,
  MessageSquare, Star, ArrowRight, MapPin, Briefcase, BarChart3, Wallet
} from 'lucide-react';

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(): Date {
  const d = startOfToday();
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function startOfMonth(): Date {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function sumEarningsSince(tasks: Task[], from: Date): number {
  return tasks
    .filter((t) => t.status === 'completed' && (t.agreed_price ?? 0) > 0)
    .filter((t) => {
      const raw = t.completed_at || t.updated_at || t.created_at;
      return new Date(raw) >= from;
    })
    .reduce((s, t) => s + (t.agreed_price ?? 0), 0);
}

export default function DashboardPage() {
  const { userRole, userName, refreshProfileFromServer } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clientTasks, setClientTasks] = useState<Task[]>([]);
  const [avgGiven, setAvgGiven] = useState<number | null>(null);
  const [openTasks, setOpenTasks] = useState<Task[]>([]);
  const [taskerMine, setTaskerMine] = useState<Task[]>([]);
  const [taskerAvg, setTaskerAvg] = useState<number | null>(null);
  const [recommended, setRecommended] = useState<TaskerSummary[]>([]);

  const isTasker = userRole === 'tasker';
  const tabLabels = isTasker ? ['Available', 'My Jobs', 'Completed'] : ['Active', 'Pending', 'History'];

  useEffect(() => {
    void refreshProfileFromServer();
  }, [refreshProfileFromServer]);

  useEffect(() => {
    const profile = loadProfile();
    if (!profile?.id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        if (profile.role === 'tasker') {
          const d = await fetchDashboardDataForTasker(profile.id);
          if (cancelled) return;
          setOpenTasks(d.open);
          setTaskerMine(d.mine);
          setTaskerAvg(d.avgRating);
          setRecommended([]);
        } else {
          const d = await fetchDashboardDataForClient(profile.id);
          const rec = await fetchTaskerSummaries(6);
          if (cancelled) return;
          setClientTasks(d.tasks);
          setAvgGiven(d.avgGiven);
          setRecommended(rec);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userRole]);

  const filteredTasks = useMemo(() => {
    if (isTasker) {
      if (activeTab === 0) return openTasks;
      if (activeTab === 1) return taskerMine.filter((t) => ['assigned', 'in_progress'].includes(t.status));
      return taskerMine.filter((t) => t.status === 'completed');
    }
    if (activeTab === 0)
      return clientTasks.filter((t) => ['posted', 'assigned', 'in_progress'].includes(t.status));
    if (activeTab === 1) return clientTasks.filter((t) => t.status === 'posted');
    return clientTasks.filter((t) => t.status === 'completed');
  }, [isTasker, activeTab, openTasks, taskerMine, clientTasks]);

  const clientStats = useMemo(() => {
    const active = clientTasks.filter((t) => ['posted', 'assigned', 'in_progress'].includes(t.status)).length;
    const completed = clientTasks.filter((t) => t.status === 'completed').length;
    const spent = clientTasks
      .filter((t) => t.status === 'completed' && t.agreed_price != null)
      .reduce((s, t) => s + (t.agreed_price ?? 0), 0);
    return { active, completed, spent, avgGiven };
  }, [clientTasks, avgGiven]);

  const taskerCompleted = useMemo(
    () => taskerMine.filter((t) => t.status === 'completed'),
    [taskerMine]
  );

  const taskerStats = useMemo(() => {
    const earnings = taskerCompleted.reduce((s, t) => s + (t.agreed_price ?? 0), 0);
    const today = sumEarningsSince(taskerCompleted, startOfToday());
    const week = sumEarningsSince(taskerCompleted, startOfWeek());
    const month = sumEarningsSince(taskerCompleted, startOfMonth());
    return {
      earnings,
      today,
      week,
      month,
      completedCount: taskerCompleted.length,
      avgRating: taskerAvg,
    };
  }, [taskerCompleted, taskerAvg]);

  const fmt = (n: number) => (n > 0 ? formatPrice(n) : '—');
  const fmtNum = (n: number | null) => (n != null ? String(n) : '—');

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Welcome back, {userName}</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {isTasker ? 'Overview of your earnings and tasks from the database.' : 'Your tasks from the database.'}
          </p>
        </div>
        <Button onClick={() => navigate(isTasker ? '/tasks' : '/tasks/new')} icon={isTasker ? <Briefcase size={16} /> : <Plus size={16} />} size="lg">
          {isTasker ? 'Find Tasks' : 'Post a Task'}
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          <p className="col-span-full text-sm text-neutral-500">Loading…</p>
        ) : isTasker ? (
          <>
            <StatCard label="Total Earnings" value={fmt(taskerStats.earnings)} change="All completed tasks" changeType="neutral" icon={<Wallet size={18} />} />
            <StatCard label="Tasks Completed" value={String(taskerStats.completedCount)} change="Assigned to you" changeType="neutral" icon={<CheckCircle2 size={18} />} />
            <StatCard label="Avg Rating" value={fmtNum(taskerStats.avgRating)} change="From reviews" changeType="neutral" icon={<Star size={18} />} />
            <StatCard label="Response Time" value="—" change="Not tracked yet" changeType="neutral" icon={<Clock size={18} />} />
          </>
        ) : (
          <>
            <StatCard label="Active Tasks" value={String(clientStats.active)} icon={<BarChart3 size={18} />} />
            <StatCard label="Completed" value={String(clientStats.completed)} changeType="neutral" change="All time" icon={<CheckCircle2 size={18} />} />
            <StatCard label="Total Spent" value={clientStats.spent > 0 ? formatPrice(clientStats.spent) : '—'} icon={<DollarSign size={18} />} />
            <StatCard label="Avg Rating Given" value={fmtNum(clientStats.avgGiven)} icon={<Star size={18} />} />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">Tasks</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')} iconRight={<ArrowRight size={14} />}>
                  View All
                </Button>
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
                  <p className="text-xs text-neutral-400 mt-1">Create a task or pick one from the list</p>
                </div>
              ) : (
                filteredTasks.map((task) => {
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

        <div className="space-y-5">
          {isTasker && (
            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <DollarSign size={16} /> Earnings Overview
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Today', value: fmt(taskerStats.today) },
                  { label: 'This Week', value: fmt(taskerStats.week) },
                  { label: 'This Month', value: fmt(taskerStats.month) },
                  { label: 'Total (completed)', value: fmt(taskerStats.earnings) },
                ].map((e) => (
                  <div key={e.label} className="flex justify-between py-2 border-b border-neutral-100 last:border-0">
                    <span className="text-sm text-neutral-500">{e.label}</span>
                    <span className="text-sm font-semibold text-neutral-900">{e.value}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" fullWidth className="mt-4" size="sm" icon={<Wallet size={14} />} disabled>
                Withdraw Funds
              </Button>
              <p className="text-[11px] text-neutral-400 mt-2 text-center">Payouts when billing is connected</p>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: <MessageSquare size={16} />, label: 'Messages', onClick: () => navigate('/chat') },
                { icon: <Calendar size={16} />, label: 'Schedule', onClick: () => navigate('/tasks') },
                { icon: <Star size={16} />, label: 'Reviews', onClick: () => navigate('/profile') },
                { icon: <MapPin size={16} />, label: 'Addresses', onClick: () => navigate('/profile') },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={a.onClick}
                  className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600">{a.icon}</div>
                    <span className="text-sm font-medium text-neutral-700">{a.label}</span>
                  </div>
                  <ArrowRight size={14} className="text-neutral-300" />
                </button>
              ))}
            </div>
          </Card>

          {!isTasker && (
            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Recommended Taskers</h3>
              <div className="space-y-3">
                {recommended.length === 0 ? (
                  <p className="text-sm text-neutral-500 py-4 text-center">No taskers yet</p>
                ) : (
                  recommended.slice(0, 6).map((tk) => (
                    <div
                      key={tk.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/tasker/${tk.id}`)}
                    >
                      <Avatar name={tk.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 truncate">{tk.name}</p>
                        {tk.rating > 0 ? <Rating value={tk.rating} size={10} /> : <span className="text-[10px] text-neutral-400">No reviews</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
