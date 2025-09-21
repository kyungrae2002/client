'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FloatingButtons() {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-10 right-1/2 translate-x-[180px] z-10 flex flex-col gap-2">
       <button 
        onClick={() => router.push('/write')}
        className="px-6 py-3 bg-blue-900 rounded-full shadow-lg flex items-center gap-1.5"
      >
        <Image src="/icons/write-white.svg" alt="글쓰기" width={24} height={24} />
        <span className="text-white text-base font-semibold">글쓰기</span>
      </button>
      <button
        onClick={scrollToTop}
        className="p-3 bg-white rounded-full shadow-lg"
      >
        <Image src="/icons/top.svg" alt="맨 위로" width={24} height={24} />
      </button>
    </div>
  );
}
