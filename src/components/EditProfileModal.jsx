import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { User, Lock, X, Save, Edit3, AlertCircle } from 'lucide-react';

export const EditProfileModal = () => {
  const { activeUser, updateUserProfile, isEditProfileModalOpen, setIsEditProfileModalOpen } = useApp();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [avatarColor, setAvatarColor] = useState('#2563eb');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (activeUser) {
      setName(activeUser.name || '');
      setUsername(activeUser.username || '');
      setPassword(activeUser.password || '');
      setRole(activeUser.role || '');
      setAvatarColor(activeUser.avatarColor || '#2563eb');
    }
  }, [activeUser, isEditProfileModalOpen]);

  if (!isEditProfileModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !username.trim() || !password.trim()) {
      setErrorMsg('Fadlan soo buuxi Name-ka, Username-ka iyo Password-ka!');
      return;
    }

    const res = updateUserProfile({
      name: name.trim(),
      username: username.trim(),
      password: password.trim(),
      role: role.trim(),
      avatarColor
    });

    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const colors = ['#2563eb', '#0284c7', '#0d9488', '#10b981', '#475569', '#6366f1'];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '460px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Edit3 size={18} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3>Edit Profile</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Cusbooneysii magacaaga iyo xogtaada
              </div>
            </div>
          </div>
          <button className="btn-icon" onClick={() => setIsEditProfileModalOpen(false)}>
            <X size={18} />
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
            marginBottom: '1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}>
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Display Name</label>
            <input 
              type="text"
              className="form-control"
              placeholder="e.g. Maxamed Ali"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. maxamed"
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

          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditProfileModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Save size={15} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
