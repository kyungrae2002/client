"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function ScrollButton() {
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 버튼이 나타나는 스크롤 기준을 300px에서 100px로 낮췄습니다.
            if (window.scrollY > 10) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            {showTopButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-white rounded-full shadow-md w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-all duration-200"
                    aria-label="페이지 최상단으로 이동"
                >
                    <Image src="/icons/top.svg" alt="최상단으로" width={24} height={24} />
                </button>
            )}
        </>
    )
};