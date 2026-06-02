import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserPlus, Save, CheckCircle2 } from 'lucide-react';
import PatientSearch from '../components/PatientSearch';
import { loadState, saveState, uid } from '../data/storage';
import { INSURANCE_COMPANIES } from '../data/seed';

const empty = {
  mrn: '', name: '', dob: '', gender: 'male', nationality: 'Indian',
  idType: 'aadhaar', idNumber: '', pan: '', abha: '',
  phone: '', area: '', bloodGroup: 'O+',
  insurance: { company: 'star_health', policyNumber: '', memberId: '' },
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
      ...empty,
      ...p,
      allergies: (p.allergies || []).join(', '),
      insurance: p.insurance || { company: 'star_health', policyNumber: '', memberId: '' },
    });
    setSaved(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const state = loadState();
    const record = {
      ...form,
      id: editing?.id || uid('p'),
      mrn: form.mrn || `JH-${100020 + state.patients.length + 1}`,
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

  // Group insurers by category for nicer dropdown
  const insurerGroups = INSURANCE_COMPANIES.reduce((acc, c) => {
    (acc[c.category] = acc[c.category] || []).push(c);
    return acc;
  }, {});
  const categoryLabels = {
    health: 'Standalone Health Insurers',
    general: 'General Insurers',
    psu: 'Public Sector Undertaking (PSU)',
    govt: 'Government Schemes',
    tpa: 'Third-Party Administrators (TPA)',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <UserPlus className="text-rose-600" /> Patient Registration
          </h1>
          <p className="text-slate-500 text-sm mt-1">Register new patients or update existing records · Aadhaar / PAN / ABHA</p>
        </div>
        <button onClick={reset} className="btn btn-ghost">+ New Patient</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PatientSearch onSelect={handleSelect} />
        </div>

        <form onSubmit={submit} className="lg:col-span-2 card border-t-4 border-rose-500">
          <h3 className="font-semibold text-slate-800 mb-4">{editing ? `Edit · ${editing.mrn}` : 'Register Patient'}</h3>

          {saved && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-700">
              <CheckCircle2 size={16} /> Patient record saved successfully
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">MRN / File Number</label>
              <input className="input" value={form.mrn} onChange={e => set('mrn', e.target.value)} placeholder="Auto-generated (JH-100XXX) if blank" /></div>
            <div><label className="label">Mobile Number</label>
              <input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} required placeholder="10-digit Indian mobile" maxLength={10} /></div>
            <div className="md:col-span-2"><label className="label">Full Name</label>
              <input className="input" value={form.name} onChange={e => set('name', e.target.value)} required /></div>
            <div><label className="label">Date of Birth</label>
              <input type="date" className="input" value={form.dob} onChange={e => set('dob', e.target.value)} required /></div>
            <div><label className="label">Gender</label>
              <select className="input" value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select></div>
            <div><label className="label">Nationality</label>
              <select className="input" value={form.nationality} onChange={e => set('nationality', e.target.value)}>
                <option>Indian</option>
                <option>Indian (OCI)</option>
                <option>NRI</option>
                <option>Foreign National</option>
              </select></div>
            <div><label className="label">Blood Group</label>
              <select className="input" value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}>
                {['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(b => <option key={b} value={b}>{b}</option>)}
              </select></div>
            <div><label className="label">Area / Locality</label>
              <input className="input" value={form.area} onChange={e => set('area', e.target.value)} placeholder="T. Nagar, Adyar, Anna Nagar..." /></div>
            <div><label className="label">Primary ID Type</label>
              <select className="input" value={form.idType} onChange={e => set('idType', e.target.value)}>
                <option value="aadhaar">Aadhaar (12-digit UID)</option>
                <option value="passport">Passport</option>
                <option value="voter">Voter ID (EPIC)</option>
                <option value="driving">Driving Licence</option>
                <option value="ration">Ration Card</option>
              </select></div>
            <div><label className="label">ID Number</label>
              <input className="input" value={form.idNumber} onChange={e => set('idNumber', e.target.value)} required placeholder={form.idType === 'aadhaar' ? '1234 5678 9012' : ''} /></div>
            <div><label className="label">PAN (optional)</label>
              <input className="input uppercase" value={form.pan} onChange={e => set('pan', e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10} /></div>
            <div><label className="label">ABHA ID (Ayushman Bharat Health Account)</label>
              <input className="input" value={form.abha} onChange={e => set('abha', e.target.value)} placeholder="14-digit ABHA — e.g. 12-3456-7890-1234" /></div>
            <div><label className="label">Emergency Contact</label>
              <input className="input" value={form.emergencyContact} onChange={e => set('emergencyContact', e.target.value)} placeholder="10-digit mobile" maxLength={10} /></div>
            <div className="md:col-span-2"><label className="label">Known Allergies (comma-separated)</label>
              <input className="input" value={form.allergies} onChange={e => set('allergies', e.target.value)} placeholder="Penicillin, Sulfa, Iodine, ..." /></div>
          </div>

          <h4 className="font-semibold text-slate-800 mt-6 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-teal-500 rounded-full" /> Insurance / TPA Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="label">Insurer / Scheme</label>
              <select className="input" value={form.insurance.company} onChange={e => setIns('company', e.target.value)}>
                <option value="">— None / Self-Pay —</option>
                {Object.entries(insurerGroups).map(([cat, list]) => (
                  <optgroup key={cat} label={categoryLabels[cat] || cat}>
                    {list.map(c => <option key={c.key} value={c.key}>{c.name}</option>)}
                  </optgroup>
                ))}
              </select></div>
            <div><label className="label">Policy / Card Number</label>
              <input className="input" value={form.insurance.policyNumber} onChange={e => setIns('policyNumber', e.target.value)} /></div>
            <div><label className="label">Member ID / Employee No</label>
              <input className="input" value={form.insurance.memberId} onChange={e => setIns('memberId', e.target.value)} placeholder="For TPA card reference" /></div>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn bg-rose-600 text-white hover:bg-rose-700"><Save size={16} /> Save Patient</button>
            <button type="button" onClick={reset} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
