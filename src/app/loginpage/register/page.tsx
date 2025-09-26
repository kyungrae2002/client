'use client';

import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import DatePickerWheels from './date';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: ''
  });

  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date>(new Date(2002, 3, 18));
  const [passwordError, setPasswordError] = useState('');
  const [ageError, setAgeError] = useState('');

  // 모든 필드가 유효한지 검증
  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.birthDate !== '' &&
      ageError === '' &&
      formData.email.trim() !== '' &&
      isEmailVerified &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      passwordError === ''
    );
  };

  const handleInputChange = (field:string, value:string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // 비밀번호 확인 검증
    if (field === 'confirmPassword') {
      if (value !== formData.password) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }

    if (field === 'password') {
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSendVerificationCode = () => {
    setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    setIsEmailVerified(true);
  };

  const handleTempDateChange = useCallback((selectedDate: Date) => {
    setTempSelectedDate(selectedDate);
    // 날짜를 선택하면 즉시 formData에 반영
    const formattedDate = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
    handleInputChange('birthDate', formattedDate);

    // 나이 검증
    const today = new Date();
    let age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
      age--;
    }

    if (age < 14) {
      setAgeError('14세 미만입니다.');
    } else {
      setAgeError('');
    }
  }, []);

  const handleDateConfirm = () => {
    const formattedDate = `${tempSelectedDate.getFullYear()}년 ${tempSelectedDate.getMonth() + 1}월 ${tempSelectedDate.getDate()}일`;
    handleInputChange('birthDate', formattedDate);

    // 나이 검증
    const today = new Date();
    let age = today.getFullYear() - tempSelectedDate.getFullYear();
    const monthDiff = today.getMonth() - tempSelectedDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < tempSelectedDate.getDate())) {
      age--;
    }

    if (age < 14) {
      setAgeError('14세 미만입니다.');
    } else {
      setAgeError('');
    }

    setShowBirthDatePicker(false);
  };

  return (
    <div className="relative w-[375px] h-[812px] bg-white mx-auto">
      {/* Header */}
      <div className="absolute left-0 top-0 w-[375px] h-24 flex flex-col items-start">
        <div className="flex flex-col items-center gap-[10px] w-[375px] h-24">
          <div className="flex flex-col items-start w-[375px] h-24">
            {/* Status Bar */}
            <div className="flex flex-col items-start pt-[21px] w-[375px] h-[54px] bg-white">
              {/* Status bar content */}
            </div>
            
            {/* Header Content */}
            <div className="flex flex-col items-start px-5 pb-3 gap-4 w-[375px] h-[42px] bg-white">
              <div className="flex flex-row items-center gap-1 w-[335px] h-[30px]">
                {/* Back Button */}
                <Link href="/loginpage">
                  <button className="w-5 h-5 flex items-center justify-center">
                    <svg width="7" height="15" viewBox="0 0 7 15" fill="none" className="rotate-180">
                      <path d="M1 1L6 7.5L1 14" stroke="#1A1A1A" strokeWidth="2"/>
                    </svg>
                  </button>
                {/* Title */}
                <h1 className="ml-1 h-[19px] font-pretendard font-semibold text-base leading-[19px] flex items-center text-[#1A1A1A]">
                  회원가입
                </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Divider */}
      <div className="absolute left-0 top-[98px] w-[375px] h-[10px] bg-[#F4F5F7]"></div>

      {/* Form Content */}
      <div className="absolute left-5 top-[127px] w-[335px] h-[543px] flex flex-col items-start gap-[30px]">
        
        {/* Name Input */}
        <div className="flex flex-col items-start gap-[15px] w-[335px] h-[65px]">
          <label className="w-[335px] h-[17px] font-pretendard font-semibold text-sm leading-[17px] flex items-center text-[#4C4C4C]">
            이름 입력
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="이름을 입력해주세요"
            className="w-[335px] h-[18px] font-pretendard font-medium text-[15px] leading-[18px] flex items-center text-[#BFBFBF] bg-transparent outline-none"
          />
          <div className="w-[335px] h-0 border-t border-[#D9D9D9]"></div>
        </div>

        {/* Birth Date Input */}
        <div className="flex flex-col items-start gap-[15px] w-[335px] h-[92px]">
          <div className="flex flex-col items-start gap-1 w-[335px] h-[35px]">
            <label className="w-[90px] h-[17px] font-pretendard font-semibold text-sm leading-[17px] flex items-center text-[#4C4C4C]">
              생년월일 입력
            </label>
            <p className="w-[335px] h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-[#BFBFBF]">
              만 14세 미만은 회원가입이 불가합니다
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                // Set tempSelectedDate to current birthDate if it exists
                if (formData.birthDate && !showBirthDatePicker) {
                  const parts = formData.birthDate.match(/(\d+)년 (\d+)월 (\d+)일/);
                  if (parts) {
                    setTempSelectedDate(new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3])));
                  }
                }
                setShowBirthDatePicker(!showBirthDatePicker);
              }}
              className="flex flex-row justify-center items-center px-[14px] py-[14px] gap-[10px] w-[335px] h-[42px] bg-[#F4F5F7] rounded-md"
            >
              <span className={`flex-1 h-[18px] font-pretendard text-[15px] leading-[18px] flex items-center ${formData.birthDate ? 'font-bold text-[#4C4C4C]' : 'font-medium text-[#BFBFBF]'}`}>
                {formData.birthDate || '생년월일을 선택해주세요'}
              </span>
              <div className="w-4 h-4 flex items-center justify-center">
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  className={`transition-transform duration-300 ${showBirthDatePicker ? '-rotate-90' : 'rotate-90'}`}
                >
                  <path d="M1 1L5 6L1 11" stroke="#A6A6A6" strokeWidth="1.5"/>
                </svg>
              </div>
            </button>

            {/* Inline DatePickerWheels - positioned absolutely below button */}
            {showBirthDatePicker && (
              <div className="absolute top-[50px] left-0 w-[335px] z-10 bg-white rounded-[13px] shadow-xl border border-gray-100">
                {/* Header with Done/Cancel buttons */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
                  <button
                    onClick={() => setShowBirthDatePicker(false)}
                    className="text-[#007AFF] font-medium text-base"
                  >
                    취소
                  </button>
                  <span className="font-semibold text-base text-gray-800">
                    생년월일 선택
                  </span>
                  <button
                    onClick={handleDateConfirm}
                    className="text-[#007AFF] font-semibold text-base"
                  >
                    완료
                  </button>
                </div>

                {/* DatePicker */}
                <div className="px-4 py-2">
                  <div className="transform scale-90 origin-center">
                    <DatePickerWheels
                      onDateChange={handleTempDateChange}
                      initialDate={tempSelectedDate}
                    />
                  </div>
                </div>
              </div>
            )}
            {ageError && (
              <div className="w-[335px] h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-red-500 mt-2">
                {ageError}
              </div>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="flex flex-col items-end gap-[15px] w-[335px] h-[148px]">
          <div className="flex flex-col items-start gap-1 w-[335px] h-[34px]">
            <label className="w-[335px] h-4 font-pretendard font-semibold text-sm leading-[17px] flex items-center text-[#4C4C4C] flex-1">
              이메일 입력
            </label>
            <p className="w-[335px] h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-[#BFBFBF]">
              입력한 이메일은 아이디로 활용됩니다.
            </p>
          </div>
          
          <div className="flex flex-row items-end gap-[10px] w-[335px] h-[42px]">
            <div className="flex flex-col items-start gap-3 w-[232px] h-[30px]">
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-[232px] h-[18px] font-pretendard font-medium text-[15px] leading-[18px] flex items-center text-[#4C4C4C] bg-transparent outline-none"
              />
              <div className="w-[231px] h-0 border-t border-[#D9D9D9]"></div>
            </div>
            <button
              onClick={handleSendVerificationCode}
              className="flex flex-row justify-center items-center px-[14px] py-[10px] gap-[10px] w-[94px] h-[42px] bg-[#F4F5F7] rounded-md hover:bg-[#293A92] cursor-pointer"
            >
              <span className="whitespace-nowrap h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-[#A6A6A6] hover:text-[#FFFFFF]">
                인증코드 전송
              </span>
            </button>
          </div>

          {/* Verification Code Input */}
          <div className="flex flex-row items-end gap-[11px] w-[335px] h-[42px]">
            <div className="flex flex-col items-start gap-3 w-[231px] h-[30px]">
              <input
                type="text"
                value={formData.verificationCode}
                onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                placeholder="전송된 인증코드를 입력해주세요"
                className="w-[231px] h-[18px] font-pretendard font-medium text-[15px] leading-[18px] flex items-center text-[#BFBFBF] bg-transparent outline-none"
              />
              <div className="w-[231px] h-0 border-t border-[#D9D9D9]"></div>
            </div>
            <button
              onClick={handleVerifyCode}
              disabled={!isCodeSent}
              className="flex flex-row justify-center items-center px-[14px] py-[10px] gap-[10px] w-[94px] h-[42px] bg-[#F4F5F7] rounded-md hover:bg-[#293A92] cursor-pointer"
            >
              <span className="whitespace-nowrap h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-[#A6A6A6] hover:text-[#FFFFFF]">
                인증코드 확인
              </span>
            </button>
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col items-end gap-[15px] w-[335px] h-[148px]">
          <div className="flex flex-col items-start gap-1 w-[335px] h-[34px]">
            <label className="w-[335px] h-4 font-pretendard font-semibold text-sm leading-[17px] flex items-center text-[#4C4C4C] flex-1">
              비밀번호 입력
            </label>
            <p className="w-[335px] h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-[#BFBFBF]">
              규약 내용 여기에 설명하기
            </p>
          </div>
          
          <div className="flex flex-row items-end gap-[11px] w-[335px] h-[42px]">
            <div className="flex flex-col items-start gap-3 w-[231px] h-[30px]">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="사용할 비밀번호를 입력해주세요"
                className="w-[231px] h-[18px] font-pretendard font-medium text-[15px] leading-[18px] flex items-center text-[#BFBFBF] bg-transparent outline-none"
              />
              <div className="w-[231px] h-0 border-t border-[#D9D9D9]"></div>
            </div>
            <button
              disabled
              className="flex flex-row justify-center items-center px-[14px] py-[10px] gap-[10px] w-[94px] h-[42px] bg-[#F4F5F7] rounded-md hover:bg-[#293A92] cursor-pointer"
            >
              <span className="whitespace-nowrap h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-[#A6A6A6] hover:text-[#FFFFFF]">
                비밀번호 확인
              </span>
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-row items-end gap-[11px] w-[335px] h-[42px]">
            <div className="flex flex-col items-start gap-3 w-[231px] h-[30px]">
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="비밀번호를 한번 더 입력해주세요"
                className="w-[231px] h-[18px] font-pretendard font-medium text-[15px] leading-[18px] flex items-center text-[#BFBFBF] bg-transparent outline-none"
              />
              <div className="w-[231px] h-0 border-t border-[#D9D9D9]"></div>
              {passwordError && (
                <div className="w-[231px] h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-red-500 mt-1">
                  {passwordError}
                </div>
              )}
            </div>
            <button
              disabled
              className="flex flex-row justify-center items-center px-[14px] py-[10px] gap-[10px] w-[94px] h-[42px] bg-[#F4F5F7] rounded-md hover:bg-[#293A92] cursor-pointer"
            >
              <span className="whitespace-nowrap h-[14px] font-pretendard font-medium text-xs leading-[14px] flex items-center text-[#A6A6A6] hover:text-[#FFFFFF]">
                비밀번호 확인
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => {
          if (isFormValid()) {
            // 이용약관 페이지로 이동
            window.location.href = '/loginpage/terms';
          }
        }}
        disabled={!isFormValid()}
        className={`absolute left-1/2 transform -translate-x-1/2 top-[737px] flex flex-row justify-center items-center px-5 py-[5px] gap-[2px] w-[335px] h-12 rounded-md transition-colors duration-200 ${
          isFormValid()
            ? 'bg-[#293A92] cursor-pointer hover:bg-[#1e2c73]'
            : 'bg-[#A6A6A6] cursor-not-allowed'
        }`}
      >
        <div className="w-5 h-5 rotate-180 hidden">
          <svg width="7" height="15" viewBox="0 0 7 15" fill="none">
            <path d="M1 1L6 7.5L1 14" stroke="#F5F5F5" strokeWidth="2"/>
          </svg>
        </div>
        <span className="flex-1 h-[19px] font-pretendard font-semibold text-base leading-[19px] flex items-center text-center text-white">
          다음
        </span>
        <div className="w-5 h-5 rotate-180">
          <svg width="7" height="15" viewBox="0 0 7 15" fill="none">
            <path d="M1 1L6 7.5L1 14" stroke="#FFFFFF" strokeWidth="2"/>
          </svg>
        </div>
      </button>

      {/* Home Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] h-[34px] invisible"></div>
    </div>
  );
};

export default SignupPage;
