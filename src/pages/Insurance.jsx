import { useState } from 'react';
import { ShieldCheck, Loader2, CheckCircle2, XCircle, FileText, Send } from 'lucide-react';
import PatientSearch from '../components/PatientSearch';
import { loadState, saveState, uid } from '../data/storage';
import { INSURANCE_COMPANIES } from '../data/seed';

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function Insurance() {
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
      const insurer = INSURANCE_COMPANIES.find(c => c.key === patient.insurance?.company);
      const isGovt = insurer?.category === 'govt';
      const eligible = !!patient.insurance?.policyNumber;
      setEligibility({
        eligible,
        insurer: insurer?.name || 'Unknown',
        category: insurer?.category,
        sumInsured: isGovt ? 500000 : 300000,                  // ₹5L for PM-JAY, ₹3L typical
        roomRent: isGovt ? 'No limit (govt scheme)' : '1% of sum insured / day',
        coPay: isGovt ? '0%' : (patient.dob && (new Date().getFullYear() - new Date(patient.dob).getFullYear()) > 60 ? '10%' : '0%'),
        coverage: isGovt ? 100 : 80,
        approvedServices: eligible ? ['Outpatient consultation','Diagnostics & lab','Day-care procedures','Inpatient (with pre-auth)','Pharmacy (formulary)','Emergency'] : [],
        memberSince: '2022-04-01',
        ageRestriction: 'Within policy age band',
        cashlessAt: 'All network hospitals',
        message: eligible
          ? `Policy active. ${insurer?.name} confirmed eligibility. ${isGovt ? 'Government scheme — 100% coverage at empanelled hospitals.' : 'Co-payment as per policy schedule.'}`
          : 'No valid policy on file — patient pays full amount.',
      });
      setChecking(false);
    }, 1500);
  };

  const submitPA = () => {
    if (!patient || !paService) return alert('Select patient and service');
    const s = loadState();
    s.preAuths.push({
      id: uid('pa'), patientId: patient.id,
      service: paService, amount: Number(paAmount) || 0, notes: paNotes,
      status: 'pending', submittedAt: new Date().toISOString(),
      company: patient.insurance?.company,
    });
    saveState(s);
    setPaService(''); setPaAmount(''); setPaNotes('');
    refresh();
    alert('Pre-authorization request submitted to insurer/TPA');
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
            <h1 className="text-2xl font-bold">Insurance / TPA</h1>
            <p className="text-white/90 text-sm">Eligibility · Pre-Authorization · Claims · IRDAI Compliance</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          {k:'eligibility', l: 'Eligibility Check'},
          {k:'preauth',     l: 'Pre-Authorization'},
          {k:'claims',      l: 'Claims'},
          {k:'compliance',  l: 'IRDAI Compliance'},
        ].map(b => (
          <button key={b.k} onClick={() => setTab(b.k)} className={`px-4 py-2 rounded-lg font-medium ${tab === b.k ? 'bg-teal-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>{b.l}</button>
        ))}
      </div>

      {tab === 'eligibility' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1"><PatientSearch onSelect={setPatient} /></div>
          <div className="lg:col-span-2 card">
            <h3 className="font-semibold text-slate-800 mb-3">Cashless Eligibility Check</h3>
            {patient ? (
              <>
                <div className="p-3 rounded-lg bg-slate-50 mb-4">
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-xs text-slate-500">
                    {patient.mrn} · {INSURANCE_COMPANIES.find(c => c.key === patient.insurance?.company)?.name || 'Self-Pay'}
                    {patient.insurance?.policyNumber && ` · Policy ${patient.insurance.policyNumber}`}
                  </div>
                  {patient.abha && <div className="text-xs text-slate-600 mt-1">ABHA: <span className="font-mono">{patient.abha}</span></div>}
                </div>
                <button onClick={check} disabled={checking} className="btn bg-teal-600 text-white hover:bg-teal-700">
                  {checking ? <><Loader2 size={16} className="animate-spin"/> Verifying with insurer/TPA...</> : <>Check Eligibility</>}
                </button>

                {eligibility && (
                  <div className={`mt-4 p-4 rounded-lg border ${eligibility.eligible ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      {eligibility.eligible ? <CheckCircle2 className="text-emerald-600"/> : <XCircle className="text-rose-600"/>}
                      <span className={`font-bold text-lg ${eligibility.eligible ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {eligibility.eligible ? 'Eligible — Cashless Available' : 'Not Eligible'}
                      </span>
                      {eligibility.category === 'govt' && <span className="badge badge-info text-xs">Govt Scheme</span>}
                    </div>
                    {eligibility.eligible && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                          <div className="p-2 bg-white rounded"><div className="text-xs text-slate-500">Sum Insured</div><div className="font-bold">{inr(eligibility.sumInsured)}</div></div>
                          <div className="p-2 bg-white rounded"><div className="text-xs text-slate-500">Coverage</div><div className="font-bold">{eligibility.coverage}%</div></div>
                          <div className="p-2 bg-white rounded"><div className="text-xs text-slate-500">Co-Pay</div><div className="font-bold">{eligibility.coPay}</div></div>
                          <div className="p-2 bg-white rounded"><div className="text-xs text-slate-500">Room Rent</div><div className="font-medium text-xs">{eligibility.roomRent}</div></div>
                        </div>
                        <div className="text-sm text-slate-700 mb-2">{eligibility.message}</div>
                        <div className="text-sm">
                          <div className="text-slate-600 mb-1">Covered services:</div>
                          <div className="flex flex-wrap gap-1">{eligibility.approvedServices.map(s => <span key={s} className="badge badge-success text-xs">{s}</span>)}</div>
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
                  <div><label className="label">Procedure / Treatment</label>
                    <input className="input" value={paService} onChange={e => setPaService(e.target.value)} placeholder="MRI Brain, Cardiac Cath, Cataract Surgery..." /></div>
                  <div><label className="label">Estimated Amount (₹)</label>
                    <input type="number" className="input" value={paAmount} onChange={e => setPaAmount(e.target.value)} placeholder="0" /></div>
                  <div><label className="label">Clinical Notes / ICD-10 Code</label>
                    <textarea className="input min-h-[80px]" value={paNotes} onChange={e => setPaNotes(e.target.value)} placeholder="Diagnosis, treating doctor, planned date of admission..." /></div>
                  <button onClick={submitPA} className="btn bg-teal-600 text-white hover:bg-teal-700 w-full justify-center"><Send size={16}/> Submit Pre-Auth</button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2 card">
            <h3 className="font-semibold text-slate-800 mb-3">Pre-Auth Requests Queue</h3>
            {state.preAuths.length === 0 ? <div className="text-slate-500 text-sm">No requests yet</div> :
              <div className="space-y-3">
                {state.preAuths.slice().reverse().map(pa => {
                  const p = state.patients.find(x => x.id === pa.patientId);
                  const ins = INSURANCE_COMPANIES.find(c => c.key === pa.company);
                  return (
                    <div key={pa.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">{p?.name}</div>
                        <span className={`badge ${pa.status === 'approved' ? 'badge-success' : pa.status === 'rejected' ? 'badge-danger' : 'badge-warning'} capitalize`}>{pa.status}</span>
                      </div>
                      <div className="text-sm text-slate-700">{pa.service} · {inr(pa.amount)}</div>
                      <div className="text-xs text-slate-500">{ins?.name || 'Insurer'} · {new Date(pa.submittedAt).toLocaleString('en-IN')}</div>
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
          <h3 className="font-semibold text-slate-800 mb-3">Claims Management</h3>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-200">
                <th className="text-left py-2 px-3">Patient</th>
                <th className="text-left py-2 px-3">Insurer / Scheme</th>
                <th className="text-right py-2 px-3">Total</th>
                <th className="text-right py-2 px-3">Claim Amount</th>
                <th className="text-left py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {state.bills.map(b => {
                const p = state.patients.find(x => x.id === b.patientId);
                const c = INSURANCE_COMPANIES.find(x => x.key === p?.insurance?.company);
                return (
                  <tr key={b.id} className="border-b border-slate-100">
                    <td className="py-2 px-3 font-medium">{p?.name}</td>
                    <td className="py-2 px-3 text-sm">{c?.name || 'Self-Pay'}</td>
                    <td className="py-2 px-3 text-right">{inr(b.total)}</td>
                    <td className="py-2 px-3 text-right text-emerald-700">{inr(b.insuranceCovered)}</td>
                    <td className="py-2 px-3"><span className="badge badge-info"><FileText size={10} className="inline mr-1"/> Submitted</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'compliance' && (
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-3">IRDAI / TPA Compliance Checklist</h3>
          <p className="text-sm text-slate-600 mb-4">
            Insurance Regulatory and Development Authority of India (IRDAI) and TPA requirements for empanelled hospital claims processing:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              { req: 'Patient KYC (Aadhaar / PAN)',           exists: 'Captured at registration' },
              { req: 'ABHA Health ID (preferred)',            exists: 'Optional field; promotes interoperability' },
              { req: 'Insurance Policy Number',               exists: 'Stored in patient profile' },
              { req: 'TPA Member ID / Card Reference',        exists: 'Per patient insurance record' },
              { req: 'ICD-10 Diagnosis Coding',               exists: 'Required at consultation' },
              { req: 'CPT / Service Coding',                  exists: 'Mapped via HSN/SAC at billing' },
              { req: 'Hospital MoH Registration Number',      exists: `${`On every invoice (TN/HFR/2008/01234)`}` },
              { req: 'Drug Licence (Form 20 / 21)',           exists: 'On invoice footer' },
              { req: 'GSTIN (Hospital + B2B Patient)',        exists: 'On every Tax Invoice' },
              { req: 'Pre-Auth Reference (where required)',   exists: 'Generated on PA approval' },
              { req: 'NABH / NABL Accreditation No (if any)', exists: 'Configurable in hospital settings' },
              { req: 'Discharge Summary (post-IP)',           exists: 'Required for cashless settlement' },
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
