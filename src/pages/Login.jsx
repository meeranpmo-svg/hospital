import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Activity, Globe, Lock, Mail, ShieldCheck, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react';
import { login, ssoLogin, getAuthProvider } from '../data/storage';
import { SEED_USERS, ROLES } from '../data/seed';
import { setLang } from '../i18n';

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(getAuthProvider());
  const [email, setEmail] = useState('admin@hospital.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [ssoStep, setSsoStep] = useState(null); // null | 'redirecting' | 'authenticating' | 'syncing'
  const [ssoEmail, setSsoEmail] = useState('admin@hospital.com');

  // Re-read provider on focus (in case admin changed it in another tab)
  useEffect(() => {
    const onFocus = () => setProvider(getAuthProvider());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const submit = (e) => {
    e?.preventDefault();
    const u = login(email, password);
    if (u) navigate('/');
    else setError('Invalid credentials');
  };

  const microsoftSignIn = (overrideEmail) => {
    const targetEmail = overrideEmail || ssoEmail;
    setSsoStep('redirecting');
    setTimeout(() => setSsoStep('authenticating'), 1000);
    setTimeout(() => setSsoStep('syncing'), 2200);
    setTimeout(() => {
      const u = ssoLogin(targetEmail);
      if (u) navigate('/');
      else { setSsoStep(null); setError('Account not found in Azure AD'); }
    }, 3400);
  };

  const fillDemo = (u) => {
    setEmail(u.email);
    setPassword('Admin@123');
    setSsoEmail(u.email);
  };

  const toggleLang = () => setLang(i18n.language === 'ar' ? 'en' : 'ar');

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-gradient-to-br from-blue-600 via-emerald-600 to-teal-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 30% 30%, white 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">{t('app.title')}</div>
              <div className="text-white/80 text-sm">{t('app.subtitle')}</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Modern, bilingual Hospital ERP for Saudi healthcare.
          </h1>
          <p className="text-white/90 text-lg max-w-md">
            {t('login.tagline')}
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-3 mt-8">
          {[
            { label: 'CCHI Integrated', icon: ShieldCheck },
            { label: 'AR / EN',         icon: Globe },
            { label: 'M365 SSO Ready',  icon: Activity },
          ].map((f, i) => (
            <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <f.icon size={20} className="mb-2" />
              <div className="font-medium text-sm">{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-6 lg:p-12 bg-white">
        <div className="flex justify-end">
          <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm">
            <Globe size={16} /> {i18n.language === 'ar' ? 'English' : 'عربي'}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('login.title')}</h2>
            <p className="text-slate-500 mb-2">
              {provider === 'azure_ad'
                ? <>Sign in with your <b>Microsoft 365</b> work account</>
                : <>Use any demo account below — password: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Admin@123</code></>}
            </p>
            <div className="mb-6 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 text-xs text-slate-600">
              <span className={`w-1.5 h-1.5 rounded-full ${provider === 'azure_ad' ? 'bg-blue-500' : 'bg-emerald-500'}`}/>
              Auth provider: <b className="capitalize">{provider === 'azure_ad' ? 'Microsoft 365 / Azure AD' : 'Standalone'}</b>
            </div>

            {provider === 'standalone' ? (
              <form onSubmit={submit} className="space-y-4 mb-8">
                <div>
                  <label className="label">{t('login.email')}</label>
                  <div className="relative">
                    <Mail size={16} className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 text-slate-400" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="input ltr:pl-9 rtl:pr-9" />
                  </div>
                </div>
                <div>
                  <label className="label">{t('login.password')}</label>
                  <div className="relative">
                    <Lock size={16} className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 text-slate-400" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input ltr:pl-9 rtl:pr-9" />
                  </div>
                </div>
                {error && <div className="text-rose-600 text-sm">{error}</div>}
                <button type="submit" className="btn btn-primary w-full justify-center">
                  {t('login.signIn')} <ChevronRight size={16} />
                </button>
              </form>
            ) : (
              <div className="mb-8 space-y-4">
                <button onClick={() => microsoftSignIn()} disabled={ssoStep !== null}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 font-semibold text-slate-800 disabled:opacity-50">
                  <svg viewBox="0 0 23 23" className="w-5 h-5"><rect width="10" height="10" fill="#F25022"/><rect x="11" width="10" height="10" fill="#7FBA00"/><rect y="11" width="10" height="10" fill="#00A4EF"/><rect x="11" y="11" width="10" height="10" fill="#FFB900"/></svg>
                  Sign in with Microsoft
                </button>
                <div>
                  <label className="label text-xs">Sign in as (demo selector — would be the M365 picker in production)</label>
                  <input value={ssoEmail} onChange={e => setSsoEmail(e.target.value)} className="input font-mono text-sm" />
                </div>
                {error && <div className="text-rose-600 text-sm">{error}</div>}
              </div>
            )}

            <div>
              <div className="text-sm font-semibold text-slate-700 mb-3">{t('login.demo')}</div>
              <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                {SEED_USERS.map(u => {
                  const role = ROLES.find(r => r.key === u.role);
                  return (
                    <button
                      key={u.id}
                      onClick={() => fillDemo(u)}
                      className="text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${role?.color}`} />
                        <span className="text-xs font-medium text-slate-700 capitalize">{u.role.replace('_',' ')}</span>
                      </div>
                      <div className="text-sm font-medium text-slate-800 truncate">{i18n.language === 'ar' ? u.nameAr : u.name}</div>
                      <div className="text-xs text-slate-500 truncate">{u.email}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Microsoft SSO loading overlay */}
      {ssoStep && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
            <svg viewBox="0 0 23 23" className="w-12 h-12 mx-auto mb-4"><rect width="10" height="10" fill="#F25022"/><rect x="11" width="10" height="10" fill="#7FBA00"/><rect y="11" width="10" height="10" fill="#00A4EF"/><rect x="11" y="11" width="10" height="10" fill="#FFB900"/></svg>
            <h3 className="font-bold text-lg text-slate-800 mb-1">Microsoft 365</h3>
            <p className="text-xs text-slate-500 font-mono mb-6">login.microsoftonline.com</p>

            <div className="space-y-3 text-left">
              <SsoStep label="Redirecting to Microsoft..." done={['authenticating','syncing'].includes(ssoStep)} active={ssoStep === 'redirecting'}/>
              <SsoStep label="Authenticating identity"     done={['syncing'].includes(ssoStep)}                  active={ssoStep === 'authenticating'}/>
              <SsoStep label="Syncing profile from Azure AD" done={false}                                        active={ssoStep === 'syncing'}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SsoStep({ label, done, active }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {done ? <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18}/> :
       active ? <Loader2 className="text-blue-500 animate-spin flex-shrink-0" size={18}/> :
       <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300 flex-shrink-0"/>}
      <span className={done ? 'text-slate-800' : active ? 'text-slate-800 font-medium' : 'text-slate-400'}>{label}</span>
    </div>
  );
}
