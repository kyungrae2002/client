'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';

const ProfileSetupPage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (예: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isNicknameValid = nickname.length > 0 && nickname.length <= 8;
  const isBioValid = bio.length <= 12;
  const isFormValid = isNicknameValid && isBioValid && profileImage;

  const handleNext = () => {
    if (isFormValid) {
      // 프로필 설정 완료 처리
      console.log('프로필 설정 데이터:', { nickname, bio, profileImage });
      // 실제로는 회원가입 완료 API 호출 또는 완료 페이지로 이동
      alert('회원가입이 완료되었습니다!');
      // 메인 페이지 또는 로그인 페이지로 이동
      router.push('/');
    }
  };

  return (
    <div className="relative w-full max-w-[375px] mx-auto h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex flex-col">
        {/* Status Bar */}
        <div className="h-[54px] bg-white pt-[21px]" />

        {/* Navigation Bar */}
        <div className="bg-white px-5 pb-3">
          <div className="flex items-center gap-1 h-[30px]">
            <Link href="/loginpage/register/terms">
              <button className="w-5 h-5 flex items-center justify-center">
                <svg width="7" height="15" viewBox="0 0 7 15" fill="none" className="rotate-180">
                  <path d="M1 1L6 7.5L1 14" stroke="#1A1A1A" strokeWidth="2"/>
                </svg>
              </button>
            </Link>
            <h1 className="flex-1 text-base font-semibold text-[#1A1A1A]">
              회원가입
            </h1>
          </div>
        </div>
      </div>

      {/* Background Separator */}
      <div className="h-[10px] bg-[#F4F5F7]" />

      {/* Main Content */}
      <div className="flex-1 px-5 pt-10">
        <div className="flex flex-col items-center gap-[30px]">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center gap-2.5">
            <div className="relative w-[163px] h-[163px]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="profile-upload"
                className="block w-full h-full rounded-full overflow-hidden cursor-pointer bg-gray-100"
                onClick={() => fileInputRef.current?.click()}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </label>
            </div>

            <label
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg className="w-3 h-3 text-[#A6A6A6]" strokeWidth={1} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs font-semibold text-[#A6A6A6] border-b border-[#A6A6A6]">
                프로필 사진 등록
              </span>
            </label>
          </div>

          {/* Nickname Input */}
          <div className="w-full flex flex-col gap-2.5">
            <label className="text-sm font-semibold text-[#4C4C4C]">
              닉네임 입력
            </label>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-end gap-2.5">
                <div className="flex-1 flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="최대 8글자 입력 가능합니다"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value.slice(0, 8))}
                    className="w-full text-[15px] font-medium text-[#1A1A1A] placeholder:text-[#BFBFBF] border-b border-[#D9D9D9] pb-3 outline-none focus:border-[#1A1A1A] transition-colors"
                  />
                </div>
                <button
                  className={`px-3.5 py-2.5 rounded-md text-xs font-medium text-white whitespace-nowrap ${
                    isNicknameValid ? 'bg-[#293A92]' : 'bg-[#D9D9D9]'
                  }`}
                  disabled={!isNicknameValid}
                >
                  중복 인증
                </button>
              </div>
            </div>
          </div>

          {/* BIO Input */}
          <div className="w-full flex flex-col gap-2.5">
            <label className="text-sm font-semibold text-[#4C4C4C]">
              BIO 입력
            </label>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="최대 12글자 입력 가능합니다"
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 12))}
                className="w-full text-[15px] font-medium text-[#1A1A1A] placeholder:text-[#BFBFBF] border-b border-[#D9D9D9] pb-3 outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-5 pb-8">
        <button
          onClick={handleNext}
          className={`w-full h-12 rounded-md font-semibold text-base text-white transition-colors ${
            isFormValid
              ? 'bg-[#1A1A1A] hover:bg-[#333333]'
              : 'bg-[#A6A6A6] cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default ProfileSetupPage;