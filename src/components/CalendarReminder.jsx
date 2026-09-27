import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Bell, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  ArrowLeft,
  X 
} from 'lucide-react';

export const CalendarReminder = () => {
  const { userData, addReminder, toggleReminder, deleteReminder, setActiveTab } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [selectedDay, setSelectedDay] = useState(28);
  const [isAddReminderModal, setIsAddReminderModal] = useState(false);

  // Form fields for new reminder
  const [title, setTitle] = useState('');
  const [remDate, setRemDate] = useState('2026-09-28');
  const [remTime, setRemTime] = useState('14:00');
  const [urgency, setUrgency] = useState('Normal');
  const [linkedType, setLinkedType] = useState('Goal');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleCreateReminder = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addReminder({
      title,
      date: remDate,
      time: remTime,
      urgency,
      linkedType
    });

    setTitle('');
    setIsAddReminderModal(false);
  };

  const reminders = userData.reminders || [];

  const getRemindersForDay = (dayNum) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return reminders.filter(r => r.date === formattedDate);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Navigation Breadcrumb Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('dashboard')}>
          <ArrowLeft size={16} /> Dashboard
        </button>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Calendar & Goal Reminders</span>
      </div>

      {/* Header Banner */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CalendarIcon style={{ color: 'var(--accent-primary)' }} /> Interactive Calendar & Goal Reminders
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Kalandarka iyo xusuusiyaha la janqaadaya yoolalkaaga iyo koorsooyinkaaga.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddReminderModal(true)}>
          <Plus size={18} /> Create Reminder
        </button>
      </div>

      {/* Main Grid: Calendar on Left, Reminders List on Right */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
        {/* Left Column: Interactive Calendar Grid */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
              {monthNames[month]} {year}
            </h3>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-icon" onClick={handlePrevMonth}>
                <ChevronLeft size={18} />
              </button>
              <button className="btn-icon" onClick={handleNextMonth}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} style={{ height: '70px', opacity: 0.2 }} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected = dayNum === selectedDay;
              const dayReminders = getRemindersForDay(dayNum);

              return (
                <div 
                  key={dayNum}
                  onClick={() => setSelectedDay(dayNum)}
                  style={{
                    height: '75px',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.4rem',
                    background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                    {dayNum}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {dayReminders.slice(0, 2).map((r) => (
                      <div 
                        key={r.id}
                        style={{
                          fontSize: '0.65rem',
                          padding: '1px 4px',
                          borderRadius: '3px',
                          background: r.urgency === 'Critical' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(99, 102, 241, 0.3)',
                          color: 'white',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {r.title}
                      </div>
                    ))}
                    {dayReminders.length > 2 && (
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>+{dayReminders.length - 2} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Reminders for selected day & All Reminders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Bell style={{ color: 'var(--accent-warning)' }} />
                <span>Reminders Manager ({reminders.length})</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {reminders.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                  Weli xusuusiyo kuma jiro.
                </div>
              ) : (
                reminders.map((rem) => (
                  <div 
                    key={rem.id}
                    style={{
                      padding: '0.9rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: rem.completed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${rem.completed ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-color)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input 
                        type="checkbox" 
                        checked={rem.completed}
                        onChange={() => toggleReminder(rem.id)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                      />
                      <div>
                        <div style={{ 
                          fontWeight: '600', 
                          fontSize: '0.9rem',
                          textDecoration: rem.completed ? 'line-through' : 'none',
                          color: rem.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                        }}>
                          {rem.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          📅 {rem.date} at {rem.time} • ({rem.linkedType})
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`pill ${rem.urgency === 'Critical' ? 'pill-high' : rem.urgency === 'Urgent' ? 'pill-medium' : 'pill-pending'}`}>
                        {rem.urgency}
                      </span>
                      <button className="btn-icon" onClick={() => deleteReminder(rem.id)}>
                        <Trash2 size={15} color="var(--accent-danger)" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal to Add Reminder */}
      {isAddReminderModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Goal Reminder / Xusuusiye</h3>
              <button className="btn-icon" onClick={() => setIsAddReminderModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateReminder}>
              <div className="form-group">
                <label>Reminder Title / Xusuusiye</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Finish Next.js Module Exam"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Reminder Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={remDate}
                    onChange={(e) => setRemDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input 
                    type="time" 
                    className="form-control" 
                    value={remTime}
                    onChange={(e) => setRemTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Urgency Level</label>
                  <select className="form-control" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Linked Category</label>
                  <select className="form-control" value={linkedType} onChange={(e) => setLinkedType(e.target.value)}>
                    <option value="Goal">Linked to Daily Goal</option>
                    <option value="Monthly">Linked to Monthly Target</option>
                    <option value="Course">Linked to Online Course</option>
                    <option value="Personal">Personal Task</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddReminderModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
