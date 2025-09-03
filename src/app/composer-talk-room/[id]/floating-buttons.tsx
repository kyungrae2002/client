import Link from 'next/link';
import Image from 'next/image';

export default function FloatingButtons() {
    return (
        <>
            {/* Write Button */}
            <Link href="/write">
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-900 rounded-full shadow-lg flex justify-center items-center gap-1.5 z-10">
                    <Image src="/icons/write-white.svg" alt="글쓰기" width={24} height={24} />
                    <span className="text-white text-base font-semibold">글쓰기</span>
                </div>
            </Link>

            {/* Scroll to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-20 right-5 p-3 bg-white rounded-full shadow-lg z-10"
            >
                <Image src="/icons/top.svg" alt="맨 위로" width={24} height={24} />
            </button>
        </>
    );
}