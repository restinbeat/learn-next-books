import { BookData } from '@/types';

export default async function fetchRandomBooks(): Promise<BookData[]> {
	const url = `http://nomad-books-server.vercel.app/book/random`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error();
		}

		return await response.json();
	} catch (err) {
		console.log(err);
		return [];
	}
}
