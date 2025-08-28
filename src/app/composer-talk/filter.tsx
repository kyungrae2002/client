'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface FilterProps {
    onFiltersChange: (filters: { era: string[]; continent: string[] }) => void;
    isOpen: boolean;
    onHasActiveFiltersChange?: (hasActive: boolean) => void;
}

const eraFilters = [
    { id: 'medieval', label: '중세/르네상스' },
    { id: 'baroque', label: '바로크' },
    { id: 'classical', label: '고전주의' },
    { id: 'romantic', label: '낭만주의' },
    { id: 'modern', label: '근현대' },
];

const continentFilters = [
    { id: 'asia', label: '아시아' },
    { id: 'north-america', label: '북아메리카' },
    { id: 'europe', label: '유럽' },
    { id: 'south-america', label: '남아메리카' },
    { id: 'africa', label: '아프리카' },
    { id: 'oceania', label: '오세아니아' },
];

export default function Filter({ onFiltersChange, isOpen, onHasActiveFiltersChange }: FilterProps) {
    const [selectedEras, setSelectedEras] = useState<string[]>([]);
    const [selectedContinents, setSelectedContinents] = useState<string[]>([]);

    const handleEraToggle = (eraId: string) => {
        const newSelectedEras = selectedEras.includes(eraId)
            ? selectedEras.filter(id => id !== eraId)
            : [...selectedEras, eraId];
        
        setSelectedEras(newSelectedEras);
        onFiltersChange({
            era: newSelectedEras,
            continent: selectedContinents
        });
        
        // 활성 필터 존재 여부 업데이트
        const hasActive = newSelectedEras.length > 0 || selectedContinents.length > 0;
        onHasActiveFiltersChange?.(hasActive);
    };

    const handleContinentToggle = (continentId: string) => {
        const newSelectedContinents = selectedContinents.includes(continentId)
            ? selectedContinents.filter(id => id !== continentId)
            : [...selectedContinents, continentId];
        
        setSelectedContinents(newSelectedContinents);
        onFiltersChange({
            era: selectedEras,
            continent: newSelectedContinents
        });
        
        // 활성 필터 존재 여부 업데이트
        const hasActive = selectedEras.length > 0 || newSelectedContinents.length > 0;
        onHasActiveFiltersChange?.(hasActive);
    };

    const removeFilter = (type: 'era' | 'continent', filterId: string) => {
        if (type === 'era') {
            const newSelectedEras = selectedEras.filter(id => id !== filterId);
            setSelectedEras(newSelectedEras);
            onFiltersChange({
                era: newSelectedEras,
                continent: selectedContinents
            });
            
            // 활성 필터 존재 여부 업데이트
            const hasActive = newSelectedEras.length > 0 || selectedContinents.length > 0;
            onHasActiveFiltersChange?.(hasActive);
        } else {
            const newSelectedContinents = selectedContinents.filter(id => id !== filterId);
            setSelectedContinents(newSelectedContinents);
            onFiltersChange({
                era: selectedEras,
                continent: newSelectedContinents
            });
            
            // 활성 필터 존재 여부 업데이트
            const hasActive = selectedEras.length > 0 || newSelectedContinents.length > 0;
            onHasActiveFiltersChange?.(hasActive);
        }
    };

    const getFilterLabel = (type: 'era' | 'continent', filterId: string) => {
        const filters = type === 'era' ? eraFilters : continentFilters;
        return filters.find(filter => filter.id === filterId)?.label || '';
    };

    const totalActiveFilters = selectedEras.length + selectedContinents.length;

    return (
        <div className="w-full mb-4">
            {/* 활성화된 필터 표시 */}
            {totalActiveFilters > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedEras.map(eraId => (
                        <div
                            key={`era-${eraId}`}
                            className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-full text-sm"
                        >
                            <span>{getFilterLabel('era', eraId)}</span>
                            <button
                                onClick={() => removeFilter('era', eraId)}
                                className="ml-1 text-white hover:text-gray-300"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    {selectedContinents.map(continentId => (
                        <div
                            key={`continent-${continentId}`}
                            className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-full text-sm"
                        >
                            <span>{getFilterLabel('continent', continentId)}</span>
                            <button
                                onClick={() => removeFilter('continent', continentId)}
                                className="ml-1 text-white hover:text-gray-300"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 필터 옵션들 */}
            {isOpen && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                    {/* 시대별 필터 */}
                    <div className="mb-6">
                        <h3 className="text-gray-400 text-xs font-medium mb-3">시대별</h3>
                        <div className="flex flex-wrap gap-2">
                            {eraFilters.map(filter => (
                                <button
                                    key={filter.id}
                                    onClick={() => handleEraToggle(filter.id)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                        selectedEras.includes(filter.id)
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 대륙별 필터 */}
                    <div>
                        <h3 className="text-gray-400 text-xs font-medium mb-3">대륙별</h3>
                        <div className="flex flex-wrap gap-2">
                            {continentFilters.map(filter => (
                                <button
                                    key={filter.id}
                                    onClick={() => handleContinentToggle(filter.id)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                        selectedContinents.includes(filter.id)
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}