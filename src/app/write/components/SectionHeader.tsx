// src/app/write/components/SectionHeader.tsx
export const SectionHeader = ({ title }: { title: string }) => (
    <div className="self-stretch px-5 py-3.5 bg-gray-100">
        <p className="text-neutral-600 text-xs font-medium font-['Pretendard']">{title}</p>
    </div>
);
