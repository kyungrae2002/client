'use client';

import React from 'react';
import Image from 'next/image';
import HeartButton from './heart-button';
import Link from 'next/link';
import { useComposerTalk } from './context';

const cards = [
    {
        id: 1,
        title: '라흐마니노프 토크룸',
        description: '깊은 밤, 진한 낭만을 그리다',
        era: 'medieval',
        continent: 'asia'
    },
    {
        id: 2,
        title: '누군데',
        description: '마음 깊이 파고들다',
        era: 'baroque',
        continent: 'north-america'
    },
    {
        id: 3,
        title: '권건우',
        description: '마음 깊이 파고들다',
        era: 'classical',
        continent: 'europe'
    },
    {
        id: 4,
        title: '다람쥐',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-america'
    },
    {
        id: 5,
        title: '다',
        description: '마음 깊이 파고들다',
        era: 'modern',
        continent: 'africa'
    },
    {
        id: 6,
        title: '람',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-oceania'
    },
    {
        id: 7,
        title: '쥐',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-america'
    },
    {
        id: 8,
        title: '다람',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-america'
    },
    {
        id: 9,
        title: '다쥐',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-america'
    },
    {
        id: 10,
        title: '람쥐',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-america'
    },
    {
        id: 11,
        title: '성공',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-america'
    },
    {
        id: 12,
        title: 'd다람쥐',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-america'
    },
    {
        id: 13,
        title: 'g다람쥐',
        description: '마음 깊이 파고들다',
        era: 'romantic',
        continent: 'south-america'
    },
];

export default function ComposerTalkPage() {
    const { searchTerm, filters } = useComposerTalk();

    const filteredCards = cards.filter((card) => {
        // 검색어 필터링
        const matchesSearch = searchTerm === '' ||
            card.title.toLowerCase().includes(searchTerm.toLowerCase());

        // 시대별 필터링
        const matchesEra = filters.era.length === 0 ||
            filters.era.includes(card.era);

        // 대륙별 필터링
        const matchesContinent = filters.continent.length === 0 ||
            filters.continent.includes(card.continent);

        return matchesSearch && matchesEra && matchesContinent;
    });

    return (
        <div className="relative">

            {/* 작곡가 토크룸 소개 */}
            <div className="relative mt-1 mb-4 -mx-5 bg-white p-5 flex flex-col justify-between h-48">
                <div>
                    <Image src="/icons/logo_토크룸.svg" alt="토크룸 로고" width={195} height={48} />
                </div>
                <div className="text-right">
                    <div className="self-stretch text-right justify-center text-neutral-600 text-sm font-semibold font-['Pretendard']">나만의 이야기와 취향을 담아 클래식을 추천하는 공간</div>
                    <div className="self-stretch text-right justify-center text-zinc-300 text-xs font-medium font-['Pretendard'] mt-1">다람쥐 여러분, 누구나 이곳에서 큐레이터가 될 수 있습니다.<br/>자신의 이야기를 담아 곡과 음반, 영상을 추천해보세요.</div>
                </div>
            </div>

            {/* 카드 목록 (스크롤 영역) */}
            <div className="flex flex-col gap-4 pb-8">
                {filteredCards.length === 0 ? (
                    <div className="text-center py-12">
                        <p className='text-gray-500 text-sm'>검색 결과가 없습니다.</p>
                    </div>
                ) : (
                    filteredCards.map((card) => (
                        <Link key={card.title} href={`/composer-talk-room/${card.id}`}>
                            <div className="p-6 bg-white rounded-2xl shadow-sm flex justify-between items-center gap-5">
                                <div className="flex flex-col gap-0.5 flex-grow">
                                    <div className="text-stone-300 text-xs font-semibold">{card.description}</div>
                                    <div className="text-zinc-900 text-xl font-semibold">{card.title}</div>
                                </div>
                                <HeartButton />
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
};
//이제 데이터를 어떤식으로 받아야하는지 정해야함.
//id를 기준으로 페이지를 넘길건지 slug를 통해 넘길지...