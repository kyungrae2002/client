import Image from 'next/image';
import Link from 'next/link';
import './globals.css';
import ScrollButton from '@/components/scroll_button';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className="min-h-screen bg-gray-100 flex justify-center">
                {/* max-w-[375px]: 최대 너비를 iPhone mini 사이즈(375px)로 정확히 제한 */}
                <div className="w-full max-w-[375px] min-h-screen flex flex-col bg-white shadow-lg">
                    {/* 헤더 */}
                    <header className="w-full flex justify-between items-center p-4 border-b">
                        <Link href="/" className="flex items-center">
                            <Image src="/icons/logo.svg" alt="다람쥐 로고" width={120} height={40} />
                        </Link>

                        <div className="flex items-center space-x-4">
                            <Link href="/notification">
                                <Image src="/icons/alarm.svg" alt="알림" width={24} height={24} />
                            </Link>
                            <Link href="/loginpage">
                                <Image src="/icons/profile.svg" alt="프로필" width={32} height={32} />
                            </Link>
                        </div>
                    </header>

                    {/* 페이지 콘텐츠 (children) */}
                    <main className="w-full flex-1">
                        {children}
                    </main>
                    <ScrollButton />
                </div>
            </body>
        </html>
    );
}