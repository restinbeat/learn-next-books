import SearchLayout from '../components/SearchLayout';
import { ReactNode } from 'react';
import books from '@/mock/books.json';
import BookItem from '../components/BookItem';
function Page() {
	return (
		<div>
			{books.map(book => (
				<BookItem key={book.id} {...book} />
			))}
		</div>
	);
}

export default Page;

Page.getLayout = (page: ReactNode) => {
	return <SearchLayout>{page}</SearchLayout>;
};
