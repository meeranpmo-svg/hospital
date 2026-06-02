import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ShieldCheck, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import PatientSearch from '../components/PatientSearch';
import TokenDisplay from '../components/TokenDisplay';
import { loadState, saveState, uid } from '../data/storage';
import { DEPARTMENTS, DOCTORS } from '../data/seed';

const SLOTS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'];

export default function Appointments() {
  const { t, i18n } = useTranslation();
  const [patient, setPatient] = useState(null);
  const [dept, setDept] = useState('cardiology');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [time, setTime] = useState('09:00');
  const [channel, setChannel] = useState('walk-in');
  const [eligibility, setEligibility] = useState(null);
  const [checking, setChecking] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const deptDoctors = DOCTORS.filter(d => d.department === dept);

  const checkEligibility = () => {
    if (!patient) return;
    setChecking(true);
    setEligibility(null);
    setTimeout(() => {
      const eligible = !!patient.insurance?.policyNumber;
      setEligibility({
        eligible,
        coverage: eligible ? 80 : 0,
        deductible: eligible ? 0 : 0,
        company: patient.insurance?.company,
        approvedServices: eligible ? ['Consultation','Lab tests','Pharmacy (formulary)','Imaging (with pre-auth)'] : [],
        message: eligible ? 'Policy active. Cashless eligible at network hospitals.' : 'No active policy — patient pays full amount.',
      });
      setChecking(false);
    }, 1500);
  };

  const confirm = () => {
    if (!patient || !doctorId) return alert('Select patient and doctor');
    const state = loadState();
    const deptCode = DEPARTMENTS.find(d => d.key === dept)?.name?.charAt(0)?.toUpperCase() || 'X';
    const sameDeptToday = state.appointments.filter(a => a.date === date && a.department === dept).length;
    const token = `${deptCode}-${String(sameDeptToday + 1).padStart(3, '0')}`;
    const appt = { id: uid('a'), patientId: patient.id, doctorId, department: dept, date, time, status: 'waiting', channel, token };
    state.appointments.push(appt);
    saveState(state);
    setConfirmed(appt);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">{t('appointment.book')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <PatientSearch onSelect={setPatient} />
          {patient && (
            <div className="card border-l-4 border-l-blue-500">
              <div className="font-semibold text-slate-800">{patient.name}</div>
              <div className="text-xs text-slate-500 space-y-0.5 mt-1">
                <div>{patient.mrn} · {patient.nationality}</div>
                <div>{patient.phone}</div>
                <div className="capitalize">{patient.idType}: {patient.idNumber}</div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 card">
          <h3 className="font-semibold text-slate-800 mb-4">Booking Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">{t('appointment.department')}</label>
              <select className="input" value={dept} onChange={(e) => { setDept(e.target.value); setDoctorId(''); }}>
                {DEPARTMENTS.map(d => <option key={d.key} value={d.key}>{d.name}</option>)}
              </select></div>
            <div><label className="label">{t('appointment.doctor')}</label>
              <select className="input" value={doctorId} onChange={e => setDoctorId(e.target.value)}>
                <option value="">— Select —</option>
                {deptDoctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select></div>
            <div><label className="label">{t('appointment.date')}</label>
              <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div><label className="label">{t('appointment.time')}</label>
              <select className="input" value={time} onChange={e => setTime(e.target.value)}>
                {SLOTS.map(s => <option key={s}>{s}</option>)}
              </select></div>
            <div className="md:col-span-2"><label className="label">{t('appointment.channel')}</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { k: 'walk-in',  l: 'walkIn' },
                  { k: 'web',      l: 'web' },
                  { k: 'whatsapp', l: 'whatsapp' },
                  { k: 'referral', l: 'referral' },
                  { k: 'preauth',  l: 'preAuth' },
                ].map(c => (
                  <button key={c.k} type="button" onClick={() => setChannel(c.k)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border ${channel === c.k ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                    {t(`appointment.${c.l}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-teal-50 border border-teal-200">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-teal-700" />
                <div>
                  <div className="font-semibold text-teal-800">Insurance / TPA Eligibility</div>
                  <div className="text-xs text-teal-700">Real-time check with insurer / TPA (simulated)</div>
                </div>
              </div>
              <button onClick={checkEligibility} disabled={!patient || checking} className="btn bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50">
                {checking ? <><Loader2 size={16} className="animate-spin" /> {t('insurance.checking')}</> : t('appointment.checkEligibility')}
              </button>
            </div>
            {eligibility && (
              <div className={`mt-3 p-3 rounded-lg ${eligibility.eligible ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {eligibility.eligible ? <CheckCircle2 className="text-emerald-600" size={18} /> : <XCircle className="text-rose-600" size={18} />}
                  <span className={`font-semibold ${eligibility.eligible ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {eligibility.eligible ? t('insurance.eligible') : t('insurance.notEligible')}
                  </span>
                </div>
                <div className="text-sm text-slate-700">{eligibility.message}</div>
                {eligibility.eligible && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
                    <div><span className="text-slate-500">Coverage: </span><span className="font-semibold">{eligibility.coverage}%</span></div>
                    <div><span className="text-slate-500">Deductible: </span><span className="font-semibold">{eligibility.deductible}</span></div>
                    <div><span className="text-slate-500">Insurer: </span><span className="font-semibold capitalize">{eligibility.company}</span></div>
                    <div className="col-span-full text-xs text-slate-600">
                      Approved: {eligibility.approvedServices.join(' · ')}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={confirm} disabled={!patient || !doctorId} className="btn btn-primary disabled:opacity-50">
              <Calendar size={16} /> {t('appointment.confirmed')}
            </button>
          </div>

          {confirmed && (
            <div className="mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="text-emerald-600" />
                <div className="font-semibold text-emerald-800">{t('appointment.confirmed')}!</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div><div className="text-slate-500 text-xs">{t('appointment.token')}</div><TokenDisplay token={confirmed.token} status="waiting" size="lg" /></div>
                <div><div className="text-slate-500 text-xs">{t('appointment.date')}</div><div className="font-semibold">{confirmed.date}</div></div>
                <div><div className="text-slate-500 text-xs">{t('appointment.time')}</div><div className="font-semibold flex items-center gap-1"><Clock size={14}/> {confirmed.time}</div></div>
                <div><div className="text-slate-500 text-xs">{t('appointment.department')}</div><div className="font-semibold capitalize">{confirmed.department}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
