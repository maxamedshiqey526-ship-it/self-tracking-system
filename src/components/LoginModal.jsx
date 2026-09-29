import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, User, UserPlus, LogIn, Shield, X, Lock, AlertCircle, Info } from 'lucide-react';

export const LoginModal = () => {
  const { users, activeUser, loginUser, registerUser, isLoginModalOpen, setIsLoginModalOpen } = useApp();
  
  const [mode, setMode] = useState('login');
  
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('Personal Learner');
  const [regAvatarColor, setRegAvatarColor] = useState('#2563eb');

  const [errorMsg, setErrorMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setErrorMsg('Fadlan geli Username iyo Password-kaaga!');
      return;
    }

    const res = loginUser(loginUsername, loginPassword);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setLoginUsername('');
      setLoginPassword('');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regUsername.trim() || !regPassword.trim() || !regName.trim()) {
      setErrorMsg('Fadlan soo buuxi dhammaan qeybaha muhiimka ah!');
      return;
    }

    const res = registerUser({
      username: regUsername.trim(),
      password: regPassword.trim(),
      name: regName.trim(),
      role: regRole.trim(),
      avatarColor: regAvatarColor
    });

    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setRegUsername('');
      setRegPassword('');
      setRegName('');
    }
  };

  const colors = ['#2563eb', '#0284c7', '#0d9488', '#10b981', '#475569', '#6366f1'];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '460px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Users size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3>{mode === 'login' ? 'Switch Account' : 'Register New Account'}</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                System Access ({users.length} Registered)
              </div>
            </div>
          </div>
          <button className="btn-icon" onClick={() => setIsLoginModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="tab-row" style={{ width: '100%', marginBottom: '1.25rem' }}>
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
            padding: '0.65rem 0.85rem', 
            borderRadius: 'var(--radius-sm)', 
            fontSize: '0.825rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}>
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            {users.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Select Profile:
                </label>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {users.map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        setLoginUsername(u.username);
                        setErrorMsg('');
                      }}
                      style={{
                        padding: '0.35rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: loginUsername === u.username ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: `1px solid ${loginUsername === u.username ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: u.avatarColor }} />
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
                  placeholder="Geli username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <Lock size={15} style={{ position: 'absolute', right: '10px', top: '11px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsLoginModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <LogIn size={15} /> Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="e.g. ahmed"
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
                  placeholder="Password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Full Display Name</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Ahmed Mohamed Ali"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role / Position</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Student / Software Developer"
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

            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <UserPlus size={15} /> Create Account
              </button>
            </div>
          </form>
        )}

        <div style={{ 
          marginTop: '1.25rem', 
          fontSize: '0.75rem', 
          color: 'var(--text-muted)', 
          textAlign: 'center', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem'
        }}>
          <Info size={13} />
          <span>Qof kasta wuxuu yeelanayaa Username iyo Password u gaar ah</span>
        </div>
      </div>
    </div>
  );
};
