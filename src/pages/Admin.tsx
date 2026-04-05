import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { tasks, taskers, statusConfig } from '../lib/taskDisplay';
import { Button, Card, Avatar, Rating, Badge, StatCard, TabBar } from '../components/ui';
import {
  Users, Briefcase, DollarSign, Activity,
  AlertCircle, Eye, Search
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
          <Badge variant="outline" size="md">Admin</Badge>
        </div>
      </div>

      {/* KPI Row — подключите аналитику / API */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users" value="—" change="No data" changeType="neutral" icon={<Users size={18} />} />
        <StatCard label="Active Tasks" value="—" change="No data" changeType="neutral" icon={<Briefcase size={18} />} />
        <StatCard label="Revenue (MTD)" value="—" change="No data" changeType="neutral" icon={<DollarSign size={18} />} />
        <StatCard label="Completion Rate" value="—" change="No data" changeType="neutral" icon={<Activity size={18} />} />
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
          <div className="flex items-center justify-center h-48 rounded-xl bg-neutral-50 text-sm text-neutral-500">
            No revenue data yet
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
            <div>
              <p className="text-xs text-neutral-400">Total GMV</p>
              <p className="text-lg font-bold text-neutral-900">—</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">Commission</p>
              <p className="text-lg font-bold text-neutral-900">—</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">Avg Task Value</p>
              <p className="text-lg font-bold text-neutral-900">—</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <AlertCircle size={16} /> System Alerts
          </h3>
          <p className="text-sm text-neutral-500">No alerts.</p>
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
                  {tasks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-sm text-neutral-500">No tasks in the system yet.</td>
                    </tr>
                  )}
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
            <p className="text-sm text-neutral-500 py-8 text-center">No users loaded. Connect profiles API to list clients.</p>
          </div>
        )}

        {activeTab === 2 && (
          <div className="p-5">
            <div className="space-y-3">
              {taskers.length === 0 && (
                <p className="text-sm text-neutral-500 py-8 text-center">No taskers in the system yet.</p>
              )}
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
            <p className="text-sm text-neutral-500 py-8 text-center">Revenue breakdown will appear when billing data is connected.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
