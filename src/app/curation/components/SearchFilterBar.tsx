import Image from 'next/image';

export default function SearchFilterBar() {
  return (
    <div className="py-2.5 bg-white flex justify-center">
      <div className="w-80 px-2 py-1 bg-gray-100 rounded-full flex items-center justify-between">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="flex-1 bg-transparent px-3 text-sm focus:outline-none"
        />
        <div className="flex">
          <button className="p-1.5">
            <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
          </button>
          <button className="p-1.5">
            <Image src="/icons/filter.svg" alt="Filter" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
