import { useTranslation } from 'react-i18next';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Users, Calendar, Clock, DollarSign, Bell, AlertTriangle, ShieldCheck,
  FlaskConical, Pill, ListOrdered, Stethoscope, Receipt, Wallet, BarChart3, UserPlus, Crown, HeartPulse,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { loadState } from '../data/storage';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const { user } = useOutletContext();
  const state = loadState();
  const today = new Date().toISOString().slice(0, 10);

  const todaysAppts = state.appointments.filter(a => a.date === today);
  const waiting = todaysAppts.filter(a => a.status === 'waiting').length;
  const totalRevenue = state.bills.reduce((s, b) => s + (b.total || 0), 0);

  const deptData = Object.values(
    todaysAppts.reduce((acc, a) => {
      acc[a.department] = acc[a.department] || { name: a.department, count: 0 };
      acc[a.department].count++;
      return acc;
    }, {})
  );

  const trendData = [
    { day: 'Sat', patients: 42 },
    { day: 'Sun', patients: 58 },
    { day: 'Mon', patients: 71 },
    { day: 'Tue', patients: 65 },
    { day: 'Wed', patients: 80 },
    { day: 'Thu', patients: 74 },
    { day: 'Today', patients: todaysAppts.length },
  ];

  const channelData = Object.values(
    todaysAppts.reduce((acc, a) => {
      acc[a.channel] = acc[a.channel] || { name: a.channel, value: 0 };
      acc[a.channel].value++;
      return acc;
    }, {})
  );
  const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#f97316', '#ec4899'];

  const stats = [
    { key: 'patientsToday',  value: state.patients.length, icon: Users,    color: 'blue',    bg: 'from-blue-500 to-blue-600' },
    { key: 'appointments',   value: todaysAppts.length,    icon: Calendar, color: 'emerald', bg: 'from-emerald-500 to-emerald-600' },
    { key: 'waitingQueue',   value: waiting,               icon: Clock,    color: 'amber',   bg: 'from-amber-500 to-orange-600' },
    { key: 'revenue',        value: `${totalRevenue} SAR`, icon: DollarSign, color: 'teal',  bg: 'from-teal-500 to-cyan-600' },
  ];

  const QUICK_ALL = [
    { to: '/registration', icon: UserPlus,       label: 'nav.registration',     color: 'bg-blue-50 text-blue-700',       roles: ['admin','receptionist'] },
    { to: '/appointments', icon: Calendar,       label: 'nav.appointments',     color: 'bg-blue-50 text-blue-700',       roles: ['admin','receptionist'] },
    { to: '/queue',        icon: ListOrdered,    label: 'nav.queue',            color: 'bg-amber-50 text-amber-700',     roles: ['admin','receptionist','doctor','chief_doctor','nurse'] },
    { to: '/doctor',       icon: Stethoscope,    label: 'nav.doctorDashboard',  color: 'bg-emerald-50 text-emerald-700', roles: ['admin','doctor','chief_doctor'] },
    { to: '/chief',        icon: Crown,          label: 'nav.chiefDashboard',   color: 'bg-emerald-50 text-emerald-800', roles: ['chief_doctor'] },
    { to: '/nurse',        icon: HeartPulse,     label: 'nav.nurseStation',     color: 'bg-pink-50 text-pink-700',       roles: ['admin','nurse'] },
    { to: '/pharmacy',     icon: Pill,           label: 'nav.pharmacy',         color: 'bg-purple-50 text-purple-700',   roles: ['admin','pharmacist','doctor'] },
    { to: '/lab',          icon: FlaskConical,   label: 'nav.lab',              color: 'bg-orange-50 text-orange-700',   roles: ['admin','lab_tech','doctor','chief_doctor'] },
    { to: '/insurance',    icon: ShieldCheck,    label: 'nav.insurance',        color: 'bg-teal-50 text-teal-700',       roles: ['admin','insurance_approval'] },
    { to: '/billing',      icon: Receipt,        label: 'nav.billing',          color: 'bg-yellow-50 text-yellow-700',   roles: ['admin','finance','cashier','receptionist','insurance_approval'] },
    { to: '/cashier',      icon: Wallet,         label: 'nav.cashier',          color: 'bg-cyan-50 text-cyan-700',       roles: ['admin','cashier'] },
    { to: '/finance',      icon: BarChart3,      label: 'nav.finance',          color: 'bg-yellow-50 text-yellow-800',   roles: ['admin','finance','chief_doctor'] },
  ];
  const quick = QUICK_ALL.filter(q => q.roles.includes(user.role));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">{t('app.welcome')}, {i18n.language === 'ar' ? user.nameAr : user.name} 👋</h1>
            <p className="text-white/90 mt-1">Today is {new Date().toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="bg-white/15 backdrop-blur px-4 py-2 rounded-xl text-sm capitalize border border-white/20">
            Role: {user.role.replace('_',' ')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.key} className="card relative overflow-hidden">
            <div className={`absolute inset-y-0 ltr:left-0 rtl:right-0 w-1 bg-gradient-to-b ${s.bg}`} />
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.bg} text-white flex items-center justify-center`}>
                <s.icon size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 mt-1">{t(`dashboard.${s.key}`)}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-4">{t('dashboard.weeklyTrend')}</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4">Booking Channels</h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={channelData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {channelData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-4">{t('dashboard.deptActivity')}</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Bell size={16} className="text-amber-600" /> {t('dashboard.notifications')}
            </h3>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {state.notifications.map(n => (
              <div key={n.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm">
                <div className="flex items-start gap-2">
                  {n.type === 'pharmacy' && <AlertTriangle size={14} className="text-amber-600 mt-0.5" />}
                  {n.type === 'lab' && <FlaskConical size={14} className="text-orange-600 mt-0.5" />}
                  {n.type === 'insurance' && <ShieldCheck size={14} className="text-teal-600 mt-0.5" />}
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">{i18n.language === 'ar' ? n.titleAr : n.title}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{n.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {quick.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4">{t('dashboard.quickLinks')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {quick.map(q => (
              <Link key={q.to} to={q.to} className={`p-4 rounded-xl ${q.color} hover:scale-105 transition-transform flex flex-col items-center gap-2 text-center`}>
                <q.icon size={22} />
                <span className="text-xs font-semibold">{t(q.label)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
