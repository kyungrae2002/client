import React from 'react';

interface PasswordChangePopupProps {
  onClose: () => void;
}

export default function PasswordChangePopup({ onClose }: PasswordChangePopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col justify-center items-center px-7 py-9 pb-[18px] gap-[30px] w-[276px] h-[152px] bg-[#F4F5F7] border border-[#F5F5F5] rounded-[20px] box-border">
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center p-0 gap-[2px] w-[220px] h-[38px]">
          <p className="w-[220px] h-[38px] font-pretendard font-semibold text-base leading-[19px] flex items-center text-center text-[#4C4C4C]">
            비밀번호 변경이 완료되었습니다. 변경된 비밀번호로 로그인해주세요
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="flex flex-row justify-center items-center px-[14px] py-2 gap-[2px] w-[220px] h-[30px] bg-[#293A92] rounded-[50px] hover:bg-[#1f2d6f] transition-colors"
        >
          <span className="w-[23px] h-[14px] font-pretendard font-semibold text-[11px] leading-[14px] flex items-center text-white cursor-pointer">
            확인
          </span>
        </button>
      </div>
    </div>
  );
}