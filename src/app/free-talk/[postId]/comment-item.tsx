'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ReportModal } from './report-modal';

export interface CommentData {
  id: number;
  author: string;
  timestamp: string;
  content: string;
  isHeartSelected?: boolean;
  isReply?: boolean;
}

interface CommentItemProps {
  comment: CommentData;
  composerId?: string;
  onReply?: (commentId: number, author: string) => void;
  onReportOpen?: () => void;
  onReportClose?: () => void;
}

export default function CommentItem({ comment, composerId, onReply, onReportOpen, onReportClose }: CommentItemProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isHeartSelected, setIsHeartSelected] = useState(comment.isHeartSelected || false);

  const handleReplyClick = () => onReply?.(comment.id, comment.author);
  const handleHeartClick = () => setIsHeartSelected(v => !v); // TODO: backend sync
  const handleReportClick = () => { setIsReportModalOpen(true); onReportOpen?.(); };
  const handleReportModalClose = () => { setIsReportModalOpen(false); onReportClose?.(); };

  return (
    <>
      {isReportModalOpen && (
        <ReportModal isOpen={isReportModalOpen} onClose={handleReportModalClose} postId={`comment-${comment.id}`} composerId={composerId || ''} />
      )}
      <div className={`bg-white flex flex-col gap-2.5 py-[18px] w-full ${comment.isReply ? 'pl-[50px] pr-5' : 'px-5'}`}>
        <div className="flex gap-2 items-start w-full">
          <div className="bg-[#d9d9d9] rounded-full size-[31px] flex items-center justify-center mt-1">
            <Image src="/icons/profile.svg" alt="profile" width={20} height={20} />
          </div>
          <div className="flex flex-col grow">
            <p className="text-[#4c4c4c] text-[14px] font-semibold">{comment.author}</p>
            <p className="text-[#d9d9d9] text-[12px] font-medium">{comment.timestamp}</p>
          </div>
          <div className="flex gap-0.5 items-center">
            <button onClick={handleHeartClick} className="relative size-[26px] hover:bg-gray-100 rounded-full">
              <Image src={isHeartSelected ? '/icons/heart_selected.svg' : '/icons/heart.svg'} alt="heart" width={18} height={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </button>
            <button onClick={handleReplyClick} className="relative size-[26px] hover:bg-gray-100 rounded-full">
              <Image src="/icons/message.svg" alt="reply" width={18} height={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </button>
            <button onClick={handleReportClick} className="relative size-[26px] hover:bg-gray-100 rounded-full">
              <Image src="/icons/alarm.svg" alt="report" width={18} height={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </button>
          </div>
        </div>
        <div className="text-[#a6a6a6] text-[14px] leading-normal">
          <p>{comment.content}</p>
        </div>
      </div>
    </>
  );
}
