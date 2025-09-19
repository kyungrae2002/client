'use client';

import Image from 'next/image';
import { useState } from 'react';

// 임시 데이터
const mockUserData = {
    id: 'user123',
    name: '클래식 다람쥐',
    profileImage: '/images/profile-placeholder.png', // 실제 이미지 경로로 교체 필요
    postCount: 12,
    scrapCount: 34,
    followerCount: 56,
    followingCount: 78,
};

const mockMyPosts = [
    { id: 1, title: '내 첫번째 게시글', thumbnail: '/images/post-thumb-1.png' },
    { id: 2, title: '내 두번째 게시글', thumbnail: '/images/post-thumb-2.png' },
    { id: 3, title: '내 세번째 게시글', thumbnail: '/images/post-thumb-3.png' },
    { id: 4, title: '내 네번째 게시글', thumbnail: '/images/post-thumb-4.png' },
];

const mockScrappedPosts = [
    { id: 101, title: '스크랩한 게시글 1', thumbnail: '/images/scrap-thumb-1.png' },
    { id: 102, title: '스크랩한 게시글 2', thumbnail: '/images/scrap-thumb-2.png' },
];


export default function ProfilePage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState('myPosts');
    // 나중에는 params.id를 사용해 실제 사용자 데이터를 가져옵니다.
    const user = mockUserData; 

    return (
        <div className="w-[375px] mx-auto bg-white min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b h-14">
                <button>
                    <Image src="/icons/back.svg" alt="Back" width={24} height={24} />
                </button>
                <h1 className="absolute text-base font-semibold -translate-x-1/2 left-1/2">
                    마이페이지
                </h1>
                <button>
                    {/* Figma의 설정 아이콘으로 교체 필요 */}
                    <Image src="/icons/filter.svg" alt="Settings" width={24} height={24} />
                </button>
            </header>

            {/* Profile Section */}
            <main className="p-4">
                <section className="flex items-center gap-4 mb-4">
                    <div className="relative w-20 h-20">
                        <Image
                            src={user.profileImage}
                            alt="Profile Picture"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full bg-gray-200" // 이미지 없을 때 배경색
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold">{user.name}</h2>
                    </div>
                </section>

                <section className="flex justify-around p-3 mb-4 text-center bg-gray-50 rounded-lg">
                    <div>
                        <p className="font-bold">{user.postCount}</p>
                        <p className="text-sm text-gray-600">게시글</p>
                    </div>
                    <div>
                        <p className="font-bold">{user.scrapCount}</p>
                        <p className="text-sm text-gray-600">스크랩</p>
                    </div>
                    <div>
                        <p className="font-bold">{user.followerCount}</p>
                        <p className="text-sm text-gray-600">팔로워</p>
                    </div>
                    <div>
                        <p className="font-bold">{user.followingCount}</p>
                        <p className="text-sm text-gray-600">팔로잉</p>
                    </div>
                </section>

                <section className="flex gap-2 mb-4">
                    <button className="flex-1 py-2 text-sm font-semibold text-center text-gray-700 border border-gray-300 rounded-lg">
                        프로필 편집
                    </button>
                    <button className="flex-1 py-2 text-sm font-semibold text-center text-gray-700 border border-gray-300 rounded-lg">
                        사용자 신고
                    </button>
                </section>
            </main>

            {/* Tabs */}
            <nav className="flex border-t border-b">
                <button 
                    onClick={() => setActiveTab('myPosts')}
                    className={`flex-1 py-3 text-center text-sm font-semibold ${activeTab === 'myPosts' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
                >
                    내 게시글
                </button>
                <button 
                    onClick={() => setActiveTab('scraps')}
                    className={`flex-1 py-3 text-center text-sm font-semibold ${activeTab === 'scraps' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
                >
                    스크랩
                </button>
            </nav>

            {/* Tab Content */}
            <div className="p-1">
                {activeTab === 'myPosts' && (
                    <div className="grid grid-cols-3 gap-0.5">
                        {mockMyPosts.map(post => (
                            <div key={post.id} className="relative aspect-square bg-gray-200">
                                <Image src={post.thumbnail} alt={post.title} layout="fill" objectFit="cover" />
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'scraps' && (
                     <div className="grid grid-cols-3 gap-0.5">
                        {mockScrappedPosts.map(post => (
                            <div key={post.id} className="relative aspect-square bg-gray-200">
                                <Image src={post.thumbnail} alt={post.title} layout="fill" objectFit="cover" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}