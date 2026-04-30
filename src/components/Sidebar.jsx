import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, UserPlus, CalendarDays, ListOrdered, Stethoscope,
  Pill, FlaskConical, ShieldCheck, Receipt, Wallet, BarChart3, Users,
  Activity, HeartPulse, Crown,
} from 'lucide-react';

const ROLE_NAV = {
  admin:              ['dashboard','registration','appointments','queue','pharmacy','lab','insurance','billing','cashier','finance','users'],
  doctor:             ['dashboard','doctorDashboard','queue','pharmacy','lab'],
  chief_doctor:       ['dashboard','chiefDashboard','doctorDashboard','queue','lab','finance'],
  nurse:              ['dashboard','nurseStation','queue'],
  receptionist:       ['dashboard','registration','appointments','queue','billing'],
  pharmacist:         ['dashboard','pharmacy'],
  lab_tech:           ['dashboard','lab'],
  finance:            ['dashboard','finance','billing'],
  cashier:            ['dashboard','cashier','billing'],
  insurance_approval: ['dashboard','insurance','billing'],
};

const NAV_ITEMS = {
  dashboard:        { to: '/',                icon: LayoutDashboard, key: 'nav.dashboard',        color: 'text-slate-700' },
  registration:     { to: '/registration',    icon: UserPlus,        key: 'nav.registration',     color: 'text-blue-600' },
  appointments:     { to: '/appointments',    icon: CalendarDays,    key: 'nav.appointments',     color: 'text-blue-600' },
  queue:            { to: '/queue',           icon: ListOrdered,     key: 'nav.queue',            color: 'text-amber-600' },
  doctorDashboard:  { to: '/doctor',          icon: Stethoscope,     key: 'nav.doctorDashboard',  color: 'text-emerald-600' },
  chiefDashboard:   { to: '/chief',           icon: Crown,           key: 'nav.chiefDashboard',   color: 'text-emerald-800' },
  nurseStation:     { to: '/nurse',           icon: HeartPulse,      key: 'nav.nurseStation',     color: 'text-pink-600' },
  pharmacy:         { to: '/pharmacy',        icon: Pill,            key: 'nav.pharmacy',         color: 'text-purple-600' },
  lab:              { to: '/lab',             icon: FlaskConical,    key: 'nav.lab',              color: 'text-orange-600' },
  insurance:        { to: '/insurance',       icon: ShieldCheck,     key: 'nav.insurance',        color: 'text-teal-600' },
  billing:          { to: '/billing',         icon: Receipt,         key: 'nav.billing',          color: 'text-yellow-600' },
  cashier:          { to: '/cashier',         icon: Wallet,          key: 'nav.cashier',          color: 'text-cyan-600' },
  finance:          { to: '/finance',         icon: BarChart3,       key: 'nav.finance',          color: 'text-yellow-700' },
  users:            { to: '/users',           icon: Users,           key: 'nav.users',            color: 'text-slate-700' },
};

export default function Sidebar({ user }) {
  const { t } = useTranslation();
  const items = (ROLE_NAV[user?.role] || []).map(k => ({ k, ...NAV_ITEMS[k] }));

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full flex flex-col">
      <div className="px-5 py-5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center text-white">
            <Activity size={20} />
          </div>
          <div>
            <div className="font-bold text-slate-800 leading-tight">{t('app.title')}</div>
            <div className="text-xs text-slate-500">{t('app.subtitle')}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {items.map(({ k, to, icon: Icon, key, color }) => (
          <NavLink
            key={k}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            <Icon size={18} className={color} />
            <span>{t(key)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 text-xs text-slate-500">
        <div className="font-medium text-slate-700">{user?.name}</div>
        <div className="capitalize">{user?.role?.replace('_',' ')}</div>
      </div>
    </aside>
  );
}
