'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Reusable component for section headers
const SectionHeader = ({ title }: { title: string }) => (
    <div className="self-stretch px-5 py-3.5 bg-gray-100">
        <p className="text-neutral-600 text-xs font-medium">{title}</p>
    </div>
);

export default function WritePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [link, setLink] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('라흐마니노프 이야기');
    const postTypes = ['큐레이션 글', '라흐마니노프 이야기'];

    const isButtonEnabled = title.trim() !== '' && content.trim() !== '';

    const handleRegister = () => {
        if (!isButtonEnabled) return;
        // Logic to submit the post
        console.log({ title, content, hashtags, link });
        // Example: router.push('/success-page');
    };

    const handleSaveDraft = () => {
        // Logic to save the post as a draft
        console.log('Saving draft...');
    };

    return (
        <div className="relative bg-white min-h-screen">
            {/* Header */}
            <header className="bg-white py-2 px-4 flex justify-between items-center border-b sticky top-0 z-10 h-14">
                <button onClick={() => router.back()}>
                    <Image src="/icons/back.svg" alt="뒤로가기" width={24} height={24} />
                </button>
                <h1 className="text-zinc-900 text-base font-semibold absolute left-1/2 -translate-x-1/2">글쓰기</h1>
                <div className="flex items-center gap-1.5">
                    <button onClick={handleSaveDraft} className="px-3 py-1.5 bg-white rounded-full border border-zinc-300 flex justify-center items-center gap-0.5">
                        <span className="text-neutral-400 text-xs font-semibold">임시저장</span>
                        {/* Placeholder for save icon */}
                    </button>
                    <button onClick={handleRegister} disabled={!isButtonEnabled} className={`pl-3.5 pr-3 py-1.5 rounded-full flex justify-center items-center gap-0.5 ${isButtonEnabled ? 'bg-blue-900' : 'bg-gray-300'}`}>
                        <span className="text-white text-xs font-semibold">등록</span>
                        {/* Placeholder for check icon */}
                    </button>
                </div>
            </header>

            {/* Main Form */}
            <main>
                <SectionHeader title="게시글 유형" />
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full self-stretch px-6 py-4 bg-white flex justify-between items-center gap-2 text-left"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 relative flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-blue-900 rounded-full" />
                            </div>
                            <p className="text-zinc-900 text-sm font-semibold">{selectedType}</p>
                        </div>
                        <Image src="/icons/back.svg" alt="dropdown" width={16} height={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-90' : '-rotate-90'}`} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white border-x border-b rounded-b-lg shadow-lg z-20">
                            {postTypes.map((type) => (
                                <div
                                    key={type}
                                    onClick={() => {
                                        setSelectedType(type);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="px-6 py-3 hover:bg-gray-100 cursor-pointer text-sm font-medium"
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <SectionHeader title="게시글 제목" />
                <div className="self-stretch px-5 py-2 bg-white">
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full py-2 text-sm font-medium focus:outline-none placeholder-zinc-300"
                    />
                </div>

                <SectionHeader title="게시글 내용" />
                <div className="self-stretch px-5 py-4 bg-white">
                    <textarea
                        placeholder="작곡가에 대해 같은 음악 취향을 가진 사람들과 나누고픈 이야기를 자유롭게 적어보세요!"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-48 resize-none text-sm font-medium focus:outline-none placeholder-zinc-300"
                    />
                </div>

                <SectionHeader title="해시태그 등록" />
                <div className="self-stretch px-5 py-2 bg-white">
                    <input
                        type="text"
                        placeholder="해시태그 작성 최대 N개"
                        value={hashtags}
                        onChange={(e) => setHashtags(e.target.value)}
                        className="w-full py-2 text-sm font-medium focus:outline-none placeholder-neutral-600"
                    />
                </div>

                <SectionHeader title="콘텐츠 첨부" />
                <div className="w-full px-5 py-4 bg-white flex justify-between items-center gap-3">
                    <input
                        type="text"
                        placeholder="링크 붙여넣기"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 bg-gray-100 rounded-[10px] text-sm font-medium focus:outline-none placeholder-neutral-400"
                    />
                    <button className="w-11 h-11 bg-gray-100 rounded-[10px] flex justify-center items-center">
                        <Image src="/icons/img.svg" alt="이미지 첨부" width={24} height={24} />
                    </button>
                </div>
            </main>
        </div>
    );
}