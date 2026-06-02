import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, UserPlus, CalendarDays, ListOrdered, Stethoscope,
  Pill, FlaskConical, ShieldCheck, Receipt, Wallet, BarChart3, Users,
  HeartPulse, Crown, Calculator, ShoppingCart, Boxes, UserCog,
  Settings as SettingsIcon, Hospital,
} from 'lucide-react';
import { HOSPITAL, PRODUCT } from '../data/seed';

// Strict domain-based access — each role sees ONLY its own domain.
// Admin sees everything. Dashboard is shared.
const ROLE_NAV = {
  admin:              ['dashboard','registration','appointments','queue','doctorDashboard','chiefDashboard','nurseStation','pharmacy','lab','insurance','billing','cashier','finance','accounting','purchase','supply','hr','users','settings'],

  // Clinical domain
  doctor:             ['dashboard','doctorDashboard','queue'],
  chief_doctor:       ['dashboard','chiefDashboard','doctorDashboard','queue'],
  nurse:              ['dashboard','nurseStation','queue'],

  // Front office
  receptionist:       ['dashboard','registration','appointments','queue'],

  // Pharmacy domain only
  pharmacist:         ['dashboard','pharmacy'],

  // Lab domain only
  lab_tech:           ['dashboard','lab'],

  // Finance domain (finance reports + accounting + billing all live in finance)
  finance:            ['dashboard','finance','accounting','billing'],
  accountant:         ['dashboard','accounting','finance','billing'],
  cashier:            ['dashboard','cashier'],

  // Insurance domain only
  insurance_approval: ['dashboard','insurance'],

  // Procurement domain only
  purchase_officer:   ['dashboard','purchase'],

  // Supply chain / inventory domain only
  inventory_manager:  ['dashboard','supply'],

  // HR domain only
  hr_manager:         ['dashboard','hr'],
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
  accounting:       { to: '/accounting',      icon: Calculator,      key: 'nav.accounting',       color: 'text-amber-700' },
  purchase:         { to: '/purchase',        icon: ShoppingCart,    key: 'nav.purchase',         color: 'text-indigo-600' },
  supply:           { to: '/supply',          icon: Boxes,           key: 'nav.supply',           color: 'text-lime-700' },
  hr:               { to: '/hr',              icon: UserCog,         key: 'nav.hr',               color: 'text-fuchsia-600' },
  users:            { to: '/users',           icon: Users,           key: 'nav.users',            color: 'text-slate-700' },
  settings:         { to: '/settings',        icon: SettingsIcon,    key: 'nav.settings',         color: 'text-slate-700' },
};

export default function Sidebar({ user }) {
  const { t } = useTranslation();
  const items = (ROLE_NAV[user?.role] || []).map(k => ({ k, ...NAV_ITEMS[k] }));

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full flex flex-col">
      <div className="px-5 py-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-600 to-orange-600 flex items-center justify-center text-white shadow-md">
            <Hospital size={22} />
          </div>
          <div>
            <div className="font-bold text-slate-800 leading-tight">{HOSPITAL.name}</div>
            <div className="text-xs text-slate-500">{HOSPITAL.tagline}</div>
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

      <div className="px-3 py-2 border-t border-slate-200 bg-slate-50 text-[10px] leading-tight text-slate-500">
        <div className="font-semibold text-slate-600">{PRODUCT.shortName} <span className="text-slate-400">v{PRODUCT.version}</span></div>
        <div>© {PRODUCT.copyrightYear} {PRODUCT.developerShort}, {PRODUCT.developerCountry}</div>
      </div>
    </aside>
  );
}
