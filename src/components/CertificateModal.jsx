import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, ExternalLink, Download, Printer, X, ShieldCheck, Calendar, Building } from 'lucide-react';

export const CertificateModal = () => {
  const { selectedCertificate, setSelectedCertificate } = useApp();

  if (!selectedCertificate) return null;

  const handleDownload = () => {
    // Simulated download or open image link
    const link = document.createElement('a');
    link.href = selectedCertificate.fileUrl;
    link.download = `${selectedCertificate.title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '720px', padding: '0', overflow: 'hidden' }}>
        {/* Certificate Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'var(--gradient-primary)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Award size={26} />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Certificate of Completion</h3>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Shahadada Keydsan • Stored in Vault</div>
            </div>
          </div>
          <button className="btn-icon" onClick={() => setSelectedCertificate(null)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            <X size={18} />
          </button>
        </div>

        {/* Certificate Body Container */}
        <div style={{ padding: '1.75rem' }}>
          {/* Main Visual Display Frame */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            marginBottom: '1.5rem',
            background: '#ffffff'
          }}>
            <img 
              src={selectedCertificate.fileUrl} 
              alt={selectedCertificate.title}
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '380px', objectFit: 'cover' }}
            />
            
            {/* Watermark / Seal */}
            <div style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              background: 'rgba(17, 24, 39, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              border: '1px solid rgba(245, 158, 11, 0.5)'
            }}>
              <ShieldCheck size={16} /> Verified Authentic
            </div>
          </div>

          {/* Certificate Metadata Details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Award size={14} /> Certificate Name
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {selectedCertificate.title}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Building size={14} /> Issuer / Authority
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {selectedCertificate.issuer}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={14} /> Date Issued
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {selectedCertificate.issueDate}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {selectedCertificate.credentialUrl ? (
              <a 
                href={selectedCertificate.credentialUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ color: 'var(--accent-info)', borderColor: 'rgba(6, 182, 212, 0.4)' }}
              >
                <ExternalLink size={14} /> Verify Credential Online
              </a>
            ) : <div />}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={handlePrint}>
                <Printer size={16} /> Print
              </button>
              <button className="btn btn-primary" onClick={handleDownload}>
                <Download size={16} /> Download Shahada
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
