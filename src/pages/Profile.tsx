import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { loadProfile, saveProfile } from '../lib/auth';
import { fetchProfileById, updateProfileSettings } from '../lib/profileDb';
import { averageRating, fetchReviewsForSubject } from '../lib/taskQueries';
import { Button, Card, Avatar, Rating, Badge, Input, TabBar } from '../components/ui';
import {
  Settings, MapPin, CreditCard, Bell, Shield, LogOut,
  ChevronRight, Edit3, Globe, Phone, Mail
} from 'lucide-react';

interface DbReviewRow {
  id: string;
  rating: number;
  body: string;
  category: string;
  created_at: string;
  author?: { name: string } | null;
}

export default function ProfilePage() {
  const { logout, userName, userRole, language, setLanguage } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [dbReviews, setDbReviews] = useState<DbReviewRow[]>([]);
  const [defaultAddress, setDefaultAddress] = useState('');
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(true);

  const refreshLocal = useCallback(async () => {
    const local = loadProfile();
    if (!local?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [fresh, avg, revs] = await Promise.all([
        fetchProfileById(local.id),
        averageRating(local.id),
        fetchReviewsForSubject(local.id),
      ]);
      if (fresh) {
        saveProfile(fresh);
        setDefaultAddress(fresh.default_address ?? '');
        setNotifyPush(fresh.notify_push !== false);
        setNotifyEmail(fresh.notify_email !== false);
        setNotifySms(fresh.notify_sms !== false);
      }
      setAvgRating(avg);
      setDbReviews(revs as DbReviewRow[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshLocal();
  }, [refreshLocal]);

  const profile = loadProfile();

  const saveAccountFields = async () => {
    if (!profile?.id) return;
    setSaving(true);
    try {
      const updated = await updateProfileSettings(profile.id, { default_address: defaultAddress || null });
      if (updated) saveProfile(updated);
    } finally {
      setSaving(false);
    }
  };

  const saveNotification = async (patch: Partial<{ notify_push: boolean; notify_email: boolean; notify_sms: boolean }>) => {
    if (!profile?.id) return;
    const updated = await updateProfileSettings(profile.id, patch);
    if (updated) saveProfile(updated);
  };

  const toggleNotify = async (key: 'notify_push' | 'notify_email' | 'notify_sms', next: boolean) => {
    if (key === 'notify_push') setNotifyPush(next);
    if (key === 'notify_email') setNotifyEmail(next);
    if (key === 'notify_sms') setNotifySms(next);
    await saveNotification({ [key]: next });
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <Card className="mb-6 relative overflow-hidden">
        <div className="absolute inset-0 h-24 bg-gradient-to-r from-neutral-900 to-neutral-700" />
        <div className="relative pt-14 flex flex-col sm:flex-row items-start gap-5">
          <Avatar name={userName} size="xl" verified />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-neutral-900">{userName}</h1>
              <Badge variant={userRole === 'tasker' ? 'info' : 'default'} size="md">
                {userRole === 'tasker' ? 'Tasker' : 'Client'}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <Phone size={12} /> {profile?.phone ?? '—'}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={12} /> {profile?.email?.trim() || '—'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {defaultAddress.trim() || '—'}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-3">
              {loading ? (
                <span className="text-xs text-neutral-400">Loading…</span>
              ) : avgRating != null ? (
                <Rating value={avgRating} count={dbReviews.length} />
              ) : (
                <span className="text-xs text-neutral-400">No public reviews yet</span>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" icon={<Edit3 size={14} />} disabled>
            Edit Profile
          </Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
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
              ].map((item) => (
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
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-left text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              </div>
            </nav>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <Card>
            <TabBar tabs={['Account', 'Reviews', 'Settings']} active={activeTab} onChange={setActiveTab} />
            <div className="mt-6">
              {activeTab === 0 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="First Name" value={userName.split(' ')[0] || userName} readOnly />
                    <Input label="Last Name" value={userName.split(' ')[1] || ''} readOnly />
                  </div>
                  <Input label="Phone Number" value={profile?.phone ?? ''} icon={<Phone size={14} />} readOnly />
                  <Input label="Email" value={profile?.email ?? ''} type="email" icon={<Mail size={14} />} readOnly />
                  <Input
                    label="Default Address"
                    value={defaultAddress}
                    onChange={setDefaultAddress}
                    placeholder="Street, city…"
                    icon={<MapPin size={14} />}
                  />
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => void saveAccountFields()} disabled={saving}>
                      {saving ? 'Saving…' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4 animate-fade-in">
                  {loading ? (
                    <p className="text-sm text-neutral-500 py-6 text-center">Loading…</p>
                  ) : dbReviews.length === 0 ? (
                    <p className="text-sm text-neutral-500 py-6 text-center">No reviews yet.</p>
                  ) : (
                    dbReviews.map((r) => (
                      <div key={r.id} className="flex gap-3 pb-4 border-b border-neutral-100 last:border-0">
                        <Avatar name={r.author?.name ?? 'User'} size="sm" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-neutral-900">{r.author?.name ?? 'User'}</p>
                            <span className="text-xs text-neutral-400">
                              {new Date(r.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <Rating value={r.rating} size={11} />
                          <p className="text-sm text-neutral-600 mt-1.5">{r.body}</p>
                          {r.category ? (
                            <Badge variant="outline" size="sm">
                              {r.category}
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">Language</h3>
                    <div className="flex gap-2">
                      {(['en', 'uz', 'ru'] as const).map((lang) => (
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
                    <p className="text-xs text-neutral-400 mt-2">Language is stored on this device only.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">Notifications</h3>
                    <p className="text-xs text-neutral-500 mb-3">Saved to your profile in the database.</p>
                    <div className="space-y-3">
                      {[
                        { key: 'notify_push' as const, label: 'Push Notifications', on: notifyPush },
                        { key: 'notify_email' as const, label: 'Email Notifications', on: notifyEmail },
                        { key: 'notify_sms' as const, label: 'SMS Notifications', on: notifySms },
                      ].map((n) => (
                        <label
                          key={n.key}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 cursor-pointer"
                        >
                          <span className="text-sm text-neutral-700">{n.label}</span>
                          <button
                            type="button"
                            onClick={() => void toggleNotify(n.key, !n.on)}
                            className={`w-10 h-6 rounded-full relative transition-colors ${n.on ? 'bg-neutral-900' : 'bg-neutral-200'}`}
                          >
                            <span
                              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${n.on ? 'right-0.5' : 'left-0.5'}`}
                            />
                          </button>
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
                        <Button variant="outline" size="sm" disabled>
                          Enable
                        </Button>
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
