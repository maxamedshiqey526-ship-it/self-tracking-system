import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, LogIn, UserPlus, User, Lock, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export const LoginPage = () => {
  const { users, loginUser, registerUser } = useApp();

  const [mode, setMode] = useState('login'); // 'login' or 'signup'
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
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!username.trim() || !password.trim() || !name.trim()) {
      setErrorMsg('Fadlan buuxi Username, Password, iyo Magacaaga!');
      return;
    }

    const res = registerUser({
      username,
      password,
      name,
      role,
      avatarColor
    });

    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundImage: `
        radial-gradient(at 10% 20%, rgba(99, 102, 241, 0.25) 0px, transparent 50%),
        radial-gradient(at 90% 80%, rgba(139, 92, 246, 0.2) 0px, transparent 50%)
      `
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '460px',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        {/* Portal Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            margin: '0 auto 1rem auto',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800 }}>
            SelfTracker Pro
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            Fadlan soo gali (Login) ama samayso Account cusub
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="tab-row" style={{ width: '100%', marginBottom: '1.5rem' }}>
          <button 
            className={`tab-button ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            <LogIn size={15} /> Sign In (Login)
          </button>
          <button 
            className={`tab-button ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            disabled={users.length >= 3}
          >
            <UserPlus size={15} /> Sign Up {users.length >= 3 && '(3/3 Max)'}
          </button>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            marginBottom: '1.25rem'
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            {/* Quick Profile Selector if accounts exist */}
            {users.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>
                  Dooro Username-kaaga:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {users.map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        setUsername(u.username);
                        setErrorMsg('');
                      }}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: username === u.username ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${username === u.username ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: u.avatarColor }} />
                      <span>{u.name} (@{u.username})</span>
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
                  placeholder="e.g. user1 or your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <User size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}>
              <LogIn size={18} /> Sign In to Dashboard
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
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
                  placeholder="Secret password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Full Display Name</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Mohamed Ali"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role / Title</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Student / Software Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Theme Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                {colors.map(c => (
                  <div 
                    key={c}
                    onClick={() => setAvatarColor(c)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: c,
                      cursor: 'pointer',
                      border: avatarColor === c ? '3px solid white' : 'none',
                      boxShadow: avatarColor === c ? '0 0 0 2px var(--accent-primary)' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}>
              <UserPlus size={18} /> Create Account & Enter
            </button>
          </form>
        )}

        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1rem'
        }}>
          <Shield size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Xogtaada waxay toos ugu xidhan tahay Cloud Database Sync.
        </div>
      </div>
    </div>
  );
};
