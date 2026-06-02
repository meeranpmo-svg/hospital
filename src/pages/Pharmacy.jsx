import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pill, Search, AlertTriangle, Package, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { loadState, saveState } from '../data/storage';

export default function Pharmacy() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState('queue');
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const findPatient = (id) => state.patients.find(p => p.id === id);
  const findDrug    = (id) => state.drugs.find(d => d.id === id);

  const dispense = (rxId) => {
    const s = loadState();
    const rx = s.prescriptions.find(r => r.id === rxId);
    if (!rx) return;
    rx.status = 'dispensed';
    rx.items.forEach(it => {
      const drug = s.drugs.find(d => d.id === it.drugId);
      if (drug) drug.stock = Math.max(0, drug.stock - 30);
    });
    saveState(s);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Pill size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">{t('nav.pharmacy')}</h1>
            <p className="text-white/90 text-sm">Prescription dispensing & drug inventory</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('queue')}     className={`px-4 py-2 rounded-lg font-medium ${tab === 'queue'     ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>{t('pharmacy.queue')}</button>
        <button onClick={() => setTab('inventory')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'inventory' ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>{t('pharmacy.inventory')}</button>
      </div>

      {tab === 'queue' && (
        <div className="space-y-4">
          {state.prescriptions.length === 0 && <div className="card text-center text-slate-500">{t('app.noData')}</div>}
          {state.prescriptions.map(rx => {
            const p = findPatient(rx.patientId);
            const allergyHits = rx.items.flatMap(it => (p?.allergies || []).filter(a => it.name.toLowerCase().includes(a.toLowerCase())).map(a => ({ drug: it.name, allergen: a })));
            const interactions = [];
            for (let i = 0; i < rx.items.length; i++) {
              for (let j = i+1; j < rx.items.length; j++) {
                const d1 = findDrug(rx.items[i].drugId);
                const d2 = findDrug(rx.items[j].drugId);
                if (d1?.interactions?.some(x => d2?.name?.toLowerCase().includes(x.toLowerCase())) ||
                    d2?.interactions?.some(x => d1?.name?.toLowerCase().includes(x.toLowerCase()))) {
                  interactions.push(`${d1?.name} ↔ ${d2?.name}`);
                }
              }
            }
            return (
              <div key={rx.id} className={`card border-l-4 ${rx.status === 'dispensed' ? 'border-l-emerald-500' : 'border-l-purple-500'}`}>
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <div className="font-semibold text-slate-800">{p?.name}</div>
                    <div className="text-xs text-slate-500">{p?.mrn} · {rx.date}</div>
                  </div>
                  <span className={`badge ${rx.status === 'dispensed' ? 'badge-success' : 'badge-warning'}`}>{rx.status}</span>
                </div>

                {(allergyHits.length > 0 || interactions.length > 0) && (
                  <div className="mb-3 p-3 rounded-lg bg-rose-50 border border-rose-200">
                    {allergyHits.length > 0 && <div className="text-sm text-rose-700 font-medium flex items-center gap-1.5"><AlertTriangle size={14}/> {t('pharmacy.allergyWarning')}: {allergyHits.map(h => `${h.drug}/${h.allergen}`).join(', ')}</div>}
                    {interactions.length > 0 && <div className="text-sm text-amber-700 font-medium flex items-center gap-1.5 mt-1"><ShieldAlert size={14}/> {t('pharmacy.interactions')}: {interactions.join('; ')}</div>}
                  </div>
                )}

                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-200">
                      <th className="ltr:text-left rtl:text-right py-2">{t('doctor.drug')}</th>
                      <th className="ltr:text-left rtl:text-right py-2">{t('doctor.dose')}</th>
                      <th className="ltr:text-left rtl:text-right py-2">{t('doctor.frequency')}</th>
                      <th className="ltr:text-left rtl:text-right py-2">{t('doctor.duration')}</th>
                      <th className="ltr:text-left rtl:text-right py-2">{t('doctor.instructions')}</th>
                      <th className="ltr:text-left rtl:text-right py-2">{t('pharmacy.stock')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rx.items.map((it, i) => {
                      const drug = findDrug(it.drugId);
                      return (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 font-medium">{it.name}</td>
                          <td className="py-2">{it.dose}</td>
                          <td className="py-2">{it.freq}</td>
                          <td className="py-2">{it.duration}</td>
                          <td className="py-2 text-slate-600">{it.instructions}</td>
                          <td className="py-2"><span className={`badge ${drug && drug.stock < drug.reorder ? 'badge-danger' : 'badge-success'}`}>{drug?.stock ?? '—'}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {rx.status === 'pending' && (
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => dispense(rx.id)} className="btn bg-purple-600 text-white hover:bg-purple-700"><CheckCircle2 size={16}/> {t('pharmacy.dispense')}</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'inventory' && (
        <div className="card">
          <DrugInventory />
        </div>
      )}
    </div>
  );
}

function DrugInventory() {
  const { t, i18n } = useTranslation();
  const [q, setQ] = useState('');
  const state = loadState();
  const drugs = state.drugs.filter(d => d.name.toLowerCase().includes(q.toLowerCase()) || d.nameAr?.includes(q));
  return (
    <>
      <div className="relative mb-4 max-w-md">
        <Search size={16} className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 text-slate-400" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search drug..." className="input ltr:pl-9 rtl:pr-9" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-200">
              <th className="ltr:text-left rtl:text-right py-2 px-3">{t('doctor.drug')}</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Category</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">{t('pharmacy.stock')}</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">{t('pharmacy.reorder')}</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">{t('pharmacy.expiry')}</th>
              <th className="ltr:text-left rtl:text-right py-2 px-3">Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map(d => {
              const low = d.stock < d.reorder;
              return (
                <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3">
                    <div className="font-medium text-slate-800">{d.name}</div>
                    <div className="text-xs text-slate-500" dir="rtl">{d.nameAr}</div>
                  </td>
                  <td className="py-2 px-3 text-sm">{d.category}</td>
                  <td className="py-2 px-3"><span className={`badge ${low ? 'badge-danger' : 'badge-success'} flex items-center gap-1 w-fit`}><Package size={12}/> {d.stock}</span></td>
                  <td className="py-2 px-3 text-sm">{d.reorder}</td>
                  <td className="py-2 px-3 text-sm flex items-center gap-1"><Calendar size={12} className="text-slate-400"/> {d.expiry}</td>
                  <td className="py-2 px-3 text-sm">{d.price.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
