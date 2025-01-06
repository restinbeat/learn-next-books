import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import style from './SearchLayout.module.css';

function SearchLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const [search, setSearch] = useState('');

	const q = router.query.q as string;

	useEffect(() => {
		setSearch(q || '');
	}, [q]);

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const onSubmit = () => {
		if (!search || q === search) return;
		router.push(`/search?q=${search}`);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSubmit();
		}
	};

	return (
		<div>
			<div className={style.searchbar_container}>
				<input
					type="text"
					value={search}
					placeholder="검색어를 입력하세요 ..."
					onKeyDown={onKeyDown}
					onChange={onChangeSearch}
				/>
				<button onClick={onSubmit}>검색</button>
			</div>
			{children}
		</div>
	);
}

export default SearchLayout;
