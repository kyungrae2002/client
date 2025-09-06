'use client';

import { useState } from 'react';
import Image from 'next/image';

const composers = [
    { id: 1, name: 'L.V. Beethoven', era: '고전주의' },
    { id: 2, name: 'W.A. Mozart', era: '고전주의' },
    { id: 3, name: 'J.S. Bach', era: '바로크' },
    { id: 4, name: 'F. Chopin', era: '낭만주의' },
    { id: 5, name: 'S. Rachmaninoff', era: '낭만주의' },
];

interface ComposerSearchProps {
    onSelectComposer: (composerName: string) => void;
}

export default function ComposerSearch({ onSelectComposer }: ComposerSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredComposers = composers.filter(composer =>
        composer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-5 bg-white">
            <div className="relative">
                <input
                    type="text"
                    placeholder="작곡가 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Image src="/icons/search.svg" alt="search" width={20} height={20} />
                </div>
            </div>
            <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {filteredComposers.map(composer => (
                    <button
                        key={composer.id}
                        onClick={() => onSelectComposer(composer.name)}
                        className="w-full p-3 text-left rounded-lg flex justify-between items-center transition-colors bg-white hover:bg-gray-50"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                                {/* Placeholder for composer image */}
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{composer.name}</p>
                                <p className="text-xs text-gray-500">{composer.era}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
