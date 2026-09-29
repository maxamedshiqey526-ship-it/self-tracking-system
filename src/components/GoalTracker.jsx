import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  Plus, 
  Trash2, 
  Award,
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Trophy,
  Compass,
  X
} from 'lucide-react';

export const GoalTracker = () => {
  const { 
    userData, 
    addDailyGoal, 
    toggleDailyGoal, 
    deleteDailyGoal,
    addMonthlyGoal,
    updateMonthlyProgress,
    deleteMonthlyGoal,
    addYearlyGoal,
    toggleYearlyGoal,
    deleteYearlyGoal,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [goalTitle, setGoalTitle] = useState('');
  const [category, setCategory] = useState('Study');
  const [priority, setPriority] = useState('medium');
  const [time, setTime] = useState('10:00 AM');
  const [targetProgress, setTargetProgress] = useState(100);
  const [year, setYear] = useState('2026');
  const [month, setMonth] = useState('September 2026');
  const [vision, setVision] = useState('');
  const [quarter, setQuarter] = useState('Q3');

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    if (activeSubTab === 'daily') {
      addDailyGoal({ title: goalTitle, category, priority, time });
    } else if (activeSubTab === 'monthly') {
      addMonthlyGoal({ title: goalTitle, category, month, targetProgress: Number(targetProgress) });
    } else if (activeSubTab === 'yearly') {
      addYearlyGoal({ title: goalTitle, year, vision, quarter });
    }

    setGoalTitle('');
    setVision('');
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Navigation Breadcrumb Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('dashboard')}>
          <ArrowLeft size={14} /> Dashboard
        </button>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>Goal Management</span>
      </div>

      {/* Header Banner */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <Target size={20} style={{ color: 'var(--accent-primary)' }} /> Goal Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            U maamul yoolalkaaga 3 heer: <strong>Daily</strong>, <strong>Monthly</strong>, iyo <strong>Yearly</strong>.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Ku Dar Yool ({activeSubTab.toUpperCase()})
        </button>
      </div>

      {/* 3 Tier Navigation Tabs */}
      <div className="tab-row">
        <button 
          className={`tab-button ${activeSubTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('daily')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
        >
          <Calendar size={14} /> Daily Goals [{userData?.dailyGoals ? userData.dailyGoals.length : 0}]
        </button>

        <button 
          className={`tab-button ${activeSubTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('monthly')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
        >
          <Compass size={14} /> Monthly Goals [{userData?.monthlyGoals ? userData.monthlyGoals.length : 0}]
        </button>

        <button 
          className={`tab-button ${activeSubTab === 'yearly' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('yearly')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
        >
          <Trophy size={14} /> Yearly Goals [{userData?.yearlyGoals ? userData.yearlyGoals.length : 0}]
        </button>
      </div>

      {/* Content based on selected Tier */}

      {/* 1. DAILY GOALS TAB */}
      {activeSubTab === 'daily' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {(!userData?.dailyGoals || userData.dailyGoals.length === 0) ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Wax yool ah maanta weli ma aadan ku darin.
            </div>
          ) : (
            userData.dailyGoals.map(goal => (
              <div 
                key={goal.id}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.15rem',
                  borderLeft: `3px solid ${goal.priority === 'high' ? 'var(--accent-danger)' : goal.priority === 'medium' ? 'var(--accent-warning)' : 'var(--accent-success)'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <input 
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleDailyGoal(goal.id)}
                    style={{ width: '17px', height: '17px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                  />
                  <div>
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: '0.925rem', 
                      textDecoration: goal.completed ? 'line-through' : 'none',
                      color: goal.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                    }}>
                      {goal.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.2rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {goal.time}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Tag size={12} /> {goal.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`pill pill-${goal.priority}`}>
                    {goal.priority}
                  </span>
                  <button className="btn-icon" onClick={() => deleteDailyGoal(goal.id)} title="Delete Goal">
                    <Trash2 size={15} color="var(--accent-danger)" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 2. MONTHLY GOALS TAB */}
      {activeSubTab === 'monthly' && (
        <div className="grid-2">
          {(!userData?.monthlyGoals || userData.monthlyGoals.length === 0) ? (
            <div className="card" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Wax yool bisha ah weli kuma jiraan.
            </div>
          ) : (
            userData.monthlyGoals.map(goal => (
              <div key={goal.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span className="pill pill-in-progress" style={{ marginBottom: '0.4rem' }}>{goal.month}</span>
                    <h3 style={{ fontWeight: 600, fontSize: '1rem', marginTop: '0.2rem' }}>{goal.title}</h3>
                  </div>
                  <button className="btn-icon" onClick={() => deleteMonthlyGoal(goal.id)}>
                    <Trash2 size={15} color="var(--accent-danger)" />
                  </button>
                </div>

                <div style={{ margin: '0.85rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    <span>Target Progress</span>
                    <span><strong>{goal.currentProgress}</strong> / {goal.targetProgress}%</span>
                  </div>
                  
                  <div className="progress-bar-container" style={{ height: '7px' }}>
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${Math.min(100, (goal.currentProgress / goal.targetProgress) * 100)}%`,
                        background: goal.currentProgress >= goal.targetProgress ? 'var(--accent-success)' : 'var(--accent-primary)'
                      }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                  <input 
                    type="range" 
                    min="0" 
                    max={goal.targetProgress} 
                    value={goal.currentProgress} 
                    onChange={(e) => updateMonthlyProgress(goal.id, Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{goal.currentProgress}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. YEARLY GOALS TAB */}
      {activeSubTab === 'yearly' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(!userData?.yearlyGoals || userData.yearlyGoals.length === 0) ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Wax yool sanadeed ah weli ma jiraan.
            </div>
          ) : (
            userData.yearlyGoals.map(goal => (
              <div 
                key={goal.id} 
                className="card"
                style={{
                  borderLeft: `3px solid ${goal.achieved ? 'var(--accent-success)' : 'var(--accent-primary)'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span className="pill pill-in-progress">Year {goal.year}</span>
                      <span className="pill pill-pending">{goal.quarter} Target</span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{goal.title}</h3>
                    {goal.vision && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Compass size={13} />
                        <span>Vision: {goal.vision}</span>
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <button 
                      className={`btn ${goal.achieved ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                      onClick={() => toggleYearlyGoal(goal.id)}
                    >
                      <Award size={14} /> {goal.achieved ? 'Mark Pending' : 'Mark Achieved'}
                    </button>
                    <button className="btn-icon" onClick={() => deleteYearlyGoal(goal.id)}>
                      <Trash2 size={15} color="var(--accent-danger)" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal to Add New Goal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New {activeSubTab.toUpperCase()} Goal</h3>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateGoal}>
              <div className="form-group">
                <label>Goal Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Complete 3 modules of course" 
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  required
                />
              </div>

              {activeSubTab === 'daily' && (
                <div className="grid-2">
                  <div className="form-group">
                    <label>Priority</label>
                    <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Target Time</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. 10:00 AM" 
                      value={time} 
                      onChange={(e) => setTime(e.target.value)} 
                    />
                  </div>
                </div>
              )}

              {activeSubTab === 'monthly' && (
                <div className="grid-2">
                  <div className="form-group">
                    <label>Target Month</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={month} 
                      onChange={(e) => setMonth(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Target Progress (%)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={targetProgress} 
                      onChange={(e) => setTargetProgress(e.target.value)} 
                    />
                  </div>
                </div>
              )}

              {activeSubTab === 'yearly' && (
                <>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Target Quarter</label>
                      <select className="form-control" value={quarter} onChange={(e) => setQuarter(e.target.value)}>
                        <option value="Q1">Quarter 1 (Jan-Mar)</option>
                        <option value="Q2">Quarter 2 (Apr-Jun)</option>
                        <option value="Q3">Quarter 3 (Jul-Sep)</option>
                        <option value="Q4">Quarter 4 (Oct-Dec)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Target Year</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Long Term Vision Statement</label>
                    <textarea 
                      className="form-control" 
                      rows={3} 
                      placeholder="Why is this strategic milestone important?" 
                      value={vision}
                      onChange={(e) => setVision(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
