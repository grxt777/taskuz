import { useStore } from '../store/store';
import { taskers, formatPrice } from '../data/mockData';
import { Button, Card, Avatar, Rating, Badge, VerifiedBadge } from '../components/ui';
import { ArrowLeft, MapPin, Clock, CheckCircle2, Star, MessageSquare, Award, Briefcase } from 'lucide-react';

export default function TaskerProfilePage() {
  const { setPage, selectedTaskerId } = useStore();
  const tasker = taskers.find(t => t.id === selectedTaskerId) || taskers[0];

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto">
      <button onClick={() => setPage('tasks')} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors cursor-pointer">
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header card */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 h-20 bg-gradient-to-r from-neutral-900 to-neutral-700" />
            <div className="relative pt-12">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <Avatar name={tasker.name} size="xl" verified={tasker.is_verified} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-xl font-bold text-neutral-900">{tasker.name}</h1>
                    <VerifiedBadge />
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-3">{tasker.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tasker.categories.map(c => (
                      <Badge key={c} variant="outline">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <Star size={16} />, label: 'Rating', value: tasker.rating.toFixed(1) },
              { icon: <Briefcase size={16} />, label: 'Tasks Done', value: String(tasker.total_tasks) },
              { icon: <Clock size={16} />, label: 'Response', value: `${tasker.response_time}min` },
              { icon: <CheckCircle2 size={16} />, label: 'Completion', value: `${tasker.completion_rate}%` },
            ].map(s => (
              <Card key={s.label} padding="sm" className="text-center">
                <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center mx-auto mb-2 text-neutral-500">{s.icon}</div>
                <p className="text-lg font-bold text-neutral-900">{s.value}</p>
                <p className="text-xs text-neutral-400">{s.label}</p>
              </Card>
            ))}
          </div>

          {/* Reviews */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-900">Reviews</h3>
              <span className="text-sm text-neutral-400">{tasker.reviews.length} reviews</span>
            </div>
            {/* Rating breakdown */}
            <div className="flex items-center gap-6 p-4 bg-neutral-50 rounded-xl mb-6">
              <div className="text-center shrink-0">
                <p className="text-4xl font-bold text-neutral-900">{tasker.rating}</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= Math.floor(tasker.rating) ? 'text-amber-400 fill-amber-400' : 'text-amber-200 fill-amber-100'} />)}
                </div>
                <p className="text-xs text-neutral-400 mt-1">{tasker.total_tasks} tasks</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500 w-3">{star}</span>
                    <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '8%' : '2%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {tasker.reviews.map(r => (
                <div key={r.id} className="flex gap-3 pb-4 border-b border-neutral-100 last:border-0">
                  <Avatar name={r.author} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-neutral-900">{r.author}</p>
                      <span className="text-xs text-neutral-400">{r.date}</span>
                    </div>
                    <Rating value={r.rating} size={11} />
                    <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">{r.text}</p>
                    <Badge variant="outline" size="sm">{r.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Pricing</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-sm text-neutral-500">Hourly Rate</span>
                <span className="text-sm font-bold text-neutral-900">{formatPrice(tasker.hourly_rate)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-neutral-500">Availability</span>
                <Badge variant="success" size="sm">Available</Badge>
              </div>
            </div>
            <div className="space-y-2 mt-5">
              <Button fullWidth size="lg" onClick={() => setPage('create-task')}>Hire {tasker.name.split(' ')[0]}</Button>
              <Button fullWidth variant="outline" size="lg" onClick={() => setPage('chat')} icon={<MessageSquare size={16} />}>
                Send Message
              </Button>
            </div>
          </Card>

          <Card className="!bg-neutral-50 !border-none">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-200 flex items-center justify-center text-neutral-600">
                <Award size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Top Rated</p>
                <p className="text-xs text-neutral-500">In the top 5% of taskers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-200 flex items-center justify-center text-neutral-600">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{tasker.distance_km} km away</p>
                <p className="text-xs text-neutral-500">Tashkent, Uzbekistan</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
