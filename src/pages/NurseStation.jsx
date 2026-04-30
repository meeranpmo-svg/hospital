import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeartPulse, Activity, Heart, Thermometer, Weight, Droplet, Save, ClipboardList } from 'lucide-react';
import PatientSearch from '../components/PatientSearch';
import TokenDisplay from '../components/TokenDisplay';
import { loadState, saveState, uid } from '../data/storage';

export default function NurseStation() {
  const { t, i18n } = useTranslation();
  const [patient, setPatient] = useState(null);
  const [vitals, setVitals]   = useState({ bp:'', hr:'', temp:'', weight:'', spo2:'' });
  const [note, setNote]       = useState('');
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const today = new Date().toISOString().slice(0, 10);
  const todaysAppts = state.appointments.filter(a => a.date === today && a.status !== 'done');

  const recordVitals = () => {
    if (!patient) return alert('Select a patient');
    const s = loadState();
    s.vitals.push({ id: uid('v'), patientId: patient.id, date: today, ...vitals, recordedBy: 'u4', note });
    saveState(s);
    setVitals({ bp:'', hr:'', temp:'', weight:'', spo2:'' });
    setNote('');
    refresh();
    alert('Vitals saved');
  };

  const advanceToken = (apptId) => {
    const s = loadState();
    const a = s.appointments.find(x => x.id === apptId);
    if (a && a.status === 'waiting') a.status = 'in_progress';
    saveState(s);
    refresh();
  };

  const patientVitalsHistory = patient
    ? state.vitals.filter(v => v.patientId === patient.id).slice(-5).reverse()
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><HeartPulse size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">{t('nav.nurseStation')}</h1>
            <p className="text-white/90 text-sm">Vital signs · Patient notes · Queue assist</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <PatientSearch onSelect={setPatient} />

          {patient && (
            <div className="card border-l-4 border-l-pink-500">
              <div className="font-semibold">{i18n.language === 'ar' ? patient.nameAr : patient.name}</div>
              <div className="text-xs text-slate-500">{patient.mrn} · {patient.gender} · {patient.bloodGroup}</div>
              {patient.allergies?.length > 0 && (
                <div className="mt-2 text-xs text-rose-700 font-medium">⚠️ Allergies: {patient.allergies.join(', ')}</div>
              )}
            </div>
          )}

          {patientVitalsHistory.length > 0 && (
            <div className="card">
              <h4 className="font-semibold text-slate-800 mb-2 text-sm">Recent Vitals</h4>
              <div className="space-y-2 text-sm">
                {patientVitalsHistory.map(v => (
                  <div key={v.id} className="p-2 bg-slate-50 rounded text-xs">
                    <div className="text-slate-500">{v.date}</div>
                    <div>BP {v.bp || '—'} · HR {v.hr || '—'} · T {v.temp || '—'}°C · SpO2 {v.spo2 || '—'}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><Activity size={16} className="text-rose-500"/> {t('doctor.vitals')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              <Field icon={Heart}      label={t('doctor.bp')}     value={vitals.bp}     onChange={v => setVitals({...vitals, bp: v})}     placeholder="120/80" />
              <Field icon={Activity}   label={t('doctor.hr')}     value={vitals.hr}     onChange={v => setVitals({...vitals, hr: v})}     placeholder="bpm" />
              <Field icon={Thermometer}label={t('doctor.temp')}   value={vitals.temp}   onChange={v => setVitals({...vitals, temp: v})}   placeholder="°C" />
              <Field icon={Weight}     label={t('doctor.weight')} value={vitals.weight} onChange={v => setVitals({...vitals, weight: v})} placeholder="kg" />
              <Field icon={Droplet}    label={t('doctor.spo2')}   value={vitals.spo2}   onChange={v => setVitals({...vitals, spo2: v})}   placeholder="%" />
            </div>

            <label className="label flex items-center gap-1.5"><ClipboardList size={14}/> Nursing Note</label>
            <textarea className="input min-h-[80px]" value={note} onChange={e => setNote(e.target.value)} placeholder="Patient appears stable, ambulatory, etc." />

            <button onClick={recordVitals} className="btn bg-pink-600 text-white hover:bg-pink-700 mt-3"><Save size={16}/> Save Vitals & Note</button>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3">Today's Patient Queue</h3>
            <div className="space-y-2">
              {todaysAppts.slice(0, 8).map(a => {
                const p = state.patients.find(x => x.id === a.patientId);
                return (
                  <div key={a.id} className="p-3 rounded-lg bg-slate-50 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <TokenDisplay token={a.token} status={a.status} size="sm" />
                      <div>
                        <div className="font-medium text-sm">{i18n.language === 'ar' ? p?.nameAr : p?.name}</div>
                        <div className="text-xs text-slate-500">{p?.mrn} · {a.time} · <span className="capitalize">{a.department}</span></div>
                      </div>
                    </div>
                    {a.status === 'waiting' && (
                      <button onClick={() => advanceToken(a.id)} className="btn btn-ghost text-sm">Send to Doctor</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-xs text-slate-500 flex items-center gap-1"><Icon size={12} /> {label}</label>
      <input className="input mt-1" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
