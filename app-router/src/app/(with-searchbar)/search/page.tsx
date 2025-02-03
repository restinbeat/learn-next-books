import BookItem from '@/components/BookItem';
import BookListSkeleton from '@/components/skeleton/BookListSkeleton';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

// 특정 페이지에 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : default option, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static :  페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 Static 페이지로 설정 (설정하면 안되는 이유 -> 빌드 오류)
// export const dynamic = 'auto';

async function SearchResult({ q }: { q: String }) {
  // 개발자 도구 3G로 변경해도됌
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense
      key={searchParams.q || ''}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q || ''} />
    </Suspense>
  );
}
