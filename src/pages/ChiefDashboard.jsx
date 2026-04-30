import { useTranslation } from 'react-i18next';
import { Crown, Stethoscope, Activity, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { loadState } from '../data/storage';
import { DOCTORS, DEPARTMENTS } from '../data/seed';

export default function ChiefDashboard() {
  const { t } = useTranslation();
  const state = loadState();
  const today = new Date().toISOString().slice(0, 10);
  const todaysAppts = state.appointments.filter(a => a.date === today);

  const doctorWorkload = DOCTORS.map(d => ({
    name: d.name.replace('Dr. ',''),
    patients: todaysAppts.filter(a => a.doctorId === d.id).length,
    done: todaysAppts.filter(a => a.doctorId === d.id && a.status === 'done').length,
  })).sort((a,b) => b.patients - a.patients);

  const deptStats = DEPARTMENTS.map(d => ({
    dept: d.name,
    visits: todaysAppts.filter(a => a.department === d.key).length,
  }));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Crown size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">{t('nav.chiefDashboard')}</h1>
            <p className="text-white/90 text-sm">Department oversight · Doctor performance · Quality metrics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={Users}      label="Active Doctors"        value={DOCTORS.length}                                            color="emerald" />
        <Stat icon={Stethoscope}label="Today's Consultations" value={todaysAppts.length}                                        color="blue" />
        <Stat icon={Activity}   label="Open Lab Orders"       value={state.labOrders.filter(l => l.status !== 'completed').length} color="orange" />
        <Stat icon={AlertCircle}label="Pending PA"            value={state.preAuths.filter(p => p.status === 'pending').length}     color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><TrendingUp size={16} className="text-emerald-600"/> Doctor Workload Today</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={doctorWorkload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={140} />
                <Tooltip />
                <Bar dataKey="patients" fill="#10b981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-3">Department Activity</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <RadarChart data={deptStats}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dept" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar dataKey="visits" stroke="#0d9488" fill="#0d9488" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3">All Doctors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {DOCTORS.map(d => {
            const myAppts = todaysAppts.filter(a => a.doctorId === d.id);
            const dept = DEPARTMENTS.find(x => x.key === d.department);
            return (
              <div key={d.id} className="p-3 rounded-lg border border-slate-200 hover:border-emerald-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-semibold">
                    {d.name.split(' ')[1]?.charAt(0) || 'D'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-800 truncate">{d.name}</div>
                    <div className="text-xs text-slate-500">{d.specialty} · {dept?.name}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                  <div className="bg-amber-50 rounded p-1.5"><div className="font-bold text-amber-700">{myAppts.filter(a => a.status === 'waiting').length}</div><div className="text-slate-500">Wait</div></div>
                  <div className="bg-blue-50 rounded p-1.5"><div className="font-bold text-blue-700">{myAppts.filter(a => a.status === 'in_progress').length}</div><div className="text-slate-500">Now</div></div>
                  <div className="bg-emerald-50 rounded p-1.5"><div className="font-bold text-emerald-700">{myAppts.filter(a => a.status === 'done').length}</div><div className="text-slate-500">Done</div></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, color }) {
  const map = {
    emerald: 'from-emerald-500 to-teal-600',
    blue:    'from-blue-500    to-indigo-600',
    orange:  'from-orange-500  to-red-600',
    rose:    'from-rose-500    to-pink-600',
  };
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute inset-y-0 ltr:left-0 rtl:right-0 w-1 bg-gradient-to-b ${map[color]}`} />
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${map[color]} text-white flex items-center justify-center`}>
          <Icon size={18}/>
        </div>
        <div>
          <div className="text-xl font-bold">{value}</div>
          <div className="text-xs text-slate-500">{label}</div>
        </div>
      </div>
    </div>
  );
}
