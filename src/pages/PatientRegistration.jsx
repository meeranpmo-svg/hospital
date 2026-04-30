import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, Save, CheckCircle2 } from 'lucide-react';
import PatientSearch from '../components/PatientSearch';
import { loadState, saveState, uid } from '../data/storage';
import { INSURANCE_COMPANIES } from '../data/seed';

const empty = {
  mrn: '', name: '', nameAr: '', dob: '', gender: 'male', nationality: 'Saudi',
  idType: 'national', idNumber: '', phone: '', bloodGroup: 'O+',
  insurance: { company: 'bupa', policyNumber: '', cchiId: '' },
  allergies: '', emergencyContact: '',
};

export default function PatientRegistration() {
  const { t } = useTranslation();
  const [form, setForm] = useState(empty);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const setIns = (k, v) => setForm(p => ({ ...p, insurance: { ...p.insurance, [k]: v } }));

  const handleSelect = (p) => {
    setEditing(p);
    setForm({
      ...p,
      allergies: (p.allergies || []).join(', '),
      insurance: p.insurance || { company: 'bupa', policyNumber: '', cchiId: '' },
    });
    setSaved(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const state = loadState();
    const record = {
      ...form,
      id: editing?.id || uid('p'),
      mrn: form.mrn || `MRN-${100020 + state.patients.length + 1}`,
      allergies: form.allergies ? form.allergies.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    if (editing) {
      const idx = state.patients.findIndex(p => p.id === editing.id);
      state.patients[idx] = record;
    } else {
      state.patients.unshift(record);
    }
    saveState(state);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const reset = () => { setEditing(null); setForm(empty); setSaved(false); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <UserPlus className="text-blue-600" /> {t('patient.register')}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Register new patients or update existing records</p>
        </div>
        <button onClick={reset} className="btn btn-ghost">+ New Patient</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PatientSearch onSelect={handleSelect} />
        </div>

        <form onSubmit={submit} className="lg:col-span-2 card border-t-4 border-blue-500">
          <h3 className="font-semibold text-slate-800 mb-4">{editing ? `Edit · ${editing.mrn}` : t('patient.register')}</h3>

          {saved && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-700">
              <CheckCircle2 size={16} /> {t('patient.saved')}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">{t('patient.mrn')}</label>
              <input className="input" value={form.mrn} onChange={e => set('mrn', e.target.value)} placeholder="Auto-generated if blank" /></div>
            <div><label className="label">{t('patient.phone')}</label>
              <input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} required /></div>
            <div><label className="label">{t('patient.name')}</label>
              <input className="input" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div><label className="label">{t('patient.nameAr')}</label>
              <input className="input" value={form.nameAr} onChange={e => set('nameAr', e.target.value)} dir="rtl" /></div>
            <div><label className="label">{t('patient.dob')}</label>
              <input type="date" className="input" value={form.dob} onChange={e => set('dob', e.target.value)} required /></div>
            <div><label className="label">{t('patient.gender')}</label>
              <select className="input" value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="male">{t('patient.male')}</option>
                <option value="female">{t('patient.female')}</option>
              </select></div>
            <div><label className="label">{t('patient.nationality')}</label>
              <input className="input" value={form.nationality} onChange={e => set('nationality', e.target.value)} /></div>
            <div><label className="label">{t('patient.bloodGroup')}</label>
              <select className="input" value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}>
                {['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(b => <option key={b} value={b}>{b}</option>)}
              </select></div>
            <div><label className="label">{t('patient.idType')}</label>
              <select className="input" value={form.idType} onChange={e => set('idType', e.target.value)}>
                <option value="national">{t('patient.nationalId')}</option>
                <option value="iqama">{t('patient.iqama')}</option>
                <option value="passport">{t('patient.passport')}</option>
              </select></div>
            <div><label className="label">{t('patient.idNumber')}</label>
              <input className="input" value={form.idNumber} onChange={e => set('idNumber', e.target.value)} required /></div>
            <div><label className="label">{t('patient.emergencyContact')}</label>
              <input className="input" value={form.emergencyContact} onChange={e => set('emergencyContact', e.target.value)} /></div>
            <div><label className="label">{t('patient.allergies')}</label>
              <input className="input" value={form.allergies} onChange={e => set('allergies', e.target.value)} placeholder="Penicillin, Sulfa, ..." /></div>
          </div>

          <h4 className="font-semibold text-slate-800 mt-6 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-teal-500 rounded-full" /> Insurance Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="label">{t('patient.insuranceCompany')}</label>
              <select className="input" value={form.insurance.company} onChange={e => setIns('company', e.target.value)}>
                {INSURANCE_COMPANIES.map(c => <option key={c.key} value={c.key}>{c.name}</option>)}
              </select></div>
            <div><label className="label">{t('patient.policyNumber')}</label>
              <input className="input" value={form.insurance.policyNumber} onChange={e => setIns('policyNumber', e.target.value)} /></div>
            <div><label className="label">{t('patient.cchiId')}</label>
              <input className="input" value={form.insurance.cchiId} onChange={e => setIns('cchiId', e.target.value)} /></div>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn btn-primary"><Save size={16} /> {t('app.save')}</button>
            <button type="button" onClick={reset} className="btn btn-ghost">{t('app.cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
