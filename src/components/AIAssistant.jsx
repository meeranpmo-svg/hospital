import { useState } from 'react';
import { Sparkles, Send, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const KNOWLEDGE = [
  {
    keywords: ['chest pain', 'angina', 'heart pain', 'cardiac', 'palpitation'],
    diagnosis: ['Acute Coronary Syndrome (ACS)', 'Stable Angina', 'Pericarditis', 'GERD'],
    tests: ['ECG (12-lead)', 'Troponin I/T', 'CK-MB', 'CBC', 'Chest X-Ray', 'Echocardiogram'],
    drugs: ['Aspirin 81mg', 'Atorvastatin 20mg', 'Sublingual Nitroglycerin'],
    interactions: ['Aspirin + Warfarin = bleeding risk', 'Atorvastatin + Grapefruit = increased toxicity'],
  },
  {
    keywords: ['fever', 'cough', 'cold', 'flu', 'sore throat', 'respiratory'],
    diagnosis: ['Acute Upper Respiratory Infection', 'Influenza', 'COVID-19', 'Bacterial Pharyngitis'],
    tests: ['CBC', 'COVID-19 Antigen', 'Throat swab culture', 'Chest X-Ray (if dyspnea)'],
    drugs: ['Paracetamol 500mg', 'Cetirizine 10mg', 'Amoxicillin 500mg (if bacterial)'],
    interactions: ['Amoxicillin + Methotrexate = toxicity'],
  },
  {
    keywords: ['diabetes', 'sugar', 'hyperglycemia', 'thirst', 'polyuria'],
    diagnosis: ['Type 2 Diabetes Mellitus', 'Diabetic Ketoacidosis', 'Pre-Diabetes'],
    tests: ['HbA1c', 'Fasting Glucose', 'Random Glucose', 'Urinalysis', 'Lipid Panel', 'Renal function'],
    drugs: ['Metformin 850mg', 'Insulin Glargine'],
    interactions: ['Metformin + IV contrast = lactic acidosis risk — hold for 48h'],
  },
  {
    keywords: ['hypertension', 'high blood pressure', 'bp'],
    diagnosis: ['Essential Hypertension (I10)', 'Secondary Hypertension', 'White-Coat Hypertension'],
    tests: ['ECG', 'Lipid Panel', 'Renal Function', 'Urinalysis', 'Echocardiogram'],
    drugs: ['Lisinopril 10mg', 'Amlodipine 5mg', 'Atorvastatin 20mg'],
    interactions: ['Lisinopril + Potassium-sparing diuretics = hyperkalemia', 'Lisinopril + NSAIDs = AKI risk'],
  },
  {
    keywords: ['back pain', 'spine', 'lumbar', 'sciatica'],
    diagnosis: ['Mechanical Low Back Pain (M54.5)', 'Lumbar Disc Herniation', 'Muscle Strain'],
    tests: ['X-Ray Lumbar Spine', 'MRI (if neuro symptoms)', 'CBC', 'ESR'],
    drugs: ['Paracetamol 500mg', 'Ibuprofen 400mg (with caution)'],
    interactions: ['Ibuprofen + Aspirin = GI bleeding', 'Ibuprofen + Lisinopril = AKI'],
  },
  {
    keywords: ['headache', 'migraine', 'head'],
    diagnosis: ['Tension-type Headache', 'Migraine without aura', 'Cluster Headache'],
    tests: ['BP measurement', 'Neuro exam', 'CT/MRI brain (if red flags)'],
    drugs: ['Paracetamol 500mg', 'Ibuprofen 400mg'],
    interactions: [],
  },
];

export default function AIAssistant({ patient }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleAsk = () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      const q = query.toLowerCase();
      const match = KNOWLEDGE.find(k => k.keywords.some(kw => q.includes(kw)));
      const generic = {
        diagnosis: ['Differential diagnosis requires more information', 'Consider full history & physical examination'],
        tests: ['CBC', 'CMP', 'Urinalysis'],
        drugs: ['Symptomatic management as appropriate'],
        interactions: [],
      };
      const result = match || generic;

      const allergyWarnings = [];
      if (patient?.allergies?.length) {
        result.drugs.forEach(d => {
          patient.allergies.forEach(a => {
            if (d.toLowerCase().includes(a.toLowerCase())) {
              allergyWarnings.push(`⚠️ Patient allergic to ${a} — avoid ${d}`);
            }
          });
        });
      }
      setResponse({ ...result, allergyWarnings });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="card border-l-4 border-l-purple-500">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
          <Sparkles size={16} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{t('doctor.aiAssistant')}</h3>
          <p className="text-xs text-slate-500">Simulated · Educational use only</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder={t('doctor.aiPrompt')}
          className="input"
        />
        <button onClick={handleAsk} disabled={loading} className="btn btn-primary">
          {loading ? '...' : <Send size={16} />}
        </button>
      </div>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-purple-700">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
          Analyzing clinical query...
        </div>
      )}

      {response && (
        <div className="mt-4 space-y-3 text-sm">
          {response.allergyWarnings.length > 0 && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
              <div className="font-semibold text-rose-700 flex items-center gap-1.5 mb-1">
                <AlertTriangle size={14} /> Allergy Alert
              </div>
              {response.allergyWarnings.map((w, i) => (
                <div key={i} className="text-rose-700 text-xs">{w}</div>
              ))}
            </div>
          )}
          <Section title="Possible Diagnoses" items={response.diagnosis} color="purple" />
          <Section title="Recommended Tests" items={response.tests} color="orange" />
          <Section title="Suggested Medications" items={response.drugs} color="emerald" />
          {response.interactions?.length > 0 && (
            <Section title="Drug Interactions to Watch" items={response.interactions} color="rose" />
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, items, color }) {
  const map = {
    purple:  'bg-purple-50  text-purple-800  border-purple-200',
    orange:  'bg-orange-50  text-orange-800  border-orange-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    rose:    'bg-rose-50    text-rose-800    border-rose-200',
  };
  return (
    <div className={`p-3 rounded-lg border ${map[color]}`}>
      <div className="font-semibold mb-1.5">{title}</div>
      <ul className="list-disc ltr:pl-5 rtl:pr-5 space-y-0.5">
        {items.map((i, idx) => <li key={idx}>{i}</li>)}
      </ul>
    </div>
  );
}
