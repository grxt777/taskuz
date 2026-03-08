import { useState } from 'react';
import { useStore } from '../store/store';
import { categories, tasks, taskers, formatPrice, statusConfig } from '../data/mockData';
import { Button, Card, Avatar, Rating, Badge, Input, TextArea, Select, PriceRange, LocationBadge, TimeBadge, VerifiedBadge } from '../components/ui';
import {
  Search, SlidersHorizontal, MapPin, Clock, ArrowRight, ArrowLeft,
  CheckCircle2, Star, ChevronRight, Plus, Calendar, DollarSign,
  FileText, Image, Award, Sparkles, Wrench, Hammer, Truck, Package,
  Home, Droplets, Zap, Trees, Monitor, UserCheck, Paintbrush,
  LayoutGrid
} from 'lucide-react';

const iconMapSmall: Record<string, React.ReactNode> = {
  sparkles: <Sparkles size={16} />, wrench: <Wrench size={16} />, hammer: <Hammer size={16} />,
  truck: <Truck size={16} />, package: <Package size={16} />, home: <Home size={16} />,
  droplets: <Droplets size={16} />, zap: <Zap size={16} />, trees: <Trees size={16} />,
  monitor: <Monitor size={16} />, 'user-check': <UserCheck size={16} />,
  calendar: <Calendar size={16} />, paintbrush: <Paintbrush size={16} />,
  'layout-grid': <LayoutGrid size={16} />,
};

