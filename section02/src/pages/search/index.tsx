import { useRouter } from 'next/router';

function Page() {
	const router = useRouter();

	const { query } = router.query;
	return <h1>Search {query}</h1>;
}

export default Page;
