import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ComposerTalkLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#f4f5f7] flex flex-col items-center py-8">
            {/* 상단 타이틀 */}
            <header className="w-[375px] flex items-center px-5 mb-6">
                <Link href="/">
                    <Image src="/icons/back.svg" alt="뒤로가기" width={24} height={24} />
                </Link>
                <div className="flex-grow text-left text-zinc-900 text-base font-semibold font-['Pretendard']">
                    작곡가별 토크룸
                </div>
                <div className="w-6" /> {/* 균형을 위한 빈 공간 */}
            </header>
            <main className="w-[375px] px-5 flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}