import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sun, 
  Moon, 
  UserCheck, 
  Bell, 
  Menu, 
  ShieldCheck,
  Cloud,
  Edit3,
  LogOut
} from 'lucide-react';

export const Header = ({ onToggleSidebar }) => {
  const { 
    activeUser, 
    theme, 
    toggleTheme, 
    setIsLoginModalOpen, 
    setIsEditProfileModalOpen, 
    logoutUser,
    userData, 
    isCloudSyncing 
  } = useApp();

  // Calculate pending reminders for notification badge
  const pendingReminders = userData.reminders ? userData.reminders.filter(r => !r.completed) : [];

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn-icon mobile-menu-btn" onClick={onToggleSidebar} style={{ display: 'none' }}>
          <Menu size={20} />
        </button>
        
        <div className="navbar-brand">
          <ShieldCheck size={26} style={{ color: 'var(--accent-primary)' }} />
          <span>SelfTracker Pro</span>
        </div>
      </div>

      <div className="navbar-actions">
        {/* Real-time Cloud Sync Badge */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.7rem',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)'
          }}
          title="Live Cloud Database Sync across Mobile & PC"
        >
          <Cloud size={14} style={{ color: 'var(--accent-success)' }} />
          <span>{isCloudSyncing ? 'Syncing...' : 'Cloud Synced'}</span>
        </div>

        {/* Theme Toggle Button */}
        <button 
          className="btn-icon" 
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>

        {/* Edit Profile Button */}
        <button 
          className="btn-icon"
          onClick={() => setIsEditProfileModalOpen(true)}
          title="Edit Profile (Badal Magacaaga/Password-ka)"
        >
          <Edit3 size={17} color="var(--accent-primary)" />
        </button>

        {/* Account Switcher Button */}
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => setIsLoginModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.85rem' }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: activeUser ? activeUser.avatarColor : 'var(--accent-primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '0.75rem'
          }}>
            {activeUser ? activeUser.name.charAt(0) : 'U'}
          </div>
          <span style={{ fontWeight: 600 }}>{activeUser ? activeUser.name : 'User'}</span>
          <UserCheck size={14} style={{ color: 'var(--accent-success)' }} />
        </button>

        {/* Logout Button */}
        <button 
          className="btn btn-danger btn-sm"
          onClick={logoutUser}
          title="Log out and return to Login Screen"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <LogOut size={15} /> Log Out
        </button>
      </div>
    </header>
  );
};
