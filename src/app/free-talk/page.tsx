'use client';

import Header from './components/Header';
import InfoBanner from './components/InfoBanner';
import SearchFilterBar from './components/SearchFilterBar';
import PostList from './components/PostList';
import WriteButton from '@/components/WriteButton';

export default function FreeTalkPage() {
  return (
    <div className="relative w-full max-w-md mx-auto bg-gray-100 min-h-screen overflow-hidden">
      <div className="w-full inline-flex flex-col justify-start items-center gap-2.5">
        <div className="w-full flex flex-col justify-start items-start">
          <Header />
        </div>
        <InfoBanner />
        <SearchFilterBar />
        <PostList />
      </div>
      <WriteButton board="free-talk" />
    </div>
  );
}
