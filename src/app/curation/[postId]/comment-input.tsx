'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CommentInputProps {
  onSubmitComment: (content: string, isReply?: boolean, replyToId?: number) => void;
  replyMode?: {
    isReply: boolean;
    replyToId: number;
    replyToAuthor: string;
  };
  onCancelReply?: () => void;
}

export default function CommentInput({ 
  onSubmitComment, 
  replyMode, 
  onCancelReply 
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_CHARS = 28;

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    onSubmitComment(
      content.trim(),
      replyMode?.isReply || false,
      replyMode?.replyToId
    );
    
    setContent('');
    setIsExpanded(false);
    if (onCancelReply) {
      onCancelReply();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (content.trim() && content.length <= MAX_CHARS) {
        handleSubmit();
      }
    }
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleInputBlur = () => {
    if (!content.trim()) {
      setIsExpanded(false);
    }
  };

  const isOverLimit = content.length > MAX_CHARS;
  const canSubmit = content.trim() && !isOverLimit;

  return (
    <div 
      style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
      className={`bg-white border border-[#F5F5F5] fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] z-50 ${
        isExpanded ? 'h-auto' : 'h-[88px]'
      }`}
    >
      {/* Reply Mode Header */}
      {replyMode?.isReply && (
        <div className="px-5 py-2 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-600">
              @{replyMode.replyToAuthor}님에게 답글
            </span>
            <button 
              onClick={onCancelReply}
              className="text-blue-400 hover:text-blue-600 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {/* Main Comment Input Area */}
      <div className="flex flex-col items-start px-5 pt-3.5 pb-7 gap-2.5">
        <div className="flex justify-center items-center gap-1.5 w-full h-11">
          {/* Profile Image */}
          <div 
            className="w-11 h-11 rounded-full flex-shrink-0"
            style={{
              background: 'url(.jpg), #D9D9D9',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="w-full h-full rounded-full bg-[#D9D9D9] flex items-center justify-center">
              <Image src="/icons/profile.svg" alt="profile" width={20} height={20} />
            </div>
          </div>

          {/* Input Container */}
          <div className="flex justify-center items-center px-3.5 py-1.5 gap-2.5 w-[286px] h-11 bg-[#F4F5F7] rounded-full flex-shrink-0 relative">
            {!isExpanded ? (
              /* Collapsed State - Placeholder */
              <>
                <button
                  onClick={handleInputClick}
                  className="flex items-center justify-center text-[14px] font-medium leading-[17px] text-[#A6A6A6] flex-1"
                >
                  댓글을 남겨주세요
                </button>
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <svg width="7" height="15" viewBox="0 0 7 15" fill="none">
                    <path 
                      d="M1 1L6 7.5L1 14" 
                      stroke="#4C4C4C" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : (
              /* Expanded State - Textarea */
              <div className="flex-1 relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onBlur={handleInputBlur}
                  placeholder="댓글을 입력해주세요..."
                  className={`w-full bg-transparent text-[14px] font-medium 
                             placeholder-[#A6A6A6] resize-none border-none outline-none
                             min-h-[20px] max-h-[100px] ${
                               isOverLimit ? 'text-red-500' : 'text-[#1A1A1A]'
                             }`}
                  style={{ 
                    height: 'auto',
                    minHeight: '20px',
                    maxHeight: '100px'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 100) + 'px';
                  }}
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="flex justify-end items-center w-full gap-2 mt-1">
            <span className={`text-xs ${
              isOverLimit ? 'text-red-500' : 'text-[#A6A6A6]'
            }`}>
              {content.length}/{MAX_CHARS}
            </span>
            
            <button 
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                canSubmit
                  ? 'bg-[#293A92] text-white hover:bg-[#1e2a6b]'
                  : 'bg-[#D9D9D9] text-[#A6A6A6] cursor-not-allowed'
              }`}
            >
              등록
            </button>
            
            <button 
              onClick={() => {
                setContent('');
                setIsExpanded(false);
                if (onCancelReply) {
                  onCancelReply();
                }
              }}
              className="px-3 py-2 text-sm text-[#A6A6A6] hover:text-[#4C4C4C] transition-colors"
            >
              취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
}