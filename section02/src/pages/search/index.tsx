import SearchLayout from '../../components/SearchLayout';
import { ReactNode, useEffect, useState } from 'react';
import BookItem from '../../components/BookItem';
import { BookData } from '@/types';
import { useRouter } from 'next/router';
import fetchBooks from '@/lib/fetch-books';

// export const getServerSideProps = async (
// 	context: GetServerSidePropsContext,
// ) => {
// 	const q = context.query.q;
// 	const books = await fetchBooks(q as string);

// 	return {
// 		props: {
// 			books,
// 		},
// 	};
// };
// function Page({
// 	books,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
function Page() {
	const [books, setBooks] = useState<BookData[]>([]);
	const router = useRouter();
	const q = router.query.q;

	const fetchSearchResult = async () => {
		const data = await fetchBooks(q as string);
		setBooks(data);
	};

	useEffect(() => {
		if (q) {
			fetchSearchResult();
		}
	}, [q]);

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
