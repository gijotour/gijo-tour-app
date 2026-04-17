import React, { useState } from 'react';

const DesignerTV = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="designer-tv section-padding">
      <div className="container">
        <div className="tv-header text-center mb-16">
          <span className="badge-premium">GIJO TOUR TV</span>
          <h2 className="section-title mt-4">여행설계사 VLOG & TV</h2>
          <p className="section-subtitle">여행 설계사들이 직접 전하는 생생한 현지 소식과 여행 꿀팁을 확인하세요.</p>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card glass-card" onClick={() => setSelectedVideo(video)}>
              <div className="video-thumbnail-wrapper">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <div className="video-overlay">
                  <div className="play-button-icon">▶</div>
                </div>
                <div className="video-duration">{video.duration}</div>
              </div>
              <div className="video-info p-6">
                <div className="video-meta mb-2">
                  <span className="video-category">{video.category}</span>
                  <span className="video-views">조회수 {video.views}</span>
                </div>
                <h3 className="video-title mb-4">{video.title}</h3>
                <div className="video-footer">
                  <span className="video-designer">by {video.designer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal-content glass-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedVideo(null)}>&times;</button>
            <div className="video-iframe-container">
              <iframe 
                src={selectedVideo.youtubeUrl} 
                title={selectedVideo.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="modal-info p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-400">설계사 {selectedVideo.designer} | {selectedVideo.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DesignerTV;
