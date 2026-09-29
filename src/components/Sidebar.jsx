import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Target, 
  GraduationCap, 
  Calendar, 
  User, 
  ShieldCheck,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, activeUser, setIsLoginModalOpen } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, tag: 'Overview' },
    { id: 'goals', label: 'Goals (Daily/Mo/Yr)', icon: Target, tag: '3 Levels' },
    { id: 'courses', label: 'Courses & Certificates', icon: GraduationCap, tag: 'Certificates' },
    { id: 'calendar', label: 'Calendar & Reminders', icon: Calendar, tag: 'Schedule' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <ShieldCheck size={20} style={{ color: 'var(--accent-primary)' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>SelfTracker</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Enterprise Platform</div>
          </div>
        </div>
        {onClose && (
          <button 
            className="btn-icon mobile-menu-btn" 
            onClick={onClose}
            style={{ width: '28px', height: '28px' }}
            title="Close menu"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <Icon size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.tag && (
                <span style={{
                  fontSize: '0.65rem',
                  padding: '0.15rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)'
                }}>
                  {item.tag}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Switcher Card at Sidebar Bottom */}
      <div 
        className="user-profile-badge" 
        style={{ cursor: 'pointer' }} 
        onClick={() => {
          setIsLoginModalOpen(true);
          if (onClose) onClose();
        }}
      >
        <div 
          className="user-avatar" 
          style={{ background: activeUser?.avatarColor || 'var(--accent-primary)' }}
        >
          {activeUser?.name?.charAt(0) || 'U'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {activeUser?.name || 'User Profile'}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {activeUser?.email || activeUser?.role || 'Personal Learner'}
          </div>
        </div>
        <User size={14} style={{ color: 'var(--text-muted)' }} />
      </div>
    </aside>
  );
};
