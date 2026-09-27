import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Target, 
  GraduationCap, 
  Award, 
  Bell, 
  TrendingUp, 
  Flame, 
  Plus, 
  Clock, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    activeUser, 
    userData, 
    toggleDailyGoal, 
    setActiveTab, 
    setSelectedCertificate 
  } = useApp();

  const dailyGoals = userData.dailyGoals || [];
  const monthlyGoals = userData.monthlyGoals || [];
  const courses = userData.courses || [];
  const reminders = userData.reminders || [];

  // Calculations
  const completedDaily = dailyGoals.filter(g => g.completed).length;
  const totalDaily = dailyGoals.length;
  const dailyProgressPercent = totalDaily > 0 ? Math.round((completedDaily / totalDaily) * 100) : 0;

  const completedCourses = courses.filter(c => c.status === 'Completed').length;
  const certificatesCount = courses.filter(c => c.certificate !== null).length;

  const pendingReminders = reminders.filter(r => !r.completed);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Welcome Banner */}
      <div 
        className="card" 
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-warning)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
            <Flame size={18} /> Daily Streak: 5 Days Active
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Kusoo dhawaow, {activeUser.name}! 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem', maxWidth: '600px', fontSize: '0.95rem' }}>
            Kala raca yoolalkaaga maanta, koorsooyinkaaga, iyo shahadooyinkaaga. Waxaad maanta dhameysay <strong>{dailyProgressPercent}%</strong> yoolalkaaga!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={() => setActiveTab('goals')}>
            <Target size={18} /> Manage Goals
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('courses')}>
            <GraduationCap size={18} /> Courses & Shahado
          </button>
        </div>
      </div>

      {/* Top Stats Bar */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Target size={26} />
          </div>
          <div>
            <div className="stat-value">{completedDaily} / {totalDaily}</div>
            <div className="stat-label">Daily Goals Today ({dailyProgressPercent}%)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <GraduationCap size={26} />
          </div>
          <div>
            <div className="stat-value">{completedCourses} / {courses.length}</div>
            <div className="stat-label">Courses Completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Award size={26} />
          </div>
          <div>
            <div className="stat-value">{certificatesCount}</div>
            <div className="stat-label">Shahadooyinka Saved</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5' }}>
            <Bell size={26} />
          </div>
          <div>
            <div className="stat-value">{pendingReminders.length}</div>
            <div className="stat-label">Active Reminders</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Section: 2 Columns */}
      <div className="grid-2">
        {/* Left Column: Goals of the Day Checklist */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 style={{ color: 'var(--accent-primary)' }} />
              <span>Yoolalka Maanta (Goals of the Day)</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('goals')}>
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="progress-bar-container" style={{ marginBottom: '1.25rem' }}>
            <div className="progress-bar-fill" style={{ width: `${dailyProgressPercent}%` }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dailyGoals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                Yoolal cusub weli ma aadan ku darin maanta.
              </div>
            ) : (
              dailyGoals.slice(0, 5).map((goal) => (
                <div 
                  key={goal.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: goal.completed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${goal.completed ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-color)'}`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <input 
                      type="checkbox" 
                      checked={goal.completed} 
                      onChange={() => toggleDailyGoal(goal.id)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ 
                        fontWeight: '600', 
                        fontSize: '0.95rem',
                        textDecoration: goal.completed ? 'line-through' : 'none',
                        color: goal.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                      }}>
                        {goal.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
                        <span><Clock size={12} style={{ display: 'inline', marginRight: '2px' }} /> {goal.time}</span>
                        <span>•</span>
                        <span>{goal.category}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`pill pill-${goal.priority}`}>
                    {goal.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Courses & Shahado Overview */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <GraduationCap style={{ color: 'var(--accent-secondary)' }} />
              <span>Online Courses & Shahadooyinka</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('courses')}>
              View Courses <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {courses.map(course => (
              <div 
                key={course.id}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{course.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{course.platform} • {course.hours} Hours</div>
                  </div>
                  <span className={`pill ${course.status === 'Completed' ? 'pill-completed' : 'pill-in-progress'}`}>
                    {course.status}
                  </span>
                </div>

                <div style={{ margin: '0.5rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                {course.certificate && (
                  <button 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => setSelectedCertificate(course.certificate)}
                    style={{ marginTop: '0.5rem', width: '100%', fontSize: '0.8rem', color: 'var(--accent-warning)', borderColor: 'rgba(245, 158, 11, 0.3)' }}
                  >
                    <Award size={14} /> Eeg Shahadada (View Certificate)
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Reminders & Calendar Sync Preview */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Bell style={{ color: 'var(--accent-warning)' }} />
            <span>Reminders & Calendar Sync</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('calendar')}>
            Open Calendar <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {reminders.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', padding: '1rem' }}>Maya jiro xusuusiyo dhaw.</div>
          ) : (
            reminders.slice(0, 3).map(rem => (
              <div 
                key={rem.id}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderLeft: `4px solid ${rem.urgency === 'Critical' ? 'var(--accent-danger)' : rem.urgency === 'Urgent' ? 'var(--accent-warning)' : 'var(--accent-primary)'}`,
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{rem.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    📅 {rem.date} at {rem.time}
                  </div>
                </div>
                <span className={`pill ${rem.urgency === 'Critical' ? 'pill-high' : rem.urgency === 'Urgent' ? 'pill-medium' : 'pill-pending'}`}>
                  {rem.urgency}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