// ─── Task List Page ───────────────────────────────
export function TaskListPage() {
  const { setPage, setSelectedTaskId, userRole } = useStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || t.category_id === categoryFilter;
    const matchesStatus = !statusFilter || t.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            {userRole === 'tasker' ? 'Available Tasks' : 'Browse Tasks'}
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">{filteredTasks.length} tasks found</p>
        </div>
        {userRole === 'client' && (
          <Button onClick={() => setPage('create-task')} icon={<Plus size={16} />} size="lg">
            Post a Task
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-6" padding="sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              value={search}
              onChange={setSearch}
              placeholder="Search tasks..."
              icon={<Search size={16} />}
            />
          </div>
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="All categories"
            options={categories.map(c => ({ value: c.id, label: c.name_en }))}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All statuses"
            options={[
              { value: 'posted', label: 'Open' },
              { value: 'assigned', label: 'Assigned' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
          <Button variant="outline" icon={<SlidersHorizontal size={16} />}>Filters</Button>
        </div>
      </Card>

      {/* Task cards */}
      <div className="space-y-3">
        {filteredTasks.map((task, i) => {
          const sc = statusConfig[task.status];
          return (
            <Card
              key={task.id}
              hover
              onClick={() => { setSelectedTaskId(task.id); setPage('task-detail'); }}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Left */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={task.status === 'posted' ? 'info' : task.status === 'completed' ? 'success' : task.status === 'in_progress' ? 'warning' : 'default'} size="sm">
                      {sc.label}
                    </Badge>
                    <Badge variant="outline">{task.category_name}</Badge>
                  </div>
                  <h3 className="text-[15px] font-semibold text-neutral-900 mb-1.5 truncate">{task.title}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-1 mb-2">{task.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <LocationBadge address={task.address} distance={task.distance_km} />
                    <TimeBadge time={task.created_at} />
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <Calendar size={12} />
                      <span>{task.scheduled_date} at {task.scheduled_time}</span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
                  <PriceRange min={task.budget_min} max={task.budget_max} />
                  <div className="flex items-center gap-2">
                    <Avatar name={task.client_name} size="sm" />
                    <div className="text-right">
                      <p className="text-xs font-medium text-neutral-700">{task.client_name}</p>
                      <Rating value={task.client_rating} size={10} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Task Detail Page ─────────────────────────────
export function TaskDetailPage() {
  const { setPage, selectedTaskId, setSelectedTaskerId } = useStore();
  const task = tasks.find(t => t.id === selectedTaskId);

  if (!task) return null;

  const sc = statusConfig[task.status];

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto">
      <button onClick={() => setPage('tasks')} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors cursor-pointer">
        <ArrowLeft size={14} /> Back to tasks
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={task.status === 'posted' ? 'info' : task.status === 'completed' ? 'success' : 'warning'}>
                {sc.label}
              </Badge>
              <Badge variant="outline">{task.category_name}</Badge>
              <Badge variant="outline">{task.subcategory_name}</Badge>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight mb-3">{task.title}</h1>
            <p className="text-sm text-neutral-600 leading-relaxed mb-5">{task.description}</p>
            <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} className="text-neutral-400" />
                <span className="text-neutral-500">Date:</span>
                <span className="font-medium text-neutral-900">{task.scheduled_date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-neutral-400" />
                <span className="text-neutral-500">Time:</span>
                <span className="font-medium text-neutral-900">{task.scheduled_time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-neutral-400" />
                <span className="text-neutral-500">Location:</span>
                <span className="font-medium text-neutral-900">{task.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign size={14} className="text-neutral-400" />
                <span className="text-neutral-500">Budget:</span>
                <PriceRange min={task.budget_min} max={task.budget_max} />
              </div>
            </div>
          </Card>

          {/* Client info */}
          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Posted by</h3>
            <div className="flex items-center gap-3">
              <Avatar name={task.client_name} size="lg" />
              <div>
                <p className="font-semibold text-neutral-900">{task.client_name}</p>
                <Rating value={task.client_rating} size={12} />
              </div>
            </div>
          </Card>

          {/* Assigned tasker */}
          {task.tasker_name && (
            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Assigned Tasker</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={task.tasker_name} size="lg" verified />
                  <div>
                    <p className="font-semibold text-neutral-900">{task.tasker_name}</p>
                    <div className="flex items-center gap-2">
                      <Rating value={task.tasker_rating || 0} size={12} />
                      <VerifiedBadge />
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setPage('chat')}>Message</Button>
              </div>
            </Card>
          )}

          {/* Suggested taskers */}
          {task.status === 'posted' && (
            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Recommended Professionals</h3>
              <div className="space-y-3">
                {taskers.slice(0, 3).map(tk => (
                  <div key={tk.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar name={tk.name} size="md" verified={tk.is_verified} />
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{tk.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Rating value={tk.rating} size={11} />
                          <span className="text-xs text-neutral-400">{tk.total_tasks} tasks</span>
                          <span className="text-xs text-neutral-400">{tk.distance_km} km</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-neutral-900">{formatPrice(tk.hourly_rate)}<span className="text-xs text-neutral-400 font-normal">/hr</span></p>
                      <Button variant="primary" size="sm" onClick={() => { setSelectedTaskerId(tk.id); setPage('tasker-profile'); }}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {task.agreed_price && (
            <Card>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Task Price</span>
                  <span className="font-medium text-neutral-900">{formatPrice(task.agreed_price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Platform Fee (20%)</span>
                  <span className="text-neutral-500">{formatPrice(task.agreed_price * 0.2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Tax (12%)</span>
                  <span className="text-neutral-500">{formatPrice(task.agreed_price * 0.12)}</span>
                </div>
                <div className="border-t border-neutral-100 pt-2 flex justify-between text-sm">
                  <span className="font-semibold text-neutral-900">Total</span>
                  <span className="font-bold text-neutral-900">{formatPrice(task.agreed_price)}</span>
                </div>
              </div>
            </Card>
          )}

          <Card className="!bg-neutral-50">
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Actions</h3>
            <div className="space-y-2">
              {task.status === 'posted' && (
                <>
                  <Button fullWidth variant="primary" size="lg">Accept Task</Button>
                  <Button fullWidth variant="outline" size="lg" onClick={() => setPage('chat')}>Send Message</Button>
                </>
              )}
              {task.status === 'assigned' && (
                <Button fullWidth variant="primary" size="lg">Start Timer</Button>
              )}
              {task.status === 'in_progress' && (
                <Button fullWidth variant="primary" size="lg">Complete Task</Button>
              )}
              {task.status === 'completed' && (
                <Button fullWidth variant="primary" size="lg" icon={<Star size={16} />}>Leave Review</Button>
              )}
              <Button fullWidth variant="ghost" size="lg" onClick={() => setPage('support')}>Report Issue</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Create Task Wizard ───────────────────────────
export function CreateTaskPage() {
  const { setPage, language } = useStore();
  const [wizardStep, setWizardStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');

  const steps = ['Category', 'Details', 'Schedule', 'Review'];

  const t = (en: string) => en;

  return (
    <div className="animate-fade-in-up max-w-2xl mx-auto">
      <button onClick={() => setPage('tasks')} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors cursor-pointer">
        <ArrowLeft size={14} /> Back
      </button>

      <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">Post a New Task</h1>
      <p className="text-sm text-neutral-500 mb-8">Describe what you need done and we will find the perfect professional for you.</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
              i <= wizardStep ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-400'
            }`}>
              {i < wizardStep ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className={`hidden sm:block text-xs font-medium ${i <= wizardStep ? 'text-neutral-900' : 'text-neutral-400'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-px ${i < wizardStep ? 'bg-neutral-900' : 'bg-neutral-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Category */}
      {wizardStep === 0 && (
        <Card className="animate-fade-in-up">
          <h2 className="text-lg font-semibold text-neutral-900 mb-1 flex items-center gap-2">
            <FileText size={18} /> Select Category
          </h2>
          <p className="text-sm text-neutral-500 mb-6">Choose the category that best describes your task.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer
                  ${selectedCategory === cat.id
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-100 hover:border-neutral-200'
                  }
                `}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  selectedCategory === cat.id ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {iconMapSmall[cat.icon]}
                </div>
                <span className="text-sm font-medium text-neutral-800 truncate">
                  {language === 'uz' ? cat.name_uz : language === 'ru' ? cat.name_ru : cat.name_en}
                </span>
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={() => wizardStep < 3 && setWizardStep(1)} disabled={!selectedCategory} iconRight={<ArrowRight size={14} />}>
              Continue
            </Button>
          </div>
        </Card>
      )}

      {/* Step 1: Details */}
      {wizardStep === 1 && (
        <Card className="animate-fade-in-up">
          <h2 className="text-lg font-semibold text-neutral-900 mb-1 flex items-center gap-2">
            <FileText size={18} /> Task Details
          </h2>
          <p className="text-sm text-neutral-500 mb-6">Provide a clear description so professionals know what to expect.</p>
          <div className="space-y-4">
            <Input label={t('Task Title')} value={title} onChange={setTitle} placeholder="e.g. Deep cleaning for 3-bedroom apartment" />
            <TextArea label={t('Description')} value={description} onChange={setDescription} placeholder="Describe what you need done in detail..." rows={4} />
            <div className="grid grid-cols-2 gap-4">
              <Input label={t('Min Budget (sum)')} value={budgetMin} onChange={setBudgetMin} placeholder="200,000" type="number" icon={<DollarSign size={14} />} />
              <Input label={t('Max Budget (sum)')} value={budgetMax} onChange={setBudgetMax} placeholder="500,000" type="number" icon={<DollarSign size={14} />} />
            </div>
            <button className="flex items-center gap-2 p-3 rounded-xl border border-dashed border-neutral-300 hover:border-neutral-400 w-full justify-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer">
              <Image size={16} /> Add Photos (optional)
            </button>
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={() => setWizardStep(0)} icon={<ArrowLeft size={14} />}>Back</Button>
            <Button onClick={() => setWizardStep(2)} disabled={!title} iconRight={<ArrowRight size={14} />}>Continue</Button>
          </div>
        </Card>
      )}

      {/* Step 2: Schedule */}
      {wizardStep === 2 && (
        <Card className="animate-fade-in-up">
          <h2 className="text-lg font-semibold text-neutral-900 mb-1 flex items-center gap-2">
            <Calendar size={18} /> Schedule & Location
          </h2>
          <p className="text-sm text-neutral-500 mb-6">When and where should the task be done?</p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label={t('Date')} value={date} onChange={setDate} type="date" />
              <Input label={t('Time')} value={time} onChange={setTime} type="time" />
            </div>
            <Input label={t('Address')} value={address} onChange={setAddress} placeholder="Enter full address" icon={<MapPin size={14} />} />
            <Select
              label={t('City')}
              options={[
                { value: 'tashkent', label: 'Tashkent' },
                { value: 'samarkand', label: 'Samarkand' },
                { value: 'bukhara', label: 'Bukhara' },
              ]}
              placeholder="Select city"
            />
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={() => setWizardStep(1)} icon={<ArrowLeft size={14} />}>Back</Button>
            <Button onClick={() => setWizardStep(3)} iconRight={<ArrowRight size={14} />}>Continue</Button>
          </div>
        </Card>
      )}

      {/* Step 3: Review */}
      {wizardStep === 3 && (
        <Card className="animate-fade-in-up">
          <h2 className="text-lg font-semibold text-neutral-900 mb-1 flex items-center gap-2">
            <CheckCircle2 size={18} /> Review & Submit
          </h2>
          <p className="text-sm text-neutral-500 mb-6">Make sure everything looks correct before posting.</p>
          <div className="space-y-3 bg-neutral-50 rounded-xl p-5">
            <div className="flex justify-between py-2 border-b border-neutral-200/50">
              <span className="text-sm text-neutral-500">Category</span>
              <span className="text-sm font-medium text-neutral-900">{categories.find(c => c.id === selectedCategory)?.name_en || '—'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-200/50">
              <span className="text-sm text-neutral-500">Title</span>
              <span className="text-sm font-medium text-neutral-900">{title || '—'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-200/50">
              <span className="text-sm text-neutral-500">Budget</span>
              <span className="text-sm font-medium text-neutral-900">{budgetMin && budgetMax ? `${Number(budgetMin).toLocaleString()} — ${Number(budgetMax).toLocaleString()} sum` : '—'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-200/50">
              <span className="text-sm text-neutral-500">Date & Time</span>
              <span className="text-sm font-medium text-neutral-900">{date && time ? `${date} at ${time}` : '—'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-neutral-500">Address</span>
              <span className="text-sm font-medium text-neutral-900">{address || '—'}</span>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={() => setWizardStep(2)} icon={<ArrowLeft size={14} />}>Back</Button>
            <Button onClick={() => setPage('tasks')} icon={<CheckCircle2 size={16} />} size="lg">Post Task</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
