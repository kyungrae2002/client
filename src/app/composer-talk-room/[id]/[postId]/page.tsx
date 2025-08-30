// app/composer-talk-room/[id]/[postId]/page.tsx

// page 컴포넌트는 props로 params를 받을 수 있습니다.
type PostDetailPageProps = {
  params: {
    id: string;      // 작곡가 ID (URL의 [id] 부분)
    postId: string;  // 게시글 ID (URL의 [postId] 부분)
  };
};

export default function PostDetailPage({ params }: PostDetailPageProps) {
  // 이제 이 두 ID를 사용해서 서버에 데이터를 요청할 수 있습니다.
  const { id: composerId, postId } = params;

  // 예시: fetchPostAndComments(composerId, postId);

  return (
    <div>
      <h1>{composerId} 토크룸의 글 상세 페이지</h1>
      <p>현재 보고 있는 글의 ID는 {postId} 입니다.</p>
      
      {/* 여기에 글의 본문 내용이 들어갑니다. */}
      <article>
        <h2>글 제목</h2>
        <p>글 내용...</p>
      </article>

      <hr />

      {/* 여기에 해당 글의 댓글 목록이 들어갑니다. */}
      <section>
        <h2>댓글</h2>
        {/* 댓글 컴포넌트 (이전에 우리가 만들었던 무한 스크롤 컴포넌트를 활용할 수 있겠죠!) */}
      </section>
    </div>
  );
}