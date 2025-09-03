'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Searchbar from './searchbar';
import HeartButton from './heart-button';
import Link from 'next/link';
import Filter from './filter';

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

interface Filters{
    era : string[];
    continent : string[];
}

export default function ComposerTalkPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Filters>({ era: [], continent: [] });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFiltersChange = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    const handleFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleHasActiveFiltersChange = (hasActive: boolean) => {
        setHasActiveFilters(hasActive);
    };

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
            {/* 검색바 */}
            <Searchbar 
                searchTerm={searchTerm} 
                onSearchChange={handleSearchChange}
                onFilterClick={handleFilterToggle}
                hasActiveFilters={hasActiveFilters} />

            {/* 필터 */}
            <Filter onFiltersChange={handleFiltersChange} isOpen={isFilterOpen} onHasActiveFiltersChange={handleHasActiveFiltersChange} />

            {/* 카드 목록 (스크롤 영역) */}
            <div className="flex flex-col gap-4 pb-8">
                {filteredCards.length === 0 ? (
                    <div className="text-center py-12">
                        <p className='text-gray-500 text-sm'>검색 결과가 없습니다.</p>
                    </div>
                ) : (
                filteredCards.map((card) => (
                    <Link key={card.title} href={`/book/${card.id}`}>
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
    )};
//이제 데이터를 어떤식으로 받아야하는지 정해야함.
//id를 기준으로 페이지를 넘길건지 slug를 통해 넘길지...