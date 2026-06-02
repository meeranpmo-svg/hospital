import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Stethoscope, ChevronRight, Filter } from 'lucide-react';
import TokenDisplay from '../components/TokenDisplay';
import { loadState } from '../data/storage';
import { DOCTORS } from '../data/seed';

export default function DoctorDashboard() {
  const { t, i18n } = useTranslation();
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');

  const state = loadState();
  const today = new Date().toISOString().slice(0, 10);

  // Map logged-in doctor user → doctor record (by name match)
  const myDoctor = DOCTORS.find(d => d.name === user.name) || DOCTORS[0];

  // Chief doctors see all; doctors see only their own
  const isChief = user.role === 'chief_doctor';
  let appointments = state.appointments.filter(a => a.date === today);
  if (!isChief) appointments = appointments.filter(a => a.doctorId === myDoctor.id);

  const filtered = tab === 'all' ? appointments : appointments.filter(a => a.status === tab);

  const findPatient = (id) => state.patients.find(p => p.id === id);
  const findDoctor  = (id) => DOCTORS.find(d => d.id === id);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Stethoscope size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold">{t('doctor.myPatients')}</h1>
            <p className="text-white/90 text-sm">{myDoctor.name} · <span className="capitalize">{myDoctor.specialty}</span></p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-500" />
            <div className="flex gap-2">
              {['all','waiting','in_progress','done'].map(s => (
                <button key={s} onClick={() => setTab(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${tab === s ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {s === 'all' ? 'All' : t(`queue.${s === 'in_progress' ? 'inProgress' : s}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-slate-500">{filtered.length} {t('doctor.myPatients').toLowerCase()}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-200">
                <th className="ltr:text-left rtl:text-right py-2 px-3">{t('appointment.token')}</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Patient</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">MRN</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">{t('appointment.time')}</th>
                {isChief && <th className="ltr:text-left rtl:text-right py-2 px-3">{t('appointment.doctor')}</th>}
                <th className="ltr:text-left rtl:text-right py-2 px-3">Status</th>
                <th className="ltr:text-right rtl:text-left py-2 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={isChief ? 7 : 6} className="text-center py-8 text-slate-500">{t('app.noData')}</td></tr>
              ) : filtered.map(a => {
                const p = findPatient(a.patientId);
                const d = findDoctor(a.doctorId);
                return (
                  <tr key={a.id} className="border-b border-slate-100 hover:bg-emerald-50/40">
                    <td className="py-3 px-3"><TokenDisplay token={a.token} status={a.status} size="sm" /></td>
                    <td className="py-3 px-3 font-medium text-slate-800">{p?.name}</td>
                    <td className="py-3 px-3 text-slate-600 text-sm">{p?.mrn}</td>
                    <td className="py-3 px-3 text-slate-600 text-sm">{a.time}</td>
                    {isChief && <td className="py-3 px-3 text-slate-600 text-sm">{d?.name}</td>}
                    <td className="py-3 px-3">
                      <span className={`badge ${a.status === 'waiting' ? 'badge-warning' : a.status === 'in_progress' ? 'badge-info' : 'badge-success'}`}>
                        {t(`queue.${a.status === 'in_progress' ? 'inProgress' : a.status}`)}
                      </span>
                    </td>
                    <td className="py-3 px-3 ltr:text-right rtl:text-left">
                      <button onClick={() => navigate(`/doctor/patient/${p.id}?appt=${a.id}`)} className="btn btn-success text-sm">
                        {t('doctor.openFile')} <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
