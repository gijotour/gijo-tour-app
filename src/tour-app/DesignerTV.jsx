import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DesignerTV({ videos }) {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="designer-tv-container">

      <section className="tv-hero">
        <div className="container">
          <span className="section-badge animate-up">Elite Insights</span>
          <h1 className="hero-main-title animate-up delay-1">여행설계사 <span className="highlight">TV</span></h1>
          <p className="hero-description animate-up delay-2">
            전문 여행설계사들이 직접 전하는 생생한 현지 소식과 호텔 리뷰를 확인하세요. 
            영상을 통해 여행설계사의 전문성을 직접 경험해 보실 수 있습니다.
          </p>
        </div>
      </section>

      <section className="tv-gallery-section">
        <div className="container">
          <div className="tv-grid">
            {videos.map((video, idx) => (
              <div 
                key={video.id} 
                className={`glass-card tv-card animate-up delay-${(idx % 5) + 1}`}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="tv-thumbnail-wrap">
                  <img src={video.thumbnail} alt={video.title} className="tv-thumbnail" />
                  <div className="tv-play-overlay">
                    <span className="play-icon">▶</span>
                  </div>
                  <span className="tv-duration">{video.duration}</span>
                </div>
                <div className="tv-info">
                  <span className="tv-category">{video.category}</span>
                  <h3 className="tv-title">{video.title}</h3>
                  <div className="tv-meta">
                    <span className="tv-designer">{video.designer} 여행설계사</span>
                    <span className="tv-views">조회수 {video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="elite-proposal-modal" onClick={e => e.stopPropagation()}>
            <button className="btn-close-elite-round" onClick={() => setSelectedVideo(null)}>&times;</button>
            <div className="video-container-elite" style={{ paddingBottom: '56.25%' }}>
              <iframe 
                src={`${selectedVideo.youtubeUrl}?autoplay=1`} 
                title={selectedVideo.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="elite-detail-body">
              <span className="elite-region-badge">{selectedVideo.category}</span>
              <h2 className="elite-proposal-title">{selectedVideo.title}</h2>
              <div className="elite-designer-profile" style={{ marginTop: '2rem' }}>
                <div className="elite-avatar-wrap">
                  <div className="elite-avatar" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedVideo.designer})` }}></div>
                </div>
                <div className="profile-info">
                  <span className="label">제공 여행설계사</span>
                  <span className="value">{selectedVideo.designer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer glass-card-no-hover">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo-text-small">GIJO TOUR</div>
              <p className="brand-desc">Elite B2B Travel Architecture. Connecting visionaries with the world's most exclusive experiences.</p>
            </div>
            <div className="footer-links">
            </div>
          </div>
          <div className="footer-bottom" style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.4, fontSize: '0.8rem' }}>
            © 2026 GIJO TOUR. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        .designer-tv-container {
          background: var(--bg-color);
          min-height: 100vh;
        }
        .tv-hero {
          padding-top: 180px;
          padding-bottom: 60px;
          text-align: center;
        }
        .tv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }
        .tv-card {
          overflow: hidden;
          padding: 0;
        }
        .tv-thumbnail-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .tv-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .tv-card:hover .tv-thumbnail {
          transform: scale(1.1);
        }
        .tv-play-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
        }
        .tv-card:hover .tv-play-overlay {
          opacity: 1;
        }
        .play-icon {
          font-size: 3rem;
          color: #fff;
          filter: drop-shadow(0 0 15px var(--accent-glow));
        }
        .tv-duration {
          position: absolute;
          bottom: 10px; right: 10px;
          background: rgba(0, 0, 0, 0.7);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          color: #fff;
        }
        .tv-info {
          padding: 1.5rem;
        }
        .tv-category {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-color);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .tv-title {
          font-size: 1.25rem;
          margin: 0.5rem 0 1rem;
          line-height: 1.3;
          height: 2.6rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .tv-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          opacity: 0.6;
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}

export default DesignerTV;
