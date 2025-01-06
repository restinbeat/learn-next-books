import { ReactNode } from 'react';
import SearchLayout from '../components/SearchLayout';
import style from './index.module.css';
import BookItem from '../components/BookItem';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// pre-rendering (SSR) start
// export const getServerSideProps = async () => {

// pre-rendering (SSG) start
export const getStaticProps = async () => {
	console.log('index page');
	// 컴포넌트보다 먼저 실행, 컴포넌트에 필요한 데이터 불러오는 함수
	const [books, randomBooks] = await Promise.all([
		fetchBooks(),
		fetchRandomBooks(),
	]);

	return {
		props: {
			books,
			randomBooks,
		},
	};
};

export default function Home({
	books,
	randomBooks,
	// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className={style.container}>
			<section>
				<h3>지금 추천하는 도서</h3>
				{randomBooks.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
			<section>
				<h3>등록된 모든 도서</h3>
				{books.map(book => (
					<BookItem key={book.id} {...book} />
				))}
			</section>
		</div>
	);
}

Home.getLayout = (page: ReactNode) => {
	return <SearchLayout>{page}</SearchLayout>;
};
