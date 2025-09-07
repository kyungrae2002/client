'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ReportModal } from './report-modal';

export interface CommentItemProps {
  comment: {
    id: number;
    author: string;
    timestamp: string;
    content: string;
    isHeartSelected?: boolean;
  };
  isReply?: boolean;
  composerId?: string;
  onReply?: (commentId: number, author: string) => void;
  onReportOpen?: () => void;
  onReportClose?: () => void;
}

const CommentItem = ({ comment, isReply = false, composerId, onReply, onReportOpen, onReportClose }: CommentItemProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isHeartSelected, setIsHeartSelected] = useState(comment.isHeartSelected || false);

  const handleReplyClick = () => {
    if (onReply) {
      onReply(comment.id, comment.author);
    }
  };

  const handleHeartClick = () => {
    setIsHeartSelected(!isHeartSelected);
    // TODO: 백엔드 API 호출로 하트 상태 업데이트
  };

  const handleReportClick = () => {
    setIsReportModalOpen(true);
    // 신고 모달 열렸을 때 댓글 입력창 숨기기
    if (onReportOpen) {
      onReportOpen();
    }
  };

  const handleReportModalClose = () => {
    setIsReportModalOpen(false);
    // 신고 모달 닫혔을 때 댓글 입력창 다시 보이기
    if (onReportClose) {
      onReportClose();
    }
  };

  return (
    <>
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={handleReportModalClose}
          postId={`comment-${comment.id}`}
          composerId={composerId || ''}
        />
      )}
      <div className={`bg-white box-border content-stretch flex flex-col gap-2.5 items-center justify-start py-[18px] relative shrink-0 w-full ${isReply ? 'pl-[50px] pr-5' : 'px-5'}`}>
      <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full">
        <div className="bg-[#d9d9d9] rounded-full shrink-0 size-[31px] flex items-center justify-center mt-1">
          <Image src="/icons/profile.svg" alt="profile" width={20} height={20} />
        </div>
        <div className="basis-0 content-stretch flex flex-col grow items-start justify-start">
          <p className="text-[#4c4c4c] text-[14px] font-semibold">{comment.author}</p>
          <p className="text-[#d9d9d9] text-[12px] font-medium">{comment.timestamp}</p>
        </div>
        <div className="content-stretch flex gap-0.5 items-center justify-start relative shrink-0">
          <button 
            onClick={handleHeartClick}
            className="overflow-clip relative shrink-0 size-[26px] hover:bg-gray-100 rounded-full transition-colors"
          >
            <Image src={isHeartSelected ? "/icons/heart_selected.svg" : "/icons/heart.svg"} alt="heart" width={18} height={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </button>
          <button 
            onClick={handleReplyClick}
            className="overflow-clip relative shrink-0 size-[26px] hover:bg-gray-100 rounded-full transition-colors"
          >
            <Image src="/icons/message.svg" alt="reply" width={18} height={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </button>
          <button 
            onClick={handleReportClick}
            className="overflow-clip relative shrink-0 size-[26px] hover:bg-gray-100 rounded-full transition-colors"
          >
            <Image src="/icons/alarm.svg" alt="report" width={18} height={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center leading-normal not-italic relative shrink-0 text-[#a6a6a6] text-[14px] w-full">
        <p>{comment.content}</p>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
