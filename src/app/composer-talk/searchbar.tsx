// src/app/composer-talk/searchbar.tsx

'use client'; // 클라이언트 컴포넌트로 지정

import React from 'react';
import Image from 'next/image';

// Searchbar 컴포넌트가 받을 props의 타입을 정의합니다.
interface SearchbarProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFilterClick: () => void;
    hasActiveFilters: boolean;
}

export default function Searchbar({ 
    searchTerm, 
    onSearchChange,
    onFilterClick,
    hasActiveFilters
}: SearchbarProps) {
    return (
        <div className="w-full mb-6">
            <div className="flex items-center bg-white rounded-full h-11 px-4 border border-[#d9d9d9]">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="flex-grow bg-transparent outline-none text-sm"
                    value={searchTerm} // 부모로부터 받은 상태를 input 값으로 설정
                    onChange={onSearchChange} // input 값이 변경될 때 부모의 함수를 호출
                />
                <button
                    onClick={onFilterClick}
                    className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-full transition-colors relative"
                >
                    <Image 
                        src={hasActiveFilters ? "/icons/filter_selected.svg" : "/icons/filter.svg"}
                        alt="필터" 
                        width={24} 
                        height={24}
                        className="transition-opacity hover:opacity-70"
                    />
                </button>
            </div>
        </div>
    );
}

