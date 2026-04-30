import { useState } from 'react';
import { Search, User, X } from 'lucide-react';
import { loadState } from '../data/storage';
import { useTranslation } from 'react-i18next';

export default function PatientSearch({ onSelect, autoOpen = false }) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(autoOpen);
  const state = loadState();

  const lowerQ = query.trim().toLowerCase();
  const results = !lowerQ ? state.patients.slice(0, 8) : state.patients.filter(p =>
    p.mrn.toLowerCase().includes(lowerQ) ||
    p.idNumber?.toLowerCase().includes(lowerQ) ||
    p.name.toLowerCase().includes(lowerQ) ||
    p.nameAr?.includes(query) ||
    p.phone?.includes(lowerQ)
  ).slice(0, 12);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Search size={16} className="text-blue-600" /> {t('patient.find')}
        </h3>
        {query && (
          <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        )}
      </div>
      <input
        autoFocus={autoOpen}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={`${t('patient.mrn')} / ${t('patient.nationalId')} / ${t('patient.iqama')} / ${t('patient.passport')} / ${t('patient.phone')}`}
        className="input"
      />
      {open && (
        <div className="mt-3 divide-y divide-slate-100 max-h-96 overflow-y-auto rounded-lg border border-slate-100">
          {results.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-sm">{t('app.noData')}</div>
          ) : results.map(p => (
            <button
              key={p.id}
              onClick={() => { onSelect?.(p); setOpen(false); }}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <User size={16} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-800">{i18n.language === 'ar' ? p.nameAr : p.name}</div>
                <div className="text-xs text-slate-500 flex flex-wrap gap-x-3">
                  <span>{p.mrn}</span>
                  <span className="capitalize">{p.idType}: {p.idNumber}</span>
                  <span>{p.phone}</span>
                </div>
              </div>
              <span className="text-xs text-slate-500">{p.nationality}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
