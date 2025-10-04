'use client';

import Image from 'next/image';
import Link from 'next/link';

interface WriteButtonProps {
  board: string;
}

export default function WriteButton({ board }: WriteButtonProps) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <Link 
        href={`/write?board=${board}`}
        className="px-6 py-3 bg-[#293A92] hover:bg-[#1f2d7a] rounded-[100px] shadow-lg inline-flex justify-center items-center gap-1.5 transition-all duration-300 group"
      >
        <div className="w-6 h-6 relative">
          <Image 
            src="/icons/write-white.svg" 
            alt="글쓰기" 
            layout="fill"
            className="group-hover:scale-110 transition-transform"
          />
        </div>
        <div className="text-white text-base font-semibold font-['Pretendard']">글쓰기</div>
      </Link>
    </div>
  );
}
