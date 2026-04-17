import React, { useState } from 'react';

const SizeControl = ({ uiScale, onScaleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scales = [
    { label: 'S', value: 0.9, title: '기본보다 작게' },
    { label: 'M', value: 1.0, title: '표준 크기' },
    { label: 'L', value: 1.15, title: '크게 보기' },
    { label: 'XL', value: 1.3, title: '아주 크게 보기' }
  ];

  return (
    <div className={`size-control-wrapper ${isOpen ? 'active' : ''}`}>
      <button 
        className="size-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="화면 크기 조정"
      >
        <span className="icon">Aa</span>
      </button>

      <div className="size-menu glass-card">
        <div className="menu-header">
          <span>화면 크기 조절</span>
          <button className="close-mini" onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        <div className="scale-options">
          {scales.map((s) => (
            <button
              key={s.label}
              className={`scale-btn ${uiScale === s.value ? 'active' : ''}`}
              onClick={() => {
                onScaleChange(s.value);
                // 모바일에서는 선택 시 메뉴 닫기 유인
                if (window.innerWidth < 768) setIsOpen(false);
              }}
              title={s.title}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="scale-hint">전체 글자와 UI 크기가 조정됩니다.</p>
      </div>
    </div>
  );
};

export default SizeControl;
