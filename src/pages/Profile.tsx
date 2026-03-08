import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { reviews } from '../data/mockData';
import { Button, Card, Avatar, Rating, Badge, Input, TabBar } from '../components/ui';
import {
  Settings, MapPin, CreditCard, Bell, Shield, LogOut,
  ChevronRight, Star, Clock, CheckCircle2, Edit3, Globe, Phone, Mail
} from 'lucide-react';

export default function ProfilePage() {
  const { logout, userName, userRole, language, setLanguage } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-6 relative overflow-hidden">
        <div className="absolute inset-0 h-24 bg-gradient-to-r from-neutral-900 to-neutral-700" />
        <div className="relative pt-14 flex flex-col sm:flex-row items-start gap-5">
          <Avatar name={userName} size="xl" verified />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-neutral-900">{userName}</h1>
              <Badge variant={userRole === 'tasker' ? 'info' : 'default'} size="md">{userRole === 'tasker' ? 'Tasker' : 'Client'}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span className="flex items-center gap-1"><Phone size={12} /> +998 90 *** ** 67</span>
              <span className="flex items-center gap-1"><Mail size={12} /> user@example.com</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> Tashkent, Uzbekistan</span>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <Rating value={4.8} count={12} />
              <span className="text-xs text-neutral-400 flex items-center gap-1"><Clock size={10} /> Member since Jan 2026</span>
            </div>
          </div>
          <Button variant="outline" size="sm" icon={<Edit3 size={14} />}>Edit Profile</Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card padding="sm">
            <nav className="space-y-0.5">
              {[
                { icon: <Settings size={16} />, label: 'Account Settings', active: true },
                { icon: <MapPin size={16} />, label: 'Addresses' },
                { icon: <CreditCard size={16} />, label: 'Payment Methods' },
                { icon: <Bell size={16} />, label: 'Notifications' },
                { icon: <Shield size={16} />, label: 'Security' },
                { icon: <Globe size={16} />, label: 'Language' },
              ].map(item => (
                <button
                  key={item.label}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer
                    ${item.active ? 'bg-neutral-50 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-neutral-300" />
                </button>
              ))}
              <div className="border-t border-neutral-100 mt-2 pt-2">
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-left text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              </div>
            </nav>
          </Card>
        </div>

        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <TabBar tabs={['Account', 'Reviews', 'Settings']} active={activeTab} onChange={setActiveTab} />
            <div className="mt-6">
              {activeTab === 0 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="First Name" value={userName.split(' ')[0] || userName} />
                    <Input label="Last Name" value={userName.split(' ')[1] || ''} />
                  </div>
                  <Input label="Phone Number" value="+998 90 123 45 67" icon={<Phone size={14} />} />
                  <Input label="Email" value="user@example.com" type="email" icon={<Mail size={14} />} />
                  <Input label="Default Address" value="Chilanzar, Block 7, Tashkent" icon={<MapPin size={14} />} />
                  <div className="flex justify-end pt-2">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl mb-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-neutral-900">4.8</p>
                      <div className="flex gap-0.5 justify-center mt-1">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-400 fill-amber-100'} />)}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">12 reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5,4,3,2,1].map(star => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500 w-3">{star}</span>
                          <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: star === 5 ? '65%' : star === 4 ? '25%' : star === 3 ? '8%' : '2%' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {reviews.map(r => (
                    <div key={r.id} className="flex gap-3 pb-4 border-b border-neutral-100 last:border-0">
                      <Avatar name={r.author} size="sm" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-neutral-900">{r.author}</p>
                          <span className="text-xs text-neutral-400">{r.date}</span>
                        </div>
                        <Rating value={r.rating} size={11} />
                        <p className="text-sm text-neutral-600 mt-1.5">{r.text}</p>
                        <Badge variant="outline" size="sm">{r.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">Language</h3>
                    <div className="flex gap-2">
                      {(['en', 'uz', 'ru'] as const).map(lang => (
                        <Button
                          key={lang}
                          variant={language === lang ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => setLanguage(lang)}
                        >
                          {lang === 'en' ? 'English' : lang === 'uz' ? "O'zbekcha" : 'Русский'}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      {['Push Notifications', 'Email Notifications', 'SMS Notifications'].map(n => (
                        <label key={n} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 cursor-pointer">
                          <span className="text-sm text-neutral-700">{n}</span>
                          <div className="w-10 h-6 bg-neutral-900 rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">Two-Factor Authentication</h3>
                    <Card className="!bg-neutral-50 !border-none">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-200 flex items-center justify-center text-neutral-600">
                            <Shield size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">2FA is disabled</p>
                            <p className="text-xs text-neutral-500">Add an extra layer of security</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
