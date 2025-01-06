import Link from 'next/link';
import { ReactNode } from 'react';
import style from './GlobalLayout.module.css';

function GlobalLayout({ children }: { children: ReactNode }) {
	return (
		<div className={style.container}>
			<header className={style.header}>
				<Link href="/">📚 NOMAD BOOKS</Link>
			</header>
			<main className={style.main}>{children}</main>
			<footer className={style.footer}>제작 @restinbeat</footer>
		</div>
	);
}

export default GlobalLayout;
