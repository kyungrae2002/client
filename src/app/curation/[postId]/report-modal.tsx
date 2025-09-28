'use client';

import { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  postId: string;
  composerId: string;
}

const REPORT_REASONS = [
  {
    id: 1,
    title: '1. 스팸/광고',
    description: '무관한 상업 광고, 도배성 홍보, 외부 사이트 유도'
  },
  {
    id: 2,
    title: '2.부적절한 언어/욕설',
    description: '비속어, 혐오 발언, 음란 표현 등'
  },
  {
    id: 3,
    title: '3.명예훼손/비방',
    description: '특정 개인/단체에 대한 악의적 허위사실 유포'
  },
  {
    id: 4,
    title: '4.저작권 침해',
    description: '불법 복제 음원/영상/악보/촬영, 무단 이미지 사용'
  },
  {
    id: 5,
    title: '5.주제와 무관한 내용',
    description: '카테고리/토크룸 주제와 전혀 상관없는 내용'
  },
  {
    id: 6,
    title: '6.개인정보 유출',
    description: '전화번호, 주소, 계좌번호 등 개인정보 노출'
  },
  {
    id: 7,
    title: '7.기타 (내용 입력 필수)',
    description: '위 항목에 해당하지 않는 부적절한 콘텐츠'
  }
];

export function ReportModal({ isOpen, onClose, onSubmit, postId, composerId }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<number | null>(null);
  const [additionalComment, setAdditionalComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          composerId,
          reason: selectedReason,
          comment: additionalComment,
        }),
      });

      if (response.ok) {
        alert('신고가 접수되었습니다.');
        if (onSubmit) {
          onSubmit();
        } else {
          onClose();
        }
      } else {
        alert('신고 접수 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Report submission error:', error);
      alert('신고 접수 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReasonSelect = (reasonId: number) => {
    setSelectedReason(reasonId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Main Container - 375px width matching Figma */}
      <div 
        className="bg-white w-[375px] max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-6 h-6"
            >
              <svg width="7" height="15" viewBox="0 0 7 15" fill="none" className="transform rotate-180">
                <path d="M1 1L6 7.5L1 14" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-base font-semibold text-[#1A1A1A] ml-1">글쓰기</h2>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button className="flex items-center justify-center px-3 py-1.5 bg-white border border-[#D9D9D9] rounded-full">
              <span className="text-[13px] font-semibold text-[#A6A6A6]">등록</span>
              <svg width="12" height="11" viewBox="0 0 12 11" className="ml-0.5">
                <path d="M6 0L12 11H0L6 0Z" fill="#BFBFBF"/>
              </svg>
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!selectedReason || isSubmitting}
              className="flex items-center justify-center px-3.5 py-1.5 bg-[#293A92] rounded-full disabled:opacity-50"
            >
              <span className="text-[13px] font-semibold text-white">등록</span>
              <svg width="12" height="11" viewBox="0 0 12 11" className="ml-0.5 transform rotate-90">
                <path d="M1 1L6 7.5L1 14" stroke="#BFC4DE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Post Type Section */}
        <div className="px-5 py-3.5 bg-[#F4F5F7]">
          <span className="text-[12px] font-medium text-[#4C4C4C]">게시글 유형</span>
        </div>

        {/* Selected Post Type */}
        <div className="flex items-center px-6 py-4 bg-white">
          <div className="w-3 h-3 mr-2">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="6" fill="#293A92"/>
            </svg>
          </div>
          <span className="text-[14px] font-semibold text-[#1A1A1A]">큐레이션</span>
        </div>

        {/* Title Section */}
        <div className="px-5 py-3.5 bg-[#F4F5F7]">
          <span className="text-[12px] font-medium text-[#4C4C4C]">게시글 제목</span>
        </div>

        {/* Report Reasons */}
        <div className="px-5 py-5 bg-white">
          <h3 className="text-base font-semibold text-[#1A1A1A] mb-5">신고 사유 선택</h3>
          
          <div className="space-y-4.5">
            {REPORT_REASONS.map((reason) => (
              <div key={reason.id} className="flex items-center gap-4.5">
                <button
                  onClick={() => handleReasonSelect(reason.id)}
                  className={`w-3 h-3 rounded-full border-[1.5px] flex-shrink-0 ${
                    selectedReason === reason.id 
                      ? 'bg-[#293A92] border-[#293A92]' 
                      : 'border-[#D9D9D9] bg-white'
                  }`}
                />
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-[#4C4C4C] leading-[17px] tracking-[-0.02em]">
                    {reason.title}
                  </div>
                  <div className="text-[14px] font-medium text-[#BFBFBF] leading-[17px] tracking-[-0.02em] mt-0.5">
                    {reason.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Comment for "기타" option */}
          {selectedReason === 7 && (
            <div className="mt-4 relative">
              <div className="w-[284px] h-[88px] bg-[#F5F5F5] rounded-[10px] p-3.5">
                <textarea
                  value={additionalComment}
                  onChange={(e) => setAdditionalComment(e.target.value)}
                  placeholder="기타 내용 작성"
                  className="w-full h-full bg-transparent text-[12px] font-medium text-[#BFBFBF] placeholder-[#BFBFBF] border-none outline-none resize-none tracking-[-0.02em]"
                  maxLength={200}
                />
              </div>
            </div>
          )}
        </div>

        {/* Post Title Input */}
        <div className="px-5 py-4 bg-white">
          <input
            type="text"
            placeholder="큐레이션 제목을 입력하세요!"
            className="w-full text-[14px] font-medium text-[#D9D9D9] placeholder-[#D9D9D9] border-none outline-none"
            readOnly
          />
        </div>

        {/* Content Section Header */}
        <div className="px-5 py-3.5 bg-[#F4F5F7]">
          <span className="text-[12px] font-medium text-[#4C4C4C]">게시글 내용</span>
        </div>

        {/* Content Input */}
        <div className="px-5 py-4 bg-white h-[228px]">
          <textarea
            placeholder="좋은 음악과 함께 나누고픈 이야기를 자유롭게 적어보세요!"
            className="w-full h-full text-[14px] font-medium text-[#D9D9D9] placeholder-[#D9D9D9] border-none outline-none resize-none leading-[17px]"
            readOnly
          />
        </div>

        {/* Hashtag Section */}
        <div className="px-5 py-3.5 bg-[#F4F5F7]">
          <span className="text-[12px] font-medium text-[#4C4C4C]">해시태그 등록</span>
        </div>

        <div className="px-5 py-4 bg-white">
          <input
            type="text"
            placeholder="해시태그 작성 최대 N개"
            className="w-full text-[14px] font-medium text-[#4C4C4C] placeholder-[#4C4C4C] border-none outline-none"
            readOnly
          />
        </div>

        {/* Content Attachment Section */}
        <div className="px-5 py-3.5 bg-[#F4F5F7]">
          <span className="text-[12px] font-medium text-[#4C4C4C]">콘텐츠 첨부</span>
        </div>

        <div className="px-5 py-4 bg-white space-y-3">
          <div className="bg-[#F4F5F7] rounded-[10px] px-3.5 py-2.5">
            <span className="text-[14px] font-medium text-[#A6A6A6]">영상 링크 붙여넣기</span>
          </div>
          <div className="bg-[#F4F5F7] rounded-[10px] px-3.5 py-2.5">
            <span className="text-[14px] font-medium text-[#A6A6A6]">이미지 업로드</span>
          </div>
        </div>
      </div>
    </div>
  );
}