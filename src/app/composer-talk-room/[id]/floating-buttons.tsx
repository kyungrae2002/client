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
        </>
    );
}