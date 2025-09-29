'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SearchFilterBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('검색어:', searchTerm);
  };

  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  return (
    <div className="self-stretch py-2.5 bg-white flex justify-center items-center">
      <div className="w-full px-5 inline-flex justify-center items-start gap-1.5">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="px-2.5 py-[5px] bg-gray-100 rounded-[100px] flex justify-start items-center gap-2 overflow-hidden hover:bg-gray-200 transition-colors">
            <input
              type="text"
              placeholder="자유 토크 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium font-['Pretendard'] text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button type="submit" className="w-7 h-7 relative flex items-center justify-center hover:opacity-70 transition-opacity">
              <Image 
                src="/icons/search.svg" 
                alt="검색" 
                width={16} 
                height={16} 
              />
            </button>
          </div>
        </form>
        <button
          onClick={toggleFilter}
          className={`w-10 h-10 rounded-[100px] flex justify-center items-center transition-colors ${
            isFilterActive 
              ? 'bg-[#293A92] hover:bg-[#1f2d7a]' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Image 
            src={isFilterActive ? "/icons/filter_selected.svg" : "/icons/filter.svg"}
            alt="필터" 
            width={16} 
            height={16}
          />
        </button>
      </div>
    </div>
  );
}
