import { useState, type ReactNode } from 'react';
import {
  Star, ChevronRight, CheckCircle2, Shield, MapPin, Clock,
  ArrowRight, ChevronDown, X, Eye, EyeOff
} from 'lucide-react';

// ─── Badge ────────────────────────────────────────
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  const base = 'inline-flex items-center font-medium rounded-full';
  const sizes = { sm: 'px-2 py-0.5 text-[11px] tracking-wide', md: 'px-3 py-1 text-xs' };
  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    error: 'bg-red-50 text-red-600',
    info: 'bg-blue-50 text-blue-700',
    outline: 'border border-neutral-200 text-neutral-600',
  };
  return <span className={`${base} ${sizes[size]} ${variants[variant]}`}>{children}</span>;
}

// ─── Button ───────────────────────────────────────
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
}

export function Button({
  children, onClick, variant = 'primary', size = 'md',
  fullWidth, disabled, icon, iconRight, className = ''
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-[10px] select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 shadow-sm hover:shadow-md',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
    outline: 'border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizes = {
    sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-lg',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-11 px-5 text-sm gap-2',
    xl: 'h-12 px-6 text-[15px] gap-2.5 rounded-xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}

// ─── Input ────────────────────────────────────────
interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
  icon?: ReactNode;
  error?: string;
  hint?: string;
  className?: string;
  readOnly?: boolean;
}

export function Input({
  label, placeholder, value, onChange, type = 'text',
  icon, error, hint, className = '', readOnly
}: InputProps) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-neutral-700">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">{icon}</div>}
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-11 border rounded-[10px] text-sm text-neutral-900 placeholder-neutral-400 transition-all duration-200 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100
            ${readOnly ? 'bg-neutral-50 cursor-default' : 'bg-white'}
            ${icon ? 'pl-10 pr-4' : 'px-4'}
            ${isPassword ? 'pr-10' : ''}
            ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-50' : 'border-neutral-200 hover:border-neutral-300'}
          `}
        />
        {isPassword && (
          <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

// ─── TextArea ─────────────────────────────────────
interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  rows?: number;
  className?: string;
}

export function TextArea({ label, placeholder, value, onChange, rows = 4, className = '' }: TextAreaProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-neutral-700">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-white border border-neutral-200 rounded-[10px] px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-all duration-200 hover:border-neutral-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 resize-none"
      />
    </div>
  );
}

// ─── Select ───────────────────────────────────────
interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export function Select({ label, value, onChange, options, placeholder, className = '' }: SelectProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-neutral-700">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-11 bg-white border border-neutral-200 rounded-[10px] px-4 text-sm text-neutral-900 transition-all duration-200 hover:border-neutral-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 appearance-none cursor-pointer"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────
interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', onClick, hover = false, padding = 'md' }: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-neutral-200/70 rounded-2xl transition-all duration-300
        ${paddings[padding]}
        ${hover ? 'hover:shadow-premium-hover hover:border-neutral-300/70 hover:-translate-y-0.5 cursor-pointer' : 'shadow-premium'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────
interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  verified?: boolean;
  className?: string;
}

export function Avatar({ name, size = 'md', verified, className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };
  const colors = ['bg-neutral-900', 'bg-blue-600', 'bg-emerald-600', 'bg-violet-600', 'bg-amber-600', 'bg-rose-600'];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div className={`relative inline-flex ${className}`}>
      <div className={`${sizes[size]} ${colors[colorIndex]} text-white rounded-full flex items-center justify-center font-semibold ring-2 ring-white`}>
        {name.charAt(0).toUpperCase()}
      </div>
      {verified && (
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <CheckCircle2 size={14} className="text-blue-600 fill-blue-600" />
        </div>
      )}
    </div>
  );
}

// ─── Rating Stars ─────────────────────────────────
interface RatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}

export function Rating({ value, size = 14, showValue = true, count }: RatingProps) {
  return (
    <div className="inline-flex items-center gap-1">
      <Star size={size} className="text-amber-400 fill-amber-400" />
      {showValue && <span className="text-sm font-semibold text-neutral-900">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="text-xs text-neutral-400">({count})</span>}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
}

export function StatCard({ label, value, change, changeType, icon }: StatCardProps) {
  const changeCls =
    changeType === 'up' ? 'text-emerald-600' : changeType === 'down' ? 'text-red-500' : 'text-neutral-400';
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[13px] text-neutral-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-neutral-900 tracking-tight">{value}</p>
          {change && (
            <p className={`text-xs font-medium ${changeCls}`}>
              {changeType === 'up' ? '+' : ''}{change}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

// ─── Empty State ──────────────────────────────────
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-6">{description}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}

// ─── Tab Bar ──────────────────────────────────────
interface TabBarProps {
  tabs: string[];
  active: number;
  onChange: (i: number) => void;
}

export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange(i)}
          className={`flex-1 h-9 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
            ${i === active ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${sizes[size]} bg-white rounded-2xl shadow-elevated animate-scale-in overflow-hidden`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
            <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Metric Inline ────────────────────────────────
interface MetricProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function MetricInline({ icon, label, value }: MetricProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-neutral-400">{icon}</span>
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium text-neutral-900">{value}</span>
    </div>
  );
}

// ─── Section Header ───────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button onClick={action.onClick} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-1 cursor-pointer">
          {action.label} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

// ─── Feature Row ──────────────────────────────────
interface FeatureRowProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureRow({ icon, title, description }: FeatureRowProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>
        <p className="text-sm text-neutral-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// ─── Price display ────────────────────────────────
export function PriceRange({ min, max }: { min: number; max: number }) {
  const fmt = (n: number) => new Intl.NumberFormat('en-US').format(n);
  return (
    <span className="font-semibold text-neutral-900">
      {fmt(min)}{max > min ? <span className="text-neutral-400 font-normal"> — </span> : null}
      {max > min ? fmt(max) : null}
      <span className="text-neutral-400 font-normal text-xs ml-1">sum</span>
    </span>
  );
}

// ─── Verified Badge ───────────────────────────────
export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
      <Shield size={12} className="fill-blue-100" /> Verified
    </span>
  );
}

// ─── Location + Distance ──────────────────────────
export function LocationBadge({ address, distance }: { address: string; distance?: number }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
      <MapPin size={12} />
      <span>{address}</span>
      {distance && (
        <>
          <span className="text-neutral-300">·</span>
          <span>{distance} km</span>
        </>
      )}
    </div>
  );
}

// ─── Time Badge ───────────────────────────────────
export function TimeBadge({ time }: { time: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
      <Clock size={12} />
      <span>{time}</span>
    </div>
  );
}

// ─── Link Button ──────────────────────────────────
export function LinkButton({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer ${className}`}>
      {children}
      <ArrowRight size={14} />
    </button>
  );
}
