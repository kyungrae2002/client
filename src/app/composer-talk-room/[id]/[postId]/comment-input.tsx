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
  const MAX_CHARS = 28;

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    onSubmitComment(
      content.trim(),
      replyMode?.isReply || false,
      replyMode?.replyToId
    );
    
    setContent('');
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

  const isOverLimit = content.length > MAX_CHARS;
  const canSubmit = content.trim() && !isOverLimit;

  return (
    <div className="bg-white border-t border-gray-100 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] z-50">
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
      
      <div className="px-5 py-4">
        <div className="flex gap-2 items-start">
          <div className="bg-[#d9d9d9] rounded-full size-[31px] shrink-0 flex items-center justify-center">
            <Image src="/icons/profile.svg" alt="profile" width={20} height={20} />
          </div>
          
          <div className="flex-1 flex flex-col gap-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="댓글을 입력해주세요..."
              className={`w-full p-3 border rounded-lg text-[14px] 
                         placeholder-gray-400 resize-none focus:outline-none 
                         min-h-[40px] max-h-[120px] ${
                           isOverLimit 
                             ? 'border-red-300 focus:border-red-400' 
                             : 'border-gray-200 focus:border-blue-400'
                         }`}
              rows={1}
              style={{ 
                height: 'auto',
                minHeight: '40px',
                maxHeight: '120px'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
            />
            
            <div className="flex justify-end items-center">
              <div className="flex items-center gap-2">
                <span className={`text-xs ${
                  isOverLimit ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {content.length}/{MAX_CHARS}
                </span>
                
                <button 
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`px-4 py-2 text-sm rounded-lg font-medium ${
                    canSubmit
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}