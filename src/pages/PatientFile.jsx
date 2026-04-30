import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Activity, Heart, Thermometer, Weight, Droplet, Plus, Trash2,
  ShieldCheck, FlaskConical, Pill, Send, ClipboardList, AlertTriangle,
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';
import { loadState, saveState, uid } from '../data/storage';
import { ICD10_CODES, DRUG_INVENTORY, LAB_TESTS, DEPARTMENTS, INSURANCE_COMPANIES } from '../data/seed';

export default function PatientFile() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [params] = useSearchParams();
  const apptId = params.get('appt');
  const navigate = useNavigate();

  const state = loadState();
  const patient = state.patients.find(p => p.id === id);
  if (!patient) return <div className="p-6">Patient not found</div>;

  const insurer = INSURANCE_COMPANIES.find(c => c.key === patient.insurance?.company);
  const visits = state.consultations.filter(c => c.patientId === id);
  const labHistory = state.labOrders.filter(l => l.patientId === id);
  const rxHistory = state.prescriptions.filter(r => r.patientId === id);

  const [vitals, setVitals]   = useState({ bp:'', hr:'', temp:'', weight:'', spo2:'' });
  const [complaint, setComplaint]   = useState('');
  const [icd, setIcd]               = useState(ICD10_CODES[0].code);
  const [diagnosis, setDiagnosis]   = useState('');
  const [icdQuery, setIcdQuery]     = useState('');

  const [rxItems, setRxItems] = useState([{ drugId: '', name: '', dose: '', freq: 'OD', duration: '', instructions: '' }]);

  const [labTests, setLabTests] = useState([]);
  const [labUrgency, setLabUrgency] = useState('routine');

  const [refDept, setRefDept] = useState('');

  const filteredIcd = icdQuery
    ? ICD10_CODES.filter(c => c.code.includes(icdQuery.toUpperCase()) || c.desc.toLowerCase().includes(icdQuery.toLowerCase()))
    : ICD10_CODES;

  const addRx = () => setRxItems([...rxItems, { drugId: '', name: '', dose: '', freq: 'OD', duration: '', instructions: '' }]);
  const removeRx = (i) => setRxItems(rxItems.filter((_, idx) => idx !== i));
  const setRx = (i, k, v) => setRxItems(rxItems.map((r, idx) => idx === i ? { ...r, [k]: v } : r));
  const pickDrug = (i, drugId) => {
    const drug = DRUG_INVENTORY.find(d => d.id === drugId);
    setRxItems(rxItems.map((r, idx) => idx === i ? { ...r, drugId, name: drug?.name || '' } : r));
  };

  const toggleLab = (code) => setLabTests(t => t.includes(code) ? t.filter(c => c !== code) : [...t, code]);

  const allergyAlerts = rxItems
    .filter(r => r.name)
    .flatMap(r => (patient.allergies || []).filter(a => r.name.toLowerCase().includes(a.toLowerCase())).map(a => `${r.name} contains ${a} (patient allergic)`));

  const finalize = () => {
    const s = loadState();
    if (vitals.bp || vitals.hr) {
      s.vitals.push({ id: uid('v'), patientId: id, date: new Date().toISOString().slice(0,10), ...vitals });
    }
    if (rxItems.some(r => r.name)) {
      s.prescriptions.push({
        id: uid('rx'), patientId: id, doctorId: 'd1',
        date: new Date().toISOString().slice(0,10), status: 'pending',
        items: rxItems.filter(r => r.name),
      });
    }
    if (labTests.length > 0) {
      s.labOrders.push({
        id: uid('lab'), patientId: id, doctorId: 'd1',
        date: new Date().toISOString().slice(0,10),
        tests: labTests, urgency: labUrgency, status: 'pending', results: null,
      });
    }
    s.consultations.push({
      id: uid('c'), patientId: id, doctorId: 'd1',
      date: new Date().toISOString().slice(0,10),
      complaint, diagnosis: `${icd} - ${diagnosis || ICD10_CODES.find(c => c.code === icd)?.desc}`,
      vitals, referralTo: refDept || null,
    });
    if (apptId) {
      const a = s.appointments.find(x => x.id === apptId);
      if (a) a.status = 'done';
    }
    saveState(s);
    alert('Visit completed successfully');
    navigate('/doctor');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button onClick={() => navigate(-1)} className="btn btn-ghost"><ArrowLeft size={16} /> {t('app.back')}</button>
      </div>

      <div className="card border-l-4 border-l-emerald-500">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{i18n.language === 'ar' ? patient.nameAr : patient.name}</h1>
            <div className="text-sm text-slate-500 mt-1">
              {patient.mrn} · {patient.gender} · {patient.nationality} · {new Date().getFullYear() - new Date(patient.dob).getFullYear()}y · {patient.bloodGroup}
            </div>
            <div className="text-xs text-slate-500 mt-0.5 capitalize">{patient.idType}: {patient.idNumber} · {patient.phone}</div>
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            <span className="badge badge-info flex items-center gap-1"><ShieldCheck size={12}/> {insurer?.name} · {patient.insurance?.policyNumber}</span>
            {patient.allergies?.length > 0 && (
              <span className="badge badge-danger flex items-center gap-1">
                <AlertTriangle size={12}/> Allergies: {patient.allergies.join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><Activity size={16} className="text-rose-500" /> {t('doctor.vitals')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Field icon={Heart} label={t('doctor.bp')} value={vitals.bp} onChange={v => setVitals({...vitals, bp: v})} placeholder="120/80" />
              <Field icon={Activity} label={t('doctor.hr')} value={vitals.hr} onChange={v => setVitals({...vitals, hr: v})} placeholder="bpm" />
              <Field icon={Thermometer} label={t('doctor.temp')} value={vitals.temp} onChange={v => setVitals({...vitals, temp: v})} placeholder="°C" />
              <Field icon={Weight} label={t('doctor.weight')} value={vitals.weight} onChange={v => setVitals({...vitals, weight: v})} placeholder="kg" />
              <Field icon={Droplet} label={t('doctor.spo2')} value={vitals.spo2} onChange={v => setVitals({...vitals, spo2: v})} placeholder="%" />
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><ClipboardList size={16} className="text-blue-600" /> Consultation Notes</h3>
            <div className="space-y-3">
              <div>
                <label className="label">{t('doctor.complaint')}</label>
                <textarea className="input min-h-[80px]" value={complaint} onChange={e => setComplaint(e.target.value)} placeholder="e.g. Patient reports chest pain for 3 days, exertional, relieved by rest..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-1">
                  <label className="label">{t('doctor.icd10')}</label>
                  <input className="input" placeholder="Search code or term" value={icdQuery} onChange={e => setIcdQuery(e.target.value)} />
                  <select className="input mt-2 max-h-40" value={icd} onChange={e => setIcd(e.target.value)} size={Math.min(4, filteredIcd.length || 1)}>
                    {filteredIcd.map(c => <option key={c.code} value={c.code}>{c.code} — {c.desc}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="label">{t('doctor.diagnosis')}</label>
                  <textarea className="input min-h-[80px]" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="Clinical diagnosis & assessment..." />
                </div>
              </div>
            </div>
          </div>

          <div className="card border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2"><Pill size={16} className="text-purple-600" /> {t('doctor.prescription')}</h3>
              <button onClick={addRx} className="btn btn-ghost text-sm"><Plus size={14}/> {t('doctor.addItem')}</button>
            </div>
            {allergyAlerts.length > 0 && (
              <div className="mb-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-sm text-rose-800">
                <div className="font-semibold flex items-center gap-1"><AlertTriangle size={14}/> Allergy Alert</div>
                {allergyAlerts.map((a, i) => <div key={i}>• {a}</div>)}
              </div>
            )}
            <div className="space-y-3">
              {rxItems.map((r, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-end p-3 rounded-lg bg-slate-50">
                  <div className="col-span-12 md:col-span-4">
                    <label className="text-xs text-slate-500">{t('doctor.drug')}</label>
                    <select className="input" value={r.drugId} onChange={e => pickDrug(i, e.target.value)}>
                      <option value="">— Select drug —</option>
                      {DRUG_INVENTORY.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="text-xs text-slate-500">{t('doctor.dose')}</label>
                    <input className="input" value={r.dose} onChange={e => setRx(i,'dose',e.target.value)} placeholder="1 tab" />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="text-xs text-slate-500">{t('doctor.frequency')}</label>
                    <select className="input" value={r.freq} onChange={e => setRx(i,'freq',e.target.value)}>
                      {['OD','BID','TID','QID','HS','PRN'].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="text-xs text-slate-500">{t('doctor.duration')}</label>
                    <input className="input" value={r.duration} onChange={e => setRx(i,'duration',e.target.value)} placeholder="7 days" />
                  </div>
                  <div className="col-span-5 md:col-span-1">
                    <label className="text-xs text-slate-500">{t('doctor.instructions')}</label>
                    <input className="input" value={r.instructions} onChange={e => setRx(i,'instructions',e.target.value)} placeholder="..." />
                  </div>
                  <div className="col-span-1">
                    <button onClick={() => removeRx(i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card border-l-4 border-l-orange-500">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><FlaskConical size={16} className="text-orange-600" /> {t('doctor.labOrder')}</h3>
            <div>
              <label className="label">{t('lab.urgency')}</label>
              <div className="flex gap-2 mb-3">
                {['routine','urgent','STAT'].map(u => (
                  <button key={u} onClick={() => setLabUrgency(u)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${labUrgency === u ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    {u === 'routine' ? t('lab.routine') : u === 'urgent' ? t('lab.urgent') : t('lab.stat')}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {LAB_TESTS.map(test => (
                  <label key={test.code} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-sm ${labTests.includes(test.code) ? 'bg-orange-100 text-orange-800' : 'bg-slate-50 text-slate-700'}`}>
                    <input type="checkbox" checked={labTests.includes(test.code)} onChange={() => toggleLab(test.code)} />
                    {i18n.language === 'ar' ? test.nameAr : test.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3">{t('doctor.referral')}</h3>
            <select className="input" value={refDept} onChange={e => setRefDept(e.target.value)}>
              <option value="">— None —</option>
              {DEPARTMENTS.map(d => <option key={d.key} value={d.key}>{i18n.language === 'ar' ? d.nameAr : d.name}</option>)}
            </select>
          </div>

          <div className="flex gap-3">
            <button onClick={finalize} className="btn btn-success"><Send size={16}/> {t('doctor.completeVisit')}</button>
            <button onClick={() => navigate('/doctor')} className="btn btn-ghost">{t('app.cancel')}</button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <AIAssistant patient={patient} />

          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3">{t('doctor.history')}</h3>
            {visits.length === 0 ? <div className="text-slate-500 text-sm">{t('app.noData')}</div> :
              <div className="space-y-2">
                {visits.slice(-5).reverse().map(v => (
                  <div key={v.id} className="p-3 rounded-lg bg-slate-50 text-sm">
                    <div className="text-xs text-slate-500">{v.date}</div>
                    <div className="font-medium text-slate-800">{v.diagnosis}</div>
                    {v.complaint && <div className="text-xs text-slate-600">{v.complaint}</div>}
                  </div>
                ))}
              </div>}
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><FlaskConical size={14}/> Lab History</h3>
            {labHistory.length === 0 ? <div className="text-slate-500 text-sm">{t('app.noData')}</div> :
              <div className="space-y-2">
                {labHistory.slice(-5).reverse().map(l => (
                  <div key={l.id} className="p-3 rounded-lg bg-slate-50 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{l.tests.join(', ')}</span>
                      <span className={`badge ${l.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{l.status}</span>
                    </div>
                    <div className="text-xs text-slate-500">{l.date} · {l.urgency}</div>
                    {l.results && <div className="text-xs text-slate-700 mt-1">{Object.entries(l.results).map(([k,v]) => <div key={k}><b>{k}:</b> {v}</div>)}</div>}
                  </div>
                ))}
              </div>}
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><Pill size={14}/> Recent Prescriptions</h3>
            {rxHistory.length === 0 ? <div className="text-slate-500 text-sm">{t('app.noData')}</div> :
              <div className="space-y-2">
                {rxHistory.slice(-5).reverse().map(r => (
                  <div key={r.id} className="p-3 rounded-lg bg-slate-50 text-sm">
                    <div className="text-xs text-slate-500">{r.date} · <span className="capitalize">{r.status}</span></div>
                    {r.items.map((it, i) => <div key={i} className="text-slate-700">• {it.name} — {it.dose} {it.freq}</div>)}
                  </div>
                ))}
              </div>}
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
