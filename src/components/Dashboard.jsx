import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Target, 
  GraduationCap, 
  Award, 
  Bell, 
  Flame, 
  Plus, 
  Clock, 
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarCheck
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    activeUser, 
    userData, 
    toggleDailyGoal, 
    setActiveTab, 
    setSelectedCertificate 
  } = useApp();

  const dailyGoals = userData?.dailyGoals || [];
  const monthlyGoals = userData?.monthlyGoals || [];
  const courses = userData?.courses || [];
  const reminders = userData?.reminders || [];

  // Calculations
  const completedDaily = dailyGoals.filter(g => g.completed).length;
  const totalDaily = dailyGoals.length;
  const dailyProgressPercent = totalDaily > 0 ? Math.round((completedDaily / totalDaily) * 100) : 0;

  const completedCourses = courses.filter(c => c.status === 'Completed').length;
  const certificatesCount = courses.filter(c => c.certificate !== null).length;

  const pendingReminders = reminders.filter(r => !r.completed);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Welcome Banner */}
      <div 
        className="card" 
        style={{
          background: 'var(--gradient-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-warning)', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Flame size={15} /> Continuous Progress
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Kusoo dhawaada, {activeUser?.name || 'Saxiib'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem', maxWidth: '600px', fontSize: '0.925rem' }}>
            Kala soco yoolalkaaga maanta, koorsooyinkaaga, iyo shahadooyinkaaga. Waxaad maanta dhameysay <strong>{dailyProgressPercent}%</strong> yoolalkaaga maanta.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => setActiveTab('goals')}>
            <Target size={16} /> Manage Goals
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('courses')}>
            <GraduationCap size={16} /> Courses & Certificates
          </button>
        </div>
      </div>

      {/* Top Stats Bar */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-primary)' }}>
            <Target size={22} />
          </div>
          <div>
            <div className="stat-value">{completedDaily} / {totalDaily}</div>
            <div className="stat-label">Daily Goals ({dailyProgressPercent}%)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)' }}>
            <GraduationCap size={22} />
          </div>
          <div>
            <div className="stat-value">{completedCourses} / {courses.length}</div>
            <div className="stat-label">Courses Completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-warning)' }}>
            <Award size={22} />
          </div>
          <div>
            <div className="stat-value">{certificatesCount}</div>
            <div className="stat-label">Certificates Saved</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)' }}>
            <Bell size={22} />
          </div>
          <div>
            <div className="stat-value">{pendingReminders.length}</div>
            <div className="stat-label">Pending Reminders</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Section: 2 Columns */}
      <div className="grid-2">
        {/* Left Column: Goals of the Day Checklist */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Yoolalka Maanta (Goals of the Day)</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('goals')}>
              View All <ArrowRight size={13} />
            </button>
          </div>

          <div className="progress-bar-container" style={{ marginBottom: '1.25rem' }}>
            <div className="progress-bar-fill" style={{ width: `${dailyProgressPercent}%` }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {dailyGoals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                <Target size={32} style={{ color: 'var(--accent-primary)', opacity: 0.4, marginBottom: '0.75rem' }} />
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Weli yoolal kuma jiraan maanta
                </div>
                <div style={{ fontSize: '0.825rem', marginBottom: '1rem' }}>
                  Ku dar yoolkaaga ugu horreeya si aad u bilowdo raad-raaca maalinlaha ah.
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('goals')}>
                  <Plus size={14} /> Ku Dar Yool
                </button>
              </div>
            ) : (
              dailyGoals.slice(0, 5).map((goal) => (
                <div 
                  key={goal.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    background: goal.completed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${goal.completed ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)'}`,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input 
                      type="checkbox" 
                      checked={goal.completed} 
                      onChange={() => toggleDailyGoal(goal.id)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ 
                        fontWeight: '600', 
                        fontSize: '0.9rem',
                        textDecoration: goal.completed ? 'line-through' : 'none',
                        color: goal.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                      }}>
                        {goal.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                        <Clock size={11} />
                        <span>{goal.time}</span>
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
              <GraduationCap size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Online Courses & Certificates</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('courses')}>
              View Courses <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {courses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                <BookOpen size={32} style={{ color: 'var(--accent-primary)', opacity: 0.4, marginBottom: '0.75rem' }} />
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Weli koorso kuma jirto
                </div>
                <div style={{ fontSize: '0.825rem', marginBottom: '1rem' }}>
                  Ku dar koorsooyinka aad waddo si aad u raad-raacdo una keydsato shahadada.
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('courses')}>
                  <Plus size={14} /> Ku Dar Koorso
                </button>
              </div>
            ) : (
              courses.map(course => (
                <div 
                  key={course.id}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{course.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{course.platform} • {course.hours} Hours</div>
                    </div>
                    <span className={`pill ${course.status === 'Completed' ? 'pill-completed' : 'pill-in-progress'}`}>
                      {course.status}
                    </span>
                  </div>

                  <div style={{ margin: '0.5rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
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
                      style={{ marginTop: '0.4rem', width: '100%', fontSize: '0.78rem', color: 'var(--accent-warning)', borderColor: 'rgba(245, 158, 11, 0.3)' }}
                    >
                      <Award size={13} /> View Certificate
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Reminders & Calendar Sync Preview */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Bell size={18} style={{ color: 'var(--accent-warning)' }} />
            <span>Reminders & Calendar Sync</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('calendar')}>
            Open Calendar <ArrowRight size={13} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
          {reminders.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', padding: '1.5rem', textAlign: 'center', gridColumn: '1 / -1' }}>
              <CalendarCheck size={26} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.85rem' }}>Maya jiro xusuusiyo dhaw. Ku dar xusuusiye cusub kalandarkaaga.</div>
            </div>
          ) : (
            reminders.slice(0, 3).map(rem => (
              <div 
                key={rem.id}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderLeft: `3px solid ${rem.urgency === 'Critical' ? 'var(--accent-danger)' : rem.urgency === 'Urgent' ? 'var(--accent-warning)' : 'var(--accent-primary)'}`,
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{rem.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={12} />
                    <span>{rem.date} at {rem.time}</span>
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
