import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { tasks, taskers, statusConfig } from '../data/mockData';
import { Button, Card, Avatar, Rating, Badge, StatCard, TabBar } from '../components/ui';
import {
  Users, Briefcase, DollarSign, Activity,
  AlertCircle, Eye, Ban, Search
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="md">System Online</Badge>
          <Badge variant="outline" size="md">99.8% Uptime</Badge>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users" value="10,523" change="12.3% this month" changeType="up" icon={<Users size={18} />} />
        <StatCard label="Active Tasks" value="135" change="+15 today" changeType="up" icon={<Briefcase size={18} />} />
        <StatCard label="Revenue (MTD)" value="156M sum" change="18.5%" changeType="up" icon={<DollarSign size={18} />} />
        <StatCard label="Completion Rate" value="95.8%" change="+2.1%" changeType="up" icon={<Activity size={18} />} />
      </div>

      {/* Revenue chart placeholder + Alerts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Revenue Overview</h3>
            <div className="flex gap-1">
              {['7D', '30D', '90D'].map(p => (
                <button key={p} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${p === '30D' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          {/* Chart bars */}
          <div className="flex items-end gap-2 h-48">
            {[45, 62, 38, 71, 55, 83, 67, 92, 75, 88, 65, 95, 72, 80].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-neutral-100 rounded-t-md relative overflow-hidden" style={{ height: `${h}%` }}>
                  <div className="absolute inset-0 bg-neutral-900 rounded-t-md opacity-90" />
                </div>
                {i % 2 === 0 && <span className="text-[9px] text-neutral-400">{i + 1}</span>}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
            <div>
              <p className="text-xs text-neutral-400">Total GMV</p>
              <p className="text-lg font-bold text-neutral-900">780M sum</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">Commission</p>
              <p className="text-lg font-bold text-neutral-900">156M sum</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">Avg Task Value</p>
              <p className="text-lg font-bold text-neutral-900">420K sum</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <AlertCircle size={16} /> System Alerts
          </h3>
          <div className="space-y-3">
            {[
              { type: 'warning', msg: 'Tasker churn increased 15% this week', time: '2h ago' },
              { type: 'error', msg: '3 payment failures in last hour', time: '45m ago' },
              { type: 'info', msg: 'New category request: Pet Care', time: '3h ago' },
              { type: 'success', msg: 'Milestone: 10K users reached', time: '1d ago' },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  a.type === 'error' ? 'bg-red-500' : a.type === 'warning' ? 'bg-amber-500' : a.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-xs font-medium text-neutral-700">{a.msg}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Management tabs */}
      <Card padding="none">
        <div className="p-5 pb-0">
          <TabBar tabs={['Tasks', 'Users', 'Taskers', 'Revenue']} active={activeTab} onChange={setActiveTab} />
        </div>

        {activeTab === 0 && (
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input placeholder="Search tasks..." className="w-full h-10 bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:border-neutral-300" />
              </div>
              <Button variant="outline" size="sm">Export</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left py-3 px-3 font-medium text-neutral-500 text-xs">Task</th>
                    <th className="text-left py-3 px-3 font-medium text-neutral-500 text-xs">Client</th>
                    <th className="text-left py-3 px-3 font-medium text-neutral-500 text-xs">Tasker</th>
                    <th className="text-left py-3 px-3 font-medium text-neutral-500 text-xs">Status</th>
                    <th className="text-right py-3 px-3 font-medium text-neutral-500 text-xs">Amount</th>
                    <th className="text-right py-3 px-3 font-medium text-neutral-500 text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => {
                    const sc = statusConfig[task.status];
                    return (
                      <tr key={task.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                        <td className="py-3 px-3">
                          <p className="font-medium text-neutral-900 truncate max-w-[200px]">{task.title}</p>
                          <p className="text-xs text-neutral-400">{task.category_name}</p>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={task.client_name} size="sm" />
                            <span className="text-neutral-700">{task.client_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {task.tasker_name ? (
                            <div className="flex items-center gap-2">
                              <Avatar name={task.tasker_name} size="sm" />
                              <span className="text-neutral-700">{task.tasker_name}</span>
                            </div>
                          ) : (
                            <span className="text-neutral-300">—</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant={task.status === 'posted' ? 'info' : task.status === 'completed' ? 'success' : task.status === 'in_progress' ? 'warning' : 'default'}>
                            {sc.label}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-right font-medium text-neutral-900">
                          {new Intl.NumberFormat().format(task.agreed_price || task.budget_min)} sum
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button onClick={() => navigate(`/tasks/${task.id}`)} className="text-neutral-400 hover:text-neutral-600 cursor-pointer">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="p-5">
            <div className="space-y-3">
              {['Ahmad K.', 'Malika R.', 'Sardor T.', 'Nilufar M.', 'Bobur A.'].map((name, i) => (
                <div key={name} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar name={name} size="md" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{name}</p>
                      <p className="text-xs text-neutral-400">Client · Joined {5 - i} months ago · {3 + i} tasks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Rating value={4.5 + i * 0.1} size={11} />
                    <Button variant="ghost" size="sm"><Eye size={14} /></Button>
                    <Button variant="ghost" size="sm" className="!text-red-500 hover:!bg-red-50"><Ban size={14} /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="p-5">
            <div className="space-y-3">
              {taskers.map(tk => (
                <div key={tk.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar name={tk.name} size="md" verified={tk.is_verified} />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{tk.name}</p>
                      <p className="text-xs text-neutral-400">{tk.categories.join(', ')} · {tk.total_tasks} tasks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Rating value={tk.rating} size={11} />
                    <Badge variant={tk.is_verified ? 'success' : 'warning'} size="sm">
                      {tk.is_verified ? 'Verified' : 'Pending'}
                    </Badge>
                    <Button variant="ghost" size="sm"><Eye size={14} /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="p-5">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total GMV', value: '780M sum', sub: 'Gross Merchandise Value' },
                { label: 'Net Revenue', value: '156M sum', sub: '20% Platform Commission' },
                { label: 'Tax Collected', value: '93.6M sum', sub: '12% PNP Withheld' },
              ].map(s => (
                <div key={s.label} className="p-4 bg-neutral-50 rounded-xl text-center">
                  <p className="text-xs text-neutral-400 mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-neutral-900">{s.value}</p>
                  <p className="text-[10px] text-neutral-400 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-neutral-900 mb-3">Revenue by Category</h4>
              {[
                { name: 'Cleaning', amount: '90M sum', pct: 57.7 },
                { name: 'Moving Help', amount: '30M sum', pct: 19.2 },
                { name: 'Home Repair', amount: '18M sum', pct: 11.5 },
                { name: 'Plumbing', amount: '10M sum', pct: 6.4 },
                { name: 'Other', amount: '8M sum', pct: 5.1 },
              ].map(c => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-sm text-neutral-600 w-24">{c.name}</span>
                  <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-neutral-900 rounded-full transition-all" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="text-sm font-medium text-neutral-900 w-20 text-right">{c.amount}</span>
                  <span className="text-xs text-neutral-400 w-12 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
