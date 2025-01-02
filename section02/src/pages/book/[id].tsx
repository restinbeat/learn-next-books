import { useRouter } from 'next/router';

function Page() {
	const router = useRouter();
	const { id } = router.query;
	return <h1>Book {id}</h1>;
}

export default Page;
