import Header from './components/Header';
import InfoBanner from './components/InfoBanner';
import SearchFilterBar from './components/SearchFilterBar';
import PostList from './components/PostList';
import FloatingButtons from './components/FloatingButtons';

export default function CurationPage() {
  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 min-h-screen relative pb-28">
      <Header />
      <main className="flex flex-col mt-px">
        <InfoBanner />
        <SearchFilterBar />
        <PostList />
      </main>
      <FloatingButtons />
    </div>
  );
}
