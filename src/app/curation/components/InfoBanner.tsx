import Image from 'next/image';

export default function InfoBanner() {
    return (
        <div className="px-6 py-7 bg-white flex flex-col items-center gap-3.5 overflow-hidden mb-2.5">
            {/* 작곡가 토크룸 소개 */}
            <div className="relative mt-1 mb-4 -mx-5 bg-white p-5 flex flex-col justify-between h-48">
                <div>
                    <Image src="/icons/curation-logo.svg" alt="큐레이션 로고" width={222} height={68} />
                </div>
                <div className="text-right">
                    <div className="self-stretch text-right justify-center text-neutral-600 text-sm font-semibold font-['Pretendard']">나만의 이야기와 취향을 담아 클래식을 추천하는 공간</div>
                    <div className="self-stretch text-right justify-center text-zinc-300 text-xs font-medium font-['Pretendard'] mt-1">다람쥐 여러분, 누구나 이곳에서 큐레이터가 될 수 있습니다.<br />자신의 이야기를 담아 곡과 음반, 영상을 추천해보세요.</div>
                </div>
            </div>
        </div>
    );
}
