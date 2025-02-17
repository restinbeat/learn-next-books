import { notFound } from 'next/navigation';
import style from './page.module.css';
import { ReviewData } from '@/types';
import ReviewItem from '@/components/ReviewItem';
import { ReviewEditor } from '@/components/ReviewEditor';

// generateStaticParams 이외의 페이지 이동시 자동으로 not-found
// export const dynamicParams = false;

export function generateStaticParams() {
  // 문자열로 데이터 명시해줘야함
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    await response.json();

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const searchParams = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={searchParams.id} />
      <ReviewEditor bookId={searchParams.id} />
      <ReviewList bookId={searchParams.id} />
    </div>
  );
}
