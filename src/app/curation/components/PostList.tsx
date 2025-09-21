import PostItem from './PostItem';

const mockPosts = [
  {
    id: 1,
    title: '제목이 들어갈 자리입니다',
    content: '글 내용이 들어갈 자리입니다. 글 내용은 한줄 제한을 할까말까 두줄도 괜찮은 것 같고',
    tags: ['태그01', '태그02', '태그03'],
    likes: 3,
    comments: 5,
    author: '글쓴이',
    createdAt: '3초전',
    imageUrl: 'https://via.placeholder.com/96',
  },
  {
    id: 2,
    title: '두 번째 큐레이션 글 제목',
    content: '글 미리보기 내용이 들어갈 자리입니다.',
    tags: ['클래식', '피아노', '쇼팽'],
    likes: 12,
    comments: 8,
    author: '다람쥐',
    createdAt: '1분전',
    imageUrl: 'https://via.placeholder.com/96',
  },
  {
    id: 3,
    title: '세 번째 글입니다',
    content: '이 글은 이미지가 없습니다.',
    tags: ['바이올린', '협주곡'],
    likes: 7,
    comments: 2,
    author: '큐레이터',
    createdAt: '5분전',
  },
];

export default function PostList() {
  return (
    <div className="flex flex-col bg-white">
      {mockPosts.map((post, index) => (
        <PostItem key={post.id} post={post} isFirst={index === 0} />
      ))}
    </div>
  );
}
