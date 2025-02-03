import BookItemSkeleton from './BookItemSkeleton';

function BookListSkeleton({ count }: { count: number }) {
  return (
    <div>
      {new Array(count).fill(0).map((_, idx) => (
        <BookItemSkeleton key={`book-item-skeleton-${idx}`} />
      ))}
    </div>
  );
}

export default BookListSkeleton;
