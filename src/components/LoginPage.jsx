import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  User, 
  Lock, 
  Shield, 
  Target, 
  GraduationCap, 
  Calendar, 
  Award, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const LoginPage = () => {
  const { users, loginUser, registerUser } = useApp();

  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Personal Learner');
  const [avatarColor, setAvatarColor] = useState('#2563eb');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Fadlan geli Username iyo Password-kaaga!');
      return;
    }
    const res = loginUser(username, password);
    if (!res.success) setErrorMsg(res.message);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!username.trim() || !password.trim() || !name.trim()) {
      setErrorMsg('Fadlan buuxi Username, Password, iyo Magacaaga!');
      return;
    }
    const res = registerUser({ username, password, name, role, avatarColor });
    if (!res.success) setErrorMsg(res.message);
  };

  const colors = ['#2563eb', '#0284c7', '#0d9488', '#10b981', '#475569', '#6366f1'];

  const features = [
    { icon: Target, title: 'Goal Tracking', desc: 'Daily, Monthly & Yearly goal management' },
    { icon: GraduationCap, title: 'Course Manager', desc: 'Online course tracking & milestones' },
    { icon: Award, title: 'Certificate Vault', desc: 'Secure credential storage & verification' },
    { icon: Calendar, title: 'Smart Calendar', desc: 'Integrated reminders & goal schedules' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      background: 'var(--bg-primary)'
    }}>
      {/* LEFT SIDE: Corporate Branding Panel */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem 3.5rem',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)'
      }}
        className="login-hero-panel"
      >
        <div style={{ maxWidth: '480px' }}>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                SelfTracker Enterprise
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Professional Personal Growth Platform</div>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.25rem',
            fontWeight: 800,
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Manage Goals, Courses & Certifications with Precision.
          </h1>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Nidaam casri ah oo loogu talagalay maareynta yoolalkaaga, koorsooyinkaaga, iyo shahadooyinkaaga. Wax walba oo aad u baahan tahay waxay ku keydsan yihiin meel ammaan ah.
          </p>

          {/* Feature List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem',
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
                    flexShrink: 0
                  }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.825rem', color: 'var(--text-primary)' }}>{f.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form Panel */}
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {mode === 'login' ? 'Sign In to Your Workspace' : 'Create an Account'}
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {mode === 'login' ? 'Geli username-kaaga iyo password-kaaga' : 'Ku dar username iyo password cusub'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="tab-row" style={{ width: '100%', marginBottom: '1.5rem' }}>
            <button 
              className={`tab-button ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <LogIn size={14} /> Sign In
            </button>
            <button 
              className={`tab-button ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); setErrorMsg(''); }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <UserPlus size={14} /> Sign Up
            </button>
          </div>

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
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin}>
              {users.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                    Available Profiles:
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {users.map(u => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          setUsername(u.username);
                          setErrorMsg('');
                        }}
                        style={{
                          padding: '0.35rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          background: username === u.username ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${username === u.username ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: u.avatarColor }} />
                        <span>@{u.username}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Username</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Geli username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                  <User size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="Geli password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
                <LogIn size={15} /> Sign In <ArrowRight size={14} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Account ma lihid? <button type="button" onClick={() => { setMode('signup'); setErrorMsg(''); }} style={{ color: 'var(--accent-primary)', fontWeight: 600, background: 'none' }}>Create an Account</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="e.g. Mohamed Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Username</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="e.g. mohamed"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Theme Badge Color</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                  {colors.map(c => (
                    <div 
                      key={c}
                      onClick={() => setAvatarColor(c)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: 'var(--radius-sm)',
                        background: c,
                        cursor: 'pointer',
                        border: avatarColor === c ? '2px solid white' : '1px solid var(--border-color)',
                        boxShadow: avatarColor === c ? '0 0 0 1px var(--accent-primary)' : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
                <UserPlus size={15} /> Create Account <ArrowRight size={14} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Horay account ma u lahayd? <button type="button" onClick={() => { setMode('login'); setErrorMsg(''); }} style={{ color: 'var(--accent-primary)', fontWeight: 600, background: 'none' }}>Sign In</button>
              </div>
            </form>
          )}

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
            <span>Cloud Database Synchronization Active</span>
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
