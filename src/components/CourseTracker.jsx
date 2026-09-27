import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Award, 
  Plus, 
  Upload, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  ArrowLeft,
  X 
} from 'lucide-react';

export const CourseTracker = () => {
  const { 
    userData, 
    addCourse, 
    updateCourseProgress, 
    uploadCertificate, 
    deleteCourse,
    setSelectedCertificate,
    setActiveTab
  } = useApp();

  const [isAddCourseModal, setIsAddCourseModal] = useState(false);
  const [selectedCourseForCert, setSelectedCourseForCert] = useState(null);

  // Form states for adding course
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Coursera');
  const [instructor, setInstructor] = useState('');
  const [hours, setHours] = useState('30');

  // Form states for uploading certificate
  const [certTitle, setCertTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCourse({ title, platform, instructor, hours });
    setTitle('');
    setInstructor('');
    setIsAddCourseModal(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCertificate = (e) => {
    e.preventDefault();
    if (!selectedCourseForCert) return;

    uploadCertificate(selectedCourseForCert.id, {
      title: certTitle || selectedCourseForCert.title + ' Certificate',
      issuer: issuer || selectedCourseForCert.platform,
      issueDate: issueDate || new Date().toISOString().split('T')[0],
      credentialUrl: credentialUrl || '',
      fileUrl: fileUrl || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop&q=60'
    });

    setSelectedCourseForCert(null);
    setCertTitle('');
    setIssuer('');
    setFileUrl('');
  };

  const courses = userData.courses || [];
  const completedWithCert = courses.filter(c => c.certificate !== null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Navigation Breadcrumb Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('dashboard')}>
          <ArrowLeft size={16} /> Dashboard
        </button>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Courses & Certificates</span>
      </div>

      {/* Header Banner */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <GraduationCap style={{ color: 'var(--accent-secondary)' }} /> Online Course & Shahada Vault
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Raac koorsooyinkaaga online-ka ah, dhameystir, oo ku <strong>keydso shahadooyinkaaga (Certificates)</strong>.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddCourseModal(true)}>
          <Plus size={18} /> Ku Dar Koorso Cusub
        </button>
      </div>

      {/* Shahada Vault Summary Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.05) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'white' }}>
              <Award size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>Shahadooyinka Keydsan (Stored Certificates)</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Waxaad nidaamka ku keydsatay <strong>{completedWithCert.length}</strong> shahado oo koorso ah.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {completedWithCert.map((course, idx) => (
              <button 
                key={course.id}
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedCertificate(course.certificate)}
                style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: 'var(--accent-warning)' }}
              >
                <Eye size={14} /> Shahada #{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course List Grid */}
      <div className="grid-2">
        {courses.length === 0 ? (
          <div className="card" style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Weli ma ku jiro koorso aad dhameyso ama ku jiro.
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span className="pill pill-in-progress" style={{ marginBottom: '0.4rem' }}>{course.platform}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginTop: '0.2rem' }}>{course.title}</h3>
                  {course.instructor && (
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      👨‍🏫 Instructor: {course.instructor} • ⏱️ {course.hours} Hours
                    </div>
                  )}
                </div>

                <button className="btn-icon" onClick={() => deleteCourse(course.id)}>
                  <Trash2 size={16} color="var(--accent-danger)" />
                </button>
              </div>

              {/* Progress Section */}
              <div style={{ margin: '1rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  <span>Completion Status</span>
                  <span><strong>{course.progress}%</strong></span>
                </div>
                <div className="progress-bar-container" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${course.progress}%`,
                      background: course.progress === 100 ? 'var(--accent-success)' : 'var(--gradient-primary)'
                    }} 
                  />
                </div>
              </div>

              {/* Quick Slider to update course percentage */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' }}>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={course.progress}
                  onChange={(e) => updateCourseProgress(course.id, e.target.value)}
                  style={{ flex: 1, accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, minWidth: '35px' }}>{course.progress}%</span>
              </div>

              {/* Certificate Actions */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                {course.certificate ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-success)', fontSize: '0.85rem', fontWeight: 600 }}>
                      <CheckCircle2 size={18} /> Shahadadii waa keydsan tahay
                    </div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedCertificate(course.certificate)}
                    >
                      <Eye size={14} /> Eeg Shahadada
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={() => {
                      setSelectedCourseForCert(course);
                      setCertTitle(course.title + ' Certificate');
                      setIssuer(course.platform);
                    }}
                    style={{ width: '100%' }}
                  >
                    <Upload size={14} /> Keydso Shahadada Koorso (Attach Certificate)
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal to Add Course */}
      {isAddCourseModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ku Dar Koorso Online ah</h3>
              <button className="btn-icon" onClick={() => setIsAddCourseModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCourse}>
              <div className="form-group">
                <label>Course Title / Magaca Koorsada</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Platform / Websaytka</label>
                  <select className="form-control" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    <option value="Coursera">Coursera</option>
                    <option value="Udemy">Udemy</option>
                    <option value="edX">edX</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Pluralsight">Pluralsight</option>
                    <option value="Other">Other Platform</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration (Hours)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Instructor / Machadka</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Andrew Ng / Harvard University"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddCourseModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal to Upload/Keydso Certificate */}
      {selectedCourseForCert && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award style={{ color: 'var(--accent-warning)' }} />
                <h3>Keydso Shahadada ({selectedCourseForCert.title})</h3>
              </div>
              <button className="btn-icon" onClick={() => setSelectedCourseForCert(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCertificate}>
              <div className="form-group">
                <label>Certificate Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Issuer / Provider</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Issue Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Upload Certificate Image or PDF</label>
                <input 
                  type="file" 
                  accept="image/*,.pdf"
                  className="form-control" 
                  onChange={handleFileUpload}
                />
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Faylka shahadada wuxuu toos ugu keydsami doonaa browserkaaga.
                </div>
              </div>

              <div className="form-group">
                <label>Verification Link (Optional URL)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  placeholder="https://coursera.org/verify/..."
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedCourseForCert(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Certificate to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
