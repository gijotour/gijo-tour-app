import React, { useState } from 'react';

const DesignerShowcase = ({ packages, onRate, selectedRegion = '전체' }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showReviewListModal, setShowReviewListModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  
  // 평점 등록 상태
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(5);

  const openRatingModal = (pkg) => {
    setSelectedDesigner(pkg);
    setNickname('');
    setComment('');
    setRating(5);
    setShowRatingModal(true);
  };

  const openReviewList = (pkg) => {
    setSelectedDesigner(pkg);
    setShowReviewListModal(true);
  };

  const openDetailModal = (pkg) => {
    setSelectedDesigner(pkg);
    setShowDetailModal(true);
  };

  const submitRating = () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    onRate(selectedDesigner.designer, nickname, rating, comment);
    setShowRatingModal(false);
    alert(`${selectedDesigner.designer} 설계사님께 리뷰를 남겼습니다!`);
  };

  return (
    <section id="designer" className="designer-section">
      <div className="container">
        {/* Rating Modal (Existing) */}
        {showRatingModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-card rating-modal">
              <h2>경험하신 서비스는 어떠셨나요?</h2>
              <p><strong>{selectedDesigner?.designer}</strong> 설계사님의 제안에 평점과 후기를 남겨주세요.</p>
              
              <div className="rating-form">
                <div className="form-group">
                  <label>닉네임</label>
                  <input 
                    type="text" 
                    placeholder="예: 홍길동" 
                    value={nickname} 
                    onChange={(e) => setNickname(e.target.value)} 
                  />
                </div>

                <div className="star-selection">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star-btn ${(hoverRating || rating) >= star ? 'active' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div className="form-group">
                  <label>리뷰 내용</label>
                  <textarea 
                    rows="3" 
                    placeholder="설계사님의 서비스에 대한 후기를 자유롭게 남겨주세요."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowRatingModal(false)}>취소</button>
                <button className="btn-submit-rating" onClick={submitRating}>평점 등록하기</button>
              </div>
            </div>
          </div>
        )}

        {/* Review List Modal (Existing) */}
        {showReviewListModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-card review-list-modal">
              <div className="modal-header">
                <h2>{selectedDesigner?.designer} 설계사 리뷰 목록</h2>
                <button className="btn-close-modal" onClick={() => setShowReviewListModal(false)}>&times;</button>
              </div>
              <div className="review-list custom-scrollbar">
                {selectedDesigner?.reviews && selectedDesigner.reviews.length > 0 ? (
                  selectedDesigner.reviews.map((rev, i) => (
                    <div key={i} className="review-item">
                      <div className="rev-header">
                        <span className="rev-name">{rev.nickname}</span>
                        <span className="rev-stars">{'★'.repeat(rev.rating)}</span>
                        <span className="rev-date">{rev.date}</span>
                      </div>
                      <p className="rev-comment">{rev.comment || '상세 내용 없음'}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-reviews">아직 등록된 리뷰가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Proposal Modal (Existing) */}
        {showDetailModal && selectedDesigner?.detailedPlan && (
          <div className="modal-overlay">
            <div className="modal-content glass-card detail-proposal-modal wide-modal">
              <div className="detail-header-img">
                <img src={selectedDesigner.image} alt="Hero" />
                <div className="header-overlay">
                  <button className="btn-close-round" onClick={() => setShowDetailModal(false)}>&times;</button>
                  <span className="detail-badge">{selectedDesigner.region} 전문 제안</span>
                  <h1>{selectedDesigner.title}</h1>
                </div>
              </div>

              <div className="detail-body custom-scrollbar">
                <div className="detail-main-info">
                  <div className="designer-box">
                    <div className="avatar"></div>
                    <div className="text">
                      <span className="name">{selectedDesigner.designer} 설계사</span>
                      <span className="meta">기대 평점 ★ {selectedDesigner.rating} | 리뷰 {selectedDesigner.reviewCount}건</span>
                    </div>
                  </div>
                  <div className="price-tag">
                    <span className="label">예상 견적</span>
                    <span className="amount">{selectedDesigner.detailedPlan.pricing}</span>
                  </div>
                </div>

                <div className="detail-grid">
                  <div className="detail-section itinerary-section">
                    <h3>상세 일정 (Itinerary)</h3>
                    <div className="timeline">
                      {selectedDesigner.detailedPlan.itinerary.map((item, i) => (
                        <div key={i} className="timeline-item">
                          <div className="dot"></div>
                          <div className="content">
                            <span className="day">Day {item.day}</span>
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-side">
                    <div className="detail-section info-box">
                      <h3>포함 사항</h3>
                      <ul>
                        {selectedDesigner.detailedPlan.inclusions.map((text, i) => (
                          <li key={i}>{text}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="detail-section info-box gray-box">
                      <h3>불포함 사항</h3>
                      <ul>
                        {selectedDesigner.detailedPlan.exclusions.map((text, i) => (
                          <li key={i}>{text}</li>
                        ))}
                      </ul>
                    </div>
                    {selectedDesigner.detailedPlan.proTip && (
                      <div className="detail-section tip-box">
                        <h3>💡 설계사의 꿀팁</h3>
                        <p>{selectedDesigner.detailedPlan.proTip}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="detail-footer-actions">
                  <button className="btn-contact-main">이 일정으로 상담 시작하기</button>
                  <button className="btn-close-text" onClick={() => setShowDetailModal(false)}>닫기</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="section-header centered animate-up">
          <div className="section-badge">DESIGNER PROPOSALS</div>
          {selectedRegion === '전체' ? (
            <>
              <h2>전문 <span className="highlight">여행 설계사</span>의 맞춤 제안</h2>
              <p>현지 사정에 정통한 전문가들이 귀하의 완벽한 여정을 위해 준비한 <br />비대면 맞춤형 프리미엄 서비스를 지금 바로 만나보세요.</p>
            </>
          ) : (
            <>
              <h2><span className="highlight">[{selectedRegion}]</span> 지역 맞춤 제안</h2>
              <p>해당 지역의 전문가들이 제안하는 총 <strong>{packages.length}건</strong>의 맞춤 일정이 준비되어 있습니다.</p>
            </>
          )}
        </div>

        <div className="designer-grid">
          {packages.map((pkg, index) => (
            <div key={index} className="package-card glass-card">
              {pkg.image && (
                <div className="package-image">
                  <img src={pkg.image} alt={pkg.title} />
                  <div className="image-overlay"></div>
                </div>
              )}
              
              <div className="designer-info">
                <div className="profile-img"></div>
                <div className="profile-text">
                  <span className="name">{pkg.designer}</span>
                  <span className="region">{pkg.region}</span>
                </div>
                <div className="rating-badge">
                  <span className="star">★</span> {pkg.rating}
                  <span className="count">({pkg.reviewCount})</span>
                </div>
              </div>
              
              <div className="package-body">
                <h3>{pkg.title}</h3>
                <ul className="pkg-features">
                  {pkg.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="package-footer">
                <div className="footer-btn-group">
                  <button className="btn-rate" onClick={() => openRatingModal(pkg)}>평점 남기기</button>
                  <button className="btn-view-reviews" onClick={() => openReviewList(pkg)}>리뷰 리스트 보기</button>
                </div>
                <button className="btn-detail" onClick={() => openDetailModal(pkg)}>상세 제안서 보기</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default DesignerShowcase;
