import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListOrdered, Clock, ChevronRight, RefreshCw } from 'lucide-react';
import TokenDisplay from '../components/TokenDisplay';
import { loadState, saveState } from '../data/storage';
import { DEPARTMENTS } from '../data/seed';

export default function Queue() {
  const { t, i18n } = useTranslation();
  const [filterDept, setFilterDept] = useState('all');
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const today = new Date().toISOString().slice(0, 10);
  const appointments = state.appointments.filter(a => a.date === today)
    .filter(a => filterDept === 'all' || a.department === filterDept);

  const counts = {
    waiting: appointments.filter(a => a.status === 'waiting').length,
    in_progress: appointments.filter(a => a.status === 'in_progress').length,
    done: appointments.filter(a => a.status === 'done').length,
  };

  const findPatient = (id) => state.patients.find(p => p.id === id);
  const findDoctor  = (id) => state.users.find(u => u.id === id) || { name: id };

  const advance = (apptId) => {
    const s = loadState();
    const a = s.appointments.find(x => x.id === apptId);
    if (a) a.status = a.status === 'waiting' ? 'in_progress' : 'done';
    saveState(s);
    refresh();
  };

  const grouped = appointments.reduce((acc, a) => {
    acc[a.department] = acc[a.department] || [];
    acc[a.department].push(a);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ListOrdered className="text-amber-600" />
          <h1 className="text-2xl font-bold text-slate-800">{t('nav.queue')}</h1>
        </div>
        <button onClick={refresh} className="btn btn-ghost"><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat label={t('queue.waiting')} value={counts.waiting} color="amber" />
        <Stat label={t('queue.inProgress')} value={counts.in_progress} color="blue" />
        <Stat label={t('queue.done')} value={counts.done} color="emerald" />
      </div>

      <div className="card">
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => setFilterDept('all')} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${filterDept === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}>All</button>
          {DEPARTMENTS.map(d => (
            <button key={d.key} onClick={() => setFilterDept(d.key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${filterDept === d.key ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}>
              {i18n.language === 'ar' ? d.nameAr : d.name}
            </button>
          ))}
        </div>

        {Object.entries(grouped).length === 0 && (
          <div className="text-center text-slate-500 py-8">{t('app.noData')}</div>
        )}

        {Object.entries(grouped).map(([dept, list]) => {
          const deptInfo = DEPARTMENTS.find(d => d.key === dept);
          const waitingNum = list.filter(x => x.status === 'waiting').length;
          return (
            <div key={dept} className="mb-6 last:mb-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800 capitalize flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-${deptInfo?.color || 'slate'}-500`} />
                  {i18n.language === 'ar' ? deptInfo?.nameAr : deptInfo?.name}
                  <span className="text-sm font-normal text-slate-500">({list.length})</span>
                </h3>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Clock size={14} /> {t('queue.estimatedWait')}: <span className="font-semibold">{waitingNum * 12} min</span>
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map(a => {
                  const p = findPatient(a.patientId);
                  const d = findDoctor(a.doctorId === 'd1' ? 'u2' : a.doctorId === 'd2' ? 'u3' : a.doctorId);
                  const masked = p?.name?.split(' ').map(n => n[0] + '****').join(' ') || 'Unknown';
                  return (
                    <div key={a.id} className={`p-4 rounded-xl border-2 ${a.status === 'in_progress' ? 'border-blue-400 bg-blue-50' : a.status === 'done' ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-200 bg-white'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <TokenDisplay token={a.token} status={a.status} size="md" />
                        <span className="text-xs text-slate-500">{a.time}</span>
                      </div>
                      <div className="text-sm font-medium text-slate-800">{masked}</div>
                      <div className="text-xs text-slate-500">{p?.mrn} · Dr. {d?.name?.split(' ').slice(1,3).join(' ')}</div>
                      {a.status !== 'done' && (
                        <button onClick={() => advance(a.id)} className="mt-3 w-full btn btn-primary text-sm justify-center">
                          {a.status === 'waiting' ? t('queue.callNext') : t('queue.done')} <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  const map = {
    amber:   'from-amber-500 to-orange-600',
    blue:    'from-blue-500 to-indigo-600',
    emerald: 'from-emerald-500 to-teal-600',
  };
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute inset-y-0 ltr:left-0 rtl:right-0 w-1 bg-gradient-to-b ${map[color]}`} />
      <div className="text-3xl font-bold text-slate-800">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}
