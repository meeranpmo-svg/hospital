import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Receipt, Plus, Trash2, FileText, CheckCircle2 } from 'lucide-react';
import PatientSearch from '../components/PatientSearch';
import { loadState, saveState, uid } from '../data/storage';
import { INSURANCE_COMPANIES } from '../data/seed';

export default function Billing() {
  const { t, i18n } = useTranslation();
  const [patient, setPatient] = useState(null);
  const [items, setItems] = useState([{ desc: '', amount: 0 }]);
  const [coverage, setCoverage] = useState(80);
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const total = items.reduce((s, i) => s + (Number(i.amount) || 0), 0);
  const insCov = (total * coverage) / 100;
  const patientPays = total - insCov;

  const setItem = (i, k, v) => setItems(items.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const addItem = () => setItems([...items, { desc: '', amount: 0 }]);
  const remItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const generate = () => {
    if (!patient || items.every(x => !x.desc)) return alert('Add patient and items');
    const s = loadState();
    s.bills.push({
      id: uid('b'), patientId: patient.id,
      date: new Date().toISOString().slice(0, 10),
      items: items.filter(x => x.desc),
      total, insuranceCovered: insCov, patientPays, status: 'pending',
    });
    saveState(s);
    setItems([{ desc: '', amount: 0 }]);
    refresh();
    alert('Bill generated');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-yellow-600 to-amber-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Receipt size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">{t('nav.billing')}</h1>
            <p className="text-white/90 text-sm">Generate bills · Insurance split · Track status</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1"><PatientSearch onSelect={setPatient} /></div>

        <div className="lg:col-span-2 card">
          <h3 className="font-semibold text-slate-800 mb-3">{t('billing.generate')}</h3>
          {patient && (
            <div className="p-3 rounded-lg bg-slate-50 mb-4">
              <div className="font-medium">{i18n.language === 'ar' ? patient.nameAr : patient.name}</div>
              <div className="text-xs text-slate-500">{patient.mrn} · {INSURANCE_COMPANIES.find(c => c.key === patient.insurance?.company)?.name}</div>
            </div>
          )}

          <div className="space-y-2">
            {items.map((it, i) => (
              <div key={i} className="grid grid-cols-12 gap-2">
                <input className="input col-span-8" placeholder="Description (Consultation, Lab, Pharmacy, ...)" value={it.desc} onChange={e => setItem(i, 'desc', e.target.value)} />
                <input className="input col-span-3" type="number" placeholder="Amount" value={it.amount} onChange={e => setItem(i, 'amount', e.target.value)} />
                <button onClick={() => remItem(i)} className="col-span-1 p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
          <button onClick={addItem} className="btn btn-ghost text-sm mt-2"><Plus size={14}/> Add Item</button>

          <div className="mt-4 p-4 rounded-lg bg-slate-50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">Insurance Coverage:</span>
              <input type="number" className="input max-w-[100px]" value={coverage} onChange={e => setCoverage(Number(e.target.value))} />
              <span className="text-sm">%</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div><div className="text-slate-500">{t('billing.total')}</div><div className="font-bold text-lg">{total.toFixed(2)} SAR</div></div>
              <div><div className="text-slate-500">{t('billing.covered')}</div><div className="font-bold text-lg text-emerald-700">{insCov.toFixed(2)} SAR</div></div>
              <div><div className="text-slate-500">{t('billing.patientPays')}</div><div className="font-bold text-lg text-amber-700">{patientPays.toFixed(2)} SAR</div></div>
            </div>
          </div>

          <button onClick={generate} className="btn btn-primary mt-4"><FileText size={16}/> {t('billing.generate')}</button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-3">All Bills</h3>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-200">
              <th className="ltr:text-left rtl:text-right py-2 px-3">Date</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Patient</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">{t('billing.total')}</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">{t('billing.covered')}</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">{t('billing.patientPays')}</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">{t('billing.status')}</th>
            </tr>
          </thead>
          <tbody>
            {state.bills.map(b => {
              const p = state.patients.find(x => x.id === b.patientId);
              return (
                <tr key={b.id} className="border-b border-slate-100">
                  <td className="py-2 px-3 text-sm">{b.date}</td>
                  <td className="py-2 px-3 font-medium">{p?.name}</td>
                  <td className="py-2 px-3">{b.total} SAR</td>
                  <td className="py-2 px-3 text-emerald-700">{b.insuranceCovered} SAR</td>
                  <td className="py-2 px-3 text-amber-700">{b.patientPays} SAR</td>
                  <td className="py-2 px-3"><span className={`badge ${b.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{t(`billing.${b.status}`)}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
