import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, LogIn, UserPlus, User, Lock, Shield, Target, GraduationCap, Calendar, Award, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { users, loginUser, registerUser } = useApp();

  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Personal Learner');
  const [avatarColor, setAvatarColor] = useState('#6366f1');
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

  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

  const features = [
    { icon: Target, title: 'Goal Tracking', desc: 'Daily, Monthly & Yearly goals oo la raad-raaco', color: '#6366f1' },
    { icon: GraduationCap, title: 'Course Manager', desc: 'Online courses oo progress-ka la hubiyo', color: '#8b5cf6' },
    { icon: Award, title: 'Certificate Vault', desc: 'Shahadooyinka oo la upload-gareeyo & la keydiyo', color: '#f59e0b' },
    { icon: Calendar, title: 'Smart Calendar', desc: 'Reminders & jadwal isku xiran la goals-ka', color: '#10b981' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      background: 'var(--bg-primary)',
      backgroundImage: `
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.2) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(6, 182, 212, 0.08) 0px, transparent 50%)
      `,
      backgroundAttachment: 'fixed'
    }}>
      {/* LEFT SIDE: Hero / Branding Panel */}
      <div style={{
        flex: '1.1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem 3.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
        className="login-hero-panel"
      >
        {/* Decorative Blobs */}
        <div style={{
          position: 'absolute',
          top: '-120px',
          left: '-80px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))',
          filter: 'blur(80px)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          right: '-40px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))',
          filter: 'blur(60px)',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2.5rem' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
            }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                SelfTracker Pro
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Personal Growth Platform</div>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.6rem',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            maxWidth: '500px'
          }}>
            Track Your Goals,<br />
            <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Grow Every Day.
            </span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '460px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Nidaam casri ah oo aad ku raad-raacdo yoolalkaaga maanta, bishan & sanadkan. 
            Ku keydso shahadooyinkaaga, koorsooyinkaaga, iyo jadwalkaaga meel ammaan ah.
          </p>

          {/* Feature Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '480px' }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: `${f.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={18} style={{ color: f.color }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{f.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login / Signup Form Panel */}
      <div style={{
        flex: '0.9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-backdrop)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Form Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              margin: '0 auto 0.85rem auto',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)'
            }}>
              {mode === 'login' ? <LogIn size={24} /> : <UserPlus size={24} />}
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700 }}>
              {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {mode === 'login' ? 'Geli Username-kaaga iyo Password-kaaga' : 'Samayso account cusub si aad u bilowdo'}
            </p>
          </div>

          {/* Tab Switcher */}
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
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              marginBottom: '1.25rem'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Geli username-kaaga"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                  <User size={17} style={{ position: 'absolute', right: '12px', top: '13px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password"
                    className="form-control"
                    placeholder="Geli password-kaaga"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock size={17} style={{ position: 'absolute', right: '12px', top: '13px', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.25rem', padding: '0.9rem', fontSize: '0.95rem' }}>
                <LogIn size={18} /> Sign In <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Account ma haysatid? <button type="button" onClick={() => { setMode('signup'); setErrorMsg(''); }} style={{ color: 'var(--accent-primary)', fontWeight: 700, background: 'none', textDecoration: 'underline' }}>Create Account</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name / Magacaaga</label>
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
                    placeholder="Password sir ah"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Role / Title (Optional)</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="e.g. Student / Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Profile Color</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                  {colors.map(c => (
                    <div 
                      key={c}
                      onClick={() => setAvatarColor(c)}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: c,
                        cursor: 'pointer',
                        border: avatarColor === c ? '3px solid white' : '2px solid transparent',
                        boxShadow: avatarColor === c ? `0 0 0 2px ${c}` : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.25rem', padding: '0.9rem', fontSize: '0.95rem' }}>
                <UserPlus size={18} /> Create Account <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Horay account u haysataa? <button type="button" onClick={() => { setMode('login'); setErrorMsg(''); }} style={{ color: 'var(--accent-primary)', fontWeight: 700, background: 'none', textDecoration: 'underline' }}>Sign In</button>
              </div>
            </form>
          )}

          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem'
          }}>
            <Shield size={12} />
            <span>Cloud Synced • Xogtaadu waa ammaan</span>
          </div>
        </div>
      </div>

      {/* Responsive: Stack on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .login-hero-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
};
