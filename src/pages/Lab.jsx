import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlaskConical, Save, Printer, AlertCircle } from 'lucide-react';
import { loadState, saveState } from '../data/storage';
import { LAB_TESTS } from '../data/seed';

export default function Lab() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState('queue');
  const [editing, setEditing] = useState(null);
  const [results, setResults] = useState({});
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();
  const findPatient = (id) => state.patients.find(p => p.id === id);

  const startEdit = (lab) => {
    setEditing(lab);
    setResults(lab.results || {});
  };

  const save = () => {
    const s = loadState();
    const lab = s.labOrders.find(l => l.id === editing.id);
    if (!lab) return;
    lab.results = results;
    lab.status = 'completed';
    saveState(s);
    setEditing(null);
    setResults({});
    refresh();
  };

  const queue = state.labOrders.filter(l => l.status !== 'completed');
  const completed = state.labOrders.filter(l => l.status === 'completed');

  const list = tab === 'queue' ? queue : completed;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><FlaskConical size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">{t('nav.lab')}</h1>
            <p className="text-white/90 text-sm">Lab orders, results entry & reporting</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('queue')}     className={`px-4 py-2 rounded-lg font-medium ${tab === 'queue'     ? 'bg-orange-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>{t('lab.queue')} ({queue.length})</button>
        <button onClick={() => setTab('completed')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'completed' ? 'bg-orange-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>Completed ({completed.length})</button>
      </div>

      <div className="space-y-4">
        {list.length === 0 && <div className="card text-center text-slate-500">{t('app.noData')}</div>}
        {list.map(lab => {
          const p = findPatient(lab.patientId);
          const urgencyClass = lab.urgency === 'STAT' ? 'badge-danger' : lab.urgency === 'urgent' ? 'badge-warning' : 'badge-info';
          return (
            <div key={lab.id} className={`card border-l-4 ${lab.status === 'completed' ? 'border-l-emerald-500' : 'border-l-orange-500'}`}>
              <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                <div>
                  <div className="font-semibold text-slate-800">{i18n.language === 'ar' ? p?.nameAr : p?.name}</div>
                  <div className="text-xs text-slate-500">{p?.mrn} · {lab.date}</div>
                </div>
                <div className="flex gap-2">
                  <span className={`badge ${urgencyClass}`}>{lab.urgency.toUpperCase()}</span>
                  <span className={`badge ${lab.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>{lab.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                {lab.tests.map(code => {
                  const test = LAB_TESTS.find(x => x.code === code);
                  return (
                    <div key={code} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="font-medium text-slate-800 text-sm">{test ? (i18n.language === 'ar' ? test.nameAr : test.name) : code}</div>
                      <div className="text-xs text-slate-500">{test?.code} · {test?.category}</div>
                      {lab.results?.[code] && <div className="mt-2 text-sm text-slate-700 p-2 bg-white rounded border border-slate-200">{lab.results[code]}</div>}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2 justify-end">
                {lab.status !== 'completed' && (
                  <button onClick={() => startEdit(lab)} className="btn bg-orange-600 text-white hover:bg-orange-700">
                    <FlaskConical size={16}/> {t('lab.enterResults')}
                  </button>
                )}
                {lab.status === 'completed' && (
                  <button onClick={() => window.print()} className="btn btn-ghost"><Printer size={16}/> Print Report</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">{t('lab.enterResults')}</h3>
              <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-5 space-y-3">
              {editing.tests.map(code => {
                const test = LAB_TESTS.find(x => x.code === code);
                return (
                  <div key={code}>
                    <label className="label">{test?.name} ({code})</label>
                    <textarea
                      className="input min-h-[80px]"
                      value={results[code] || ''}
                      onChange={e => setResults({...results, [code]: e.target.value})}
                      placeholder="Enter result values, observations..."
                    />
                  </div>
                );
              })}
            </div>
            <div className="p-5 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="btn btn-ghost">{t('app.cancel')}</button>
              <button onClick={save} className="btn btn-success"><Save size={16}/> {t('lab.markReady')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
