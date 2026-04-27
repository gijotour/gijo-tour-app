import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import PremiumLanding from './PremiumLanding';
import DesignerShowcase from './DesignerShowcase';
import PaymentPage from './PaymentPage';
import { mockDb } from '../data/mockDb';

function normalizeBudget(rawBudget) {
  if (!rawBudget || !rawBudget.trim()) return '1,590,000원~';
  return rawBudget.includes('원') || rawBudget.includes('만원') ? rawBudget : `${rawBudget}원`;
}

function GijoTourApp() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState(mockDb.packages);
  const [selectedPackageForPayment, setSelectedPackageForPayment] = useState(null);

  const handleCreateProposal = (form) => {
    const purpose = form.purpose?.trim() || '프라이빗 힐링';
    const people = form.people?.trim() || '2명';
    const date = form.date?.trim() || '상담 후 확정';
    const budget = normalizeBudget(form.budget);
    const contact = form.contact?.trim() || '상담 필요';
    const title = `${purpose} 맞춤 프리미엄 3박4일 제안`;

    const newPkg = {
      id: Date.now(),
      title,
      region: '필리핀 · 보라카이/세부',
      designer: 'GIJO 프리미엄 설계팀',
      price: budget,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      youtubeUrl: '',
      description: `${people} / ${date} / ${purpose} / 연락처: ${contact}`,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      features: [
        '공항 픽업부터 귀국 동선까지 풀케어',
        '현지 검증 가이드 배정',
        '고객 목적 기반 맞춤 일정 설계',
        '예약금 30% · 출발 7일 전 잔금 구조'
      ],
      customerRequest: {
        people,
        date,
        budget,
        purpose,
        contact
      },
      detailedPlan: {
        pricing: `1인당 약 ${budget} (항공권 별도)`,
        summary: `${people} 고객을 위한 ${purpose} 중심 프리미엄 맞춤 여행 제안입니다. 여행 날짜는 ${date} 기준으로 설계되었습니다.`,
        itinerary: [
          {
            day: 1,
            title: '도착 · 전용 픽업 · 체크인 케어',
            content: `공항 도착 후 대기 없이 전용 픽업으로 이동합니다. ${people} 구성에 맞춰 호텔 체크인, 주변 동선, 첫 식사까지 GIJO가 정리합니다.`
          },
          {
            day: 2,
            title: '프라이빗 핵심 일정 · 현지 가이드 케어',
            content: `${purpose} 목적에 맞춰 호핑, 해변 휴식, 시티투어 중 최적 동선을 구성합니다. 검증된 현지 가이드가 일정 전체를 케어합니다.`
          },
          {
            day: 3,
            title: '힐링 · 마사지 · 맛집 예약 대행',
            content: '무리한 패키지 일정을 줄이고, 마사지/자유시간/프리미엄 식사 예약을 조합합니다. 고객 취향에 맞춰 일정 변경도 가능합니다.'
          },
          {
            day: 4,
            title: '체크아웃 · 공항 이동 · 귀국 케어',
            content: '체크아웃 시간, 짐 보관, 공항 이동까지 마지막 동선을 사전에 확정해 여행 종료까지 스트레스를 줄입니다.'
          }
        ],
        inclusions: [
          '여행 전 한국어 상담 및 일정 설계',
          '현지 전용 픽업/이동 동선 설계',
          '검증된 현지 가이드 매칭',
          '숙소/식당/마사지 예약 지원',
          '여행 중 긴급 커뮤니케이션 지원'
        ],
        exclusions: [
          '왕복 항공권',
          '개인 쇼핑 및 개인 경비',
          '일정 외 추가 액티비티',
          '선택 팁 및 현장 추가 요청 비용'
        ],
        proTip: '상담 후 고객 성향을 확인해 BASIC/ PREMIUM 두 가지 견적안으로 다시 정리하면 결제 전환율이 높습니다.'
      }
    };

    setPackages(prev => [newPkg, ...prev]);
    navigate('/gijotour/proposals');
    return newPkg.title;
  };

  const handleStartPayment = (pkg) => {
    setSelectedPackageForPayment(pkg);
    navigate('/gijotour/payment');
  };

  return (
    <Routes>
      <Route index element={<PremiumLanding onCreateAutoProposal={handleCreateProposal} />} />

      <Route path="proposals" element={<DesignerShowcase packages={packages} onStartPayment={handleStartPayment} />} />

      <Route path="payment" element={
        selectedPackageForPayment ? (
          <PaymentPage pkg={selectedPackageForPayment} onBack={() => navigate('/gijotour/proposals')} />
        ) : (
          <Navigate to="/gijotour" />
        )
      } />

      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}

export default GijoTourApp;
