'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Filters {
    era: string[];
    continent: string[];
}

interface ComposerTalkContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filters: Filters;
    setFilters: (filters: Filters) => void;
    isFilterOpen: boolean;
    setIsFilterOpen: (open: boolean) => void;
    hasActiveFilters: boolean;
    setHasActiveFilters: (active: boolean) => void;
}

const ComposerTalkContext = createContext<ComposerTalkContextType | undefined>(undefined);

export function ComposerTalkProvider({ children }: { children: ReactNode }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Filters>({ era: [], continent: [] });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);

    return (
        <ComposerTalkContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                filters,
                setFilters,
                isFilterOpen,
                setIsFilterOpen,
                hasActiveFilters,
                setHasActiveFilters,
            }}
        >
            {children}
        </ComposerTalkContext.Provider>
    );
}

export function useComposerTalk() {
    const context = useContext(ComposerTalkContext);
    if (context === undefined) {
        throw new Error('useComposerTalk must be used within a ComposerTalkProvider');
    }
    return context;
}