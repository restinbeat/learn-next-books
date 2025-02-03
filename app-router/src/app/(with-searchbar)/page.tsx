import BookItem from '@/components/BookItem';
import style from './page.module.css';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import BookListSkeleton from '@/components/skeleton/BookListSkeleton';

async function Books() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' }
    /*
      next.js (data cache)

      { cache: 'force-cache' }
      { cache: 'no-store' } : cache skip
      { next: { revalidate: 10 } } : *s re fetch
      { next: { tags: ['a'] } } : on-demand revalidate (요청이 들어왔을 때 최신화)

     */
  );
  const books: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RandomBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  const randomBooks: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div>
      {randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RandomBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <Books />
        </Suspense>
      </section>
    </div>
  );
}
