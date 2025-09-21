import Image from 'next/image';

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  author: string;
  createdAt: string;
  imageUrl?: string;
}

interface PostItemProps {
  post: Post;
  isFirst?: boolean;
}

export default function PostItem({ post, isFirst = false }: PostItemProps) {
  const containerClasses = `flex justify-center items-center px-3 py-4 bg-white ${
    !isFirst ? 'border-t border-zinc-200' : ''
  }`;

  return (
    <div className={containerClasses}>
      <div className="w-60 flex flex-col justify-start items-start gap-2">
        <div className="inline-flex justify-start items-center gap-1 text-zinc-400 text-xs font-semibold">
          <Image src="/icons/music.svg" alt="큐레이션" width={12} height={12} />
          <span>큐레이션글</span>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <h3 className="self-stretch text-zinc-900 text-sm font-semibold truncate">
            {post.title}
          </h3>
          <p className="self-stretch text-neutral-400 text-xs font-semibold truncate">
            {post.content}
          </p>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <div className="self-stretch flex items-center gap-1">
            {post.tags.map((tag) => (
              <span key={tag} className="text-zinc-400 text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
          <div className="self-stretch flex items-center gap-3 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-0.5 text-blue-900">
              <Image src="/icons/heart.svg" alt="좋아요" width={12} height={12} />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-0.5 text-blue-900">
              <Image src="/icons/message.svg" alt="댓글" width={12} height={12} />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>{post.createdAt}</span>
              <span className="w-px h-2 bg-zinc-300" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </div>
      {post.imageUrl ? (
        <div className="w-24 h-24 bg-zinc-300 rounded-lg ml-4 flex items-center justify-center">
          {/* 외부 이미지를 주석 처리합니다.
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={96}
            height={96}
            className="rounded-lg object-cover w-full h-full"
          />
          */}
          <span className="text-xs text-gray-500">이미지</span>
        </div>
      ) : (
        <div className="w-24 h-24 ml-4"></div> // 이미지가 없을 때 공간을 차지하도록 빈 div 추가
      )}
    </div>
  );
}
