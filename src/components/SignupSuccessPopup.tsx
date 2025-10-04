import Image from 'next/image';

interface SignupSuccessPopupProps {
  onConfirm: () => void;
}

const SignupSuccessPopup = ({ onConfirm }: SignupSuccessPopupProps) => {
  return (
    <>
      {/* Main popup container */}
      <div
        className="
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
          flex w-[315px] h-[266px] flex-col items-center justify-center
          gap-[12px] rounded-[20px] bg-white p-[18px_28px] shadow-xl
        "
      >
        {/* Confetti Image */}
        <Image
          src="/icons/confetti 1.png"
          alt="Confetti"
          width={165}
          height={130}
          priority
        />

        {/* Text Content Wrapper */}
        <div className="flex flex-col items-center justify-center gap-[2px] self-stretch">
          <h2 className="text-center font-semibold text-[19px] leading-[24px] text-[#4C4C4C]">
            회원가입이 완료되었습니다
          </h2>
          <p className="text-center font-semibold text-[11px] leading-[16px] text-[#BFBFBF]">
            클래식 듣는 다람쥐의 회원이 되신 것을 환영합니다!
          </p>
        </div>

        {/* Confirmation Button */}
        <button
          onClick={onConfirm}
          className="
            flex h-[30px] w-full flex-row items-center justify-center
            gap-[1px] self-stretch rounded-full bg-[#293A92]
            px-[13px] py-[8px] text-[10px] font-semibold leading-[14px] text-white
            hover:bg-opacity-90 transition-colors cursor-pointer
          "
        >
          등록
        </button>
      </div>
    </>
  );
};

export default SignupSuccessPopup;