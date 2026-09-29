import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  User, 
  Mail,
  Lock, 
  Shield, 
  Target, 
  GraduationCap, 
  Calendar, 
  Award, 
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Check
} from 'lucide-react';

export const LoginPage = () => {
  const { loginUser, registerUser, resetPassword } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  
  // Login states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('Personal Learner');
  const [regAvatarColor, setRegAvatarColor] = useState('#2563eb');

  // Forgot password states
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status message states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const clearMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    clearMessages();

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMsg('Fadlan geli Email/Username iyo Password-kaaga!');
      return;
    }

    const res = loginUser(loginIdentifier, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    clearMessages();

    if (!regUsername.trim() || !regPassword.trim() || !regName.trim()) {
      setErrorMsg('Fadlan buuxi Magacaaga, Username, iyo Password-ka!');
      return;
    }

    const res = registerUser({
      username: regUsername,
      email: regEmail,
      password: regPassword,
      name: regName,
      role: regRole,
      avatarColor: regAvatarColor
    });

    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    clearMessages();

    if (!forgotIdentifier.trim() || !newPassword.trim()) {
      setErrorMsg('Fadlan buuxi Email/Username iyo Password-ka cusub!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Labada password isma laha, fadlan hubi!');
      return;
    }

    const res = resetPassword(forgotIdentifier, newPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setSuccessMsg(res.message);
      setForgotIdentifier('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setMode('login');
      }, 1500);
    }
  };

  const colors = ['#2563eb', '#0284c7', '#0d9488', '#10b981', '#475569', '#6366f1'];

  const systemFeatures = [
    {
      icon: Target,
      title: 'Goal Architecture (Daily, Monthly, Yearly)',
      desc: 'Dejiso yoolalka maalinlaha ah, bartilmaameedyada bisha, iyo aragtida sanadlaha ah oo leh progress tracking sax ah.'
    },
    {
      icon: GraduationCap,
      title: 'Online Course Manager',
      desc: 'Raac koorsooyinka aad waddo ee Coursera, Udemy, ama YouTube oo xisaabi boqolkiiba meesha aad marayso.'
    },
    {
      icon: Award,
      title: 'Verified Certificate Vault',
      desc: 'Ku keydso shahadooyinkaaga (PDF ama Image) oo kala soo deg, daabaco, ama xaqiiji credentials-kooda online.'
    },
    {
      icon: Calendar,
      title: 'Smart Calendar & Reminders',
      desc: 'Jadwal isku xiran oo leh xusuusiyeyaal degdeg ah (Urgent / Critical) oo toos ula jaanqaadaya yoolalkaaga.'
    },
    {
      icon: ShieldCheck,
      title: 'Private Multi-Tenant Workspaces',
      desc: 'Qof kasta wuxuu ku leeyahay workspace u gaar ah oo ku xiran Cloud Database, lagana heli karo taleefan iyo PC.'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      background: 'var(--bg-primary)'
    }}>
      {/* LEFT SIDE: Enterprise System Overview & Explanation */}
      <div style={{
        flex: '1.1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3.5rem 3.5rem',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)'
      }}
        className="login-hero-panel"
      >
        <div style={{ maxWidth: '520px' }}>
          {/* Logo & Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                SelfTracker Enterprise
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Enterprise Growth & Goal Management Platform
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.1rem',
            fontWeight: 800,
            lineHeight: 1.25,
            color: 'var(--text-primary)',
            marginBottom: '0.85rem',
            letterSpacing: '-0.02em'
          }}>
            Habka Ugu Casrisan ee Yoolalka, Koorsooyinka & Shahadooyinka Lagu Maareeyo.
          </h1>

          <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Wax walba oo aad u baahan tahay si aad noloshaada iyo waxbarashadaada ugu horumariso. Qof kasta wuxuu ku leeyahay akoon sir ah oo xogtiisu u gaar tahay.
          </p>

          {/* Structured Feature Explanations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {systemFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Dedicated Secure Authentication Portal */}
      <div style={{
        flex: '0.9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '410px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Header Title based on Mode */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {mode === 'login' && 'Sign In to Workspace'}
              {mode === 'signup' && 'Create Your Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {mode === 'login' && 'Geli username/email iyo password si aad u gasho'}
              {mode === 'signup' && 'Samayso account cusub si aad u bilowdo'}
              {mode === 'forgot' && 'Geli email-kaaga ama username si aad u beddesho password-ka'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Shown on login/signup) */}
          {mode !== 'forgot' && (
            <div className="tab-row" style={{ width: '100%', marginBottom: '1.5rem' }}>
              <button 
                className={`tab-button ${mode === 'login' ? 'active' : ''}`}
                onClick={() => { setMode('login'); clearMessages(); }}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <LogIn size={14} /> Sign In
              </button>
              <button 
                className={`tab-button ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => { setMode('signup'); clearMessages(); }}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <UserPlus size={14} /> Sign Up
              </button>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#f87171',
              padding: '0.7rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.825rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {successMsg && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              color: '#34d399',
              padding: '0.7rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.825rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* MODE 1: SIGN IN */}
          {mode === 'login' && (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email or Username</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="e.g. name@gmail.com or username"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                    autoFocus
                  />
                  <Mail size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Password</label>
                  <button 
                    type="button" 
                    onClick={() => { setMode('forgot'); clearMessages(); }}
                    style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', background: 'none', fontWeight: 500 }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="Geli password-kaaga"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <Lock size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
                <LogIn size={15} /> Sign In to Workspace <ArrowRight size={14} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Account ma lihid? <button type="button" onClick={() => { setMode('signup'); clearMessages(); }} style={{ color: 'var(--accent-primary)', fontWeight: 600, background: 'none' }}>Create an Account</button>
              </div>
            </form>
          )}

          {/* MODE 2: SIGN UP */}
          {mode === 'signup' && (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Display Name</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="e.g. Mohamed Ali"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Gmail / Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email"
                    className="form-control"
                    placeholder="e.g. mohamed@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                  <Mail size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Username</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="e.g. mohamed"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="Secret password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Role / Position</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="e.g. Software Engineer / Student"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Theme Badge Color</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                  {colors.map(c => (
                    <div 
                      key={c}
                      onClick={() => setRegAvatarColor(c)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: 'var(--radius-sm)',
                        background: c,
                        cursor: 'pointer',
                        border: regAvatarColor === c ? '2px solid white' : '1px solid var(--border-color)',
                        boxShadow: regAvatarColor === c ? '0 0 0 1px var(--accent-primary)' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
                <UserPlus size={15} /> Create Account <ArrowRight size={14} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Horay account ma u lahayd? <button type="button" onClick={() => { setMode('login'); clearMessages(); }} style={{ color: 'var(--accent-primary)', fontWeight: 600, background: 'none' }}>Sign In</button>
              </div>
            </form>
          )}

          {/* MODE 3: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label>Email or Username</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Geli email-kaaga ama username"
                    value={forgotIdentifier}
                    onChange={(e) => setForgotIdentifier(e.target.value)}
                    required
                    autoFocus
                  />
                  <Mail size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="form-group">
                <label>Password Cusub</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="Geli password cusub"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <KeyRound size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="form-group">
                <label>Xaqiiji Password-ka Cusub</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="Mar kale geli password-ka"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Lock size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
                <KeyRound size={15} /> Reset Password
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                <button 
                  type="button" 
                  onClick={() => { setMode('login'); clearMessages(); }} 
                  style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', background: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <ArrowLeft size={13} /> Ku noqo Sign In
                </button>
              </div>
            </form>
          )}

          {/* Security Guarantee Note */}
          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem'
          }}>
            <Shield size={12} />
            <span>End-to-End Private User Workspace • Cloud Synchronized</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-hero-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
};
