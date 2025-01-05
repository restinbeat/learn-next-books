import { useRouter } from 'next/router';
import SearchLayout from '../components/searchLayout';
import { ReactNode } from 'react';

function Page() {
	const router = useRouter();

	const { q } = router.query;
	return <h1>Search {q}</h1>;
}

export default Page;

Page.getLayout = (page: ReactNode) => {
	return <SearchLayout>{page}</SearchLayout>;
};
