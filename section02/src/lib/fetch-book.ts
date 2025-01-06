import { BookData } from '@/types';

export default async function fetchBook(id: number): Promise<BookData | null> {
	let url = `http://nomad-books-server.vercel.app/book/${id}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error();
		}

		return await response.json();
	} catch (err) {
		console.log(err);
		return null;
	}
}
