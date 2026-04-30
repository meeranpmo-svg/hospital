import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Loader2, CheckCircle2, XCircle, FileText, Clock, Send } from 'lucide-react';
import PatientSearch from '../components/PatientSearch';
import { loadState, saveState, uid } from '../data/storage';
import { INSURANCE_COMPANIES } from '../data/seed';

export default function Insurance() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState('eligibility');
  const [patient, setPatient] = useState(null);
  const [checking, setChecking] = useState(false);
  const [eligibility, setEligibility] = useState(null);

  const [paService, setPaService] = useState('');
  const [paAmount, setPaAmount] = useState('');
  const [paNotes, setPaNotes]   = useState('');
  const [, force] = useState(0);
  const refresh = () => force(x => x + 1);

  const state = loadState();

  const check = () => {
    if (!patient) return;
    setChecking(true);
    setEligibility(null);
    setTimeout(() => {
      const eligible = !!patient.insurance?.cchiId;
      setEligibility({
        eligible,
        coverage: eligible ? 80 : 0,
        deductible: eligible ? 50 : 0,
        memberSince: '2022-04-01',
        plan: 'Cooperative · Class B',
        approvedServices: eligible ? ['Outpatient consultation','Pharmacy (formulary)','Lab routine','Imaging (with PA)','Emergency'] : [],
      });
      setChecking(false);
    }, 1500);
  };

  const submitPA = () => {
    if (!patient || !paService) return alert('Select patient and service');
    const s = loadState();
    s.preAuths.push({
      id: uid('pa'),
      patientId: patient.id,
      service: paService,
      amount: Number(paAmount) || 0,
      notes: paNotes,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      company: patient.insurance?.company,
    });
    saveState(s);
    setPaService(''); setPaAmount(''); setPaNotes('');
    refresh();
    alert('Pre-authorization submitted');
  };

  const updatePA = (id, status) => {
    const s = loadState();
    const pa = s.preAuths.find(p => p.id === id);
    if (pa) pa.status = status;
    saveState(s);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><ShieldCheck size={24}/></div>
          <div>
            <h1 className="text-2xl font-bold">{t('nav.insurance')}</h1>
            <p className="text-white/90 text-sm">CCHI eligibility · Pre-authorizations · Claims</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          {k:'eligibility', l: t('insurance.eligibility')},
          {k:'preauth',     l: t('insurance.preAuth')},
          {k:'claims',      l: t('insurance.claims')},
          {k:'compliance',  l: t('insurance.compliance')},
        ].map(b => (
          <button key={b.k} onClick={() => setTab(b.k)} className={`px-4 py-2 rounded-lg font-medium ${tab === b.k ? 'bg-teal-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>{b.l}</button>
        ))}
      </div>

      {tab === 'eligibility' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1"><PatientSearch onSelect={setPatient} /></div>
          <div className="lg:col-span-2 card">
            <h3 className="font-semibold text-slate-800 mb-3">{t('insurance.eligibility')}</h3>
            {patient ? (
              <>
                <div className="p-3 rounded-lg bg-slate-50 mb-4">
                  <div className="font-medium">{i18n.language === 'ar' ? patient.nameAr : patient.name}</div>
                  <div className="text-xs text-slate-500">{patient.mrn} · {INSURANCE_COMPANIES.find(c => c.key === patient.insurance?.company)?.name} · Policy {patient.insurance?.policyNumber}</div>
                </div>
                <button onClick={check} disabled={checking} className="btn bg-teal-600 text-white hover:bg-teal-700">
                  {checking ? <><Loader2 size={16} className="animate-spin"/> {t('insurance.checking')}</> : <>{t('appointment.checkEligibility')} (CCHI)</>}
                </button>

                {eligibility && (
                  <div className={`mt-4 p-4 rounded-lg border ${eligibility.eligible ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      {eligibility.eligible ? <CheckCircle2 className="text-emerald-600"/> : <XCircle className="text-rose-600"/>}
                      <span className={`font-bold text-lg ${eligibility.eligible ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {eligibility.eligible ? t('insurance.eligible') : t('insurance.notEligible')}
                      </span>
                    </div>
                    {eligibility.eligible && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                          <div className="p-2 bg-white rounded"><div className="text-xs text-slate-500">{t('insurance.coverage')}</div><div className="font-bold">{eligibility.coverage}%</div></div>
                          <div className="p-2 bg-white rounded"><div className="text-xs text-slate-500">{t('insurance.deductible')}</div><div className="font-bold">{eligibility.deductible} SAR</div></div>
                          <div className="p-2 bg-white rounded"><div className="text-xs text-slate-500">Plan</div><div className="font-medium text-xs">{eligibility.plan}</div></div>
                          <div className="p-2 bg-white rounded"><div className="text-xs text-slate-500">Member Since</div><div className="font-medium text-xs">{eligibility.memberSince}</div></div>
                        </div>
                        <div className="text-sm">
                          <div className="text-slate-600 mb-1">Approved Services:</div>
                          <div className="flex flex-wrap gap-1">{eligibility.approvedServices.map(s => <span key={s} className="badge badge-success">{s}</span>)}</div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            ) : <div className="text-slate-500 text-sm">Select a patient to check eligibility</div>}
          </div>
        </div>
      )}

      {tab === 'preauth' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <PatientSearch onSelect={setPatient} />
            {patient && (
              <div className="card">
                <h4 className="font-semibold mb-3">Submit Pre-Authorization</h4>
                <div className="space-y-3">
                  <div><label className="label">Service</label>
                    <input className="input" value={paService} onChange={e => setPaService(e.target.value)} placeholder="MRI Brain, Cardiac Cath..." /></div>
                  <div><label className="label">Estimated Amount (SAR)</label>
                    <input type="number" className="input" value={paAmount} onChange={e => setPaAmount(e.target.value)} placeholder="0" /></div>
                  <div><label className="label">Clinical Notes</label>
                    <textarea className="input min-h-[80px]" value={paNotes} onChange={e => setPaNotes(e.target.value)} /></div>
                  <button onClick={submitPA} className="btn bg-teal-600 text-white hover:bg-teal-700 w-full justify-center"><Send size={16}/> {t('insurance.submit')}</button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2 card">
            <h3 className="font-semibold text-slate-800 mb-3">Pre-Auth Requests</h3>
            {state.preAuths.length === 0 ? <div className="text-slate-500 text-sm">{t('app.noData')}</div> :
              <div className="space-y-3">
                {state.preAuths.slice().reverse().map(pa => {
                  const p = state.patients.find(x => x.id === pa.patientId);
                  return (
                    <div key={pa.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">{p?.name}</div>
                        <span className={`badge ${pa.status === 'approved' ? 'badge-success' : pa.status === 'rejected' ? 'badge-danger' : 'badge-warning'}`}>{t(`insurance.${pa.status}`)}</span>
                      </div>
                      <div className="text-sm text-slate-700">{pa.service} · {pa.amount} SAR</div>
                      <div className="text-xs text-slate-500 capitalize">{pa.company} · {new Date(pa.submittedAt).toLocaleString()}</div>
                      {pa.notes && <div className="text-xs text-slate-600 mt-1">"{pa.notes}"</div>}
                      {pa.status === 'pending' && (
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => updatePA(pa.id, 'approved')} className="btn btn-success text-sm">Approve</button>
                          <button onClick={() => updatePA(pa.id, 'rejected')} className="btn btn-danger text-sm">Reject</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </div>
      )}

      {tab === 'claims' && (
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-3">{t('insurance.claims')}</h3>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-200">
                <th className="ltr:text-left rtl:text-right py-2 px-3">Patient</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Insurer</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Total</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Insurance</th>
                <th className="ltr:text-left rtl:text-right py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {state.bills.map(b => {
                const p = state.patients.find(x => x.id === b.patientId);
                const c = INSURANCE_COMPANIES.find(x => x.key === p?.insurance?.company);
                return (
                  <tr key={b.id} className="border-b border-slate-100">
                    <td className="py-2 px-3 font-medium">{p?.name}</td>
                    <td className="py-2 px-3">{c?.name}</td>
                    <td className="py-2 px-3">{b.total} SAR</td>
                    <td className="py-2 px-3">{b.insuranceCovered} SAR</td>
                    <td className="py-2 px-3"><span className="badge badge-info"><FileText size={10} className="mr-1"/> Submitted</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'compliance' && (
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-3">{t('insurance.compliance')}</h3>
          <p className="text-sm text-slate-600 mb-4">Required fields for Saudi Council of Cooperative Health Insurance (CCHI) submissions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              { req: 'Patient National ID / Iqama', exists: 'Captured at registration' },
              { req: 'CCHI Member ID', exists: 'Linked to insurance record' },
              { req: 'Insurer Policy Number', exists: 'Stored in patient profile' },
              { req: 'ICD-10 Diagnosis Code', exists: 'Required at consultation' },
              { req: 'CPT / Service Code', exists: 'Generated at billing' },
              { req: 'Facility License Number', exists: 'MOH-LIC-12345 (system-wide)' },
              { req: 'Provider License Number', exists: 'Per doctor profile' },
              { req: 'Pre-Auth Reference (when required)', exists: 'Generated on PA approval' },
            ].map((f, i) => (
              <div key={i} className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600"/><span className="font-medium">{f.req}</span></div>
                <div className="text-xs text-slate-600 mt-1">{f.exists}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
