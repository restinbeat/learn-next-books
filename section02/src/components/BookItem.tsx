import type { BookData } from '@/types';
import Link from 'next/link';
import style from './BookItem.module.css';

function BookItem({
	id,
	title,
	subTitle,
	author,
	publisher,
	description,
	coverImgUrl,
}: BookData) {
	return (
		<Link href={`/book/${id}`} className={style.container}>
			<img src={coverImgUrl} />
			<div>
				<div className={style.title}>{title}</div>
				<div className={style.subtle}>{subTitle}</div>
				<br />
				<div className={style.author}>
					{author} | {publisher}
				</div>
			</div>
		</Link>
	);
}

export default BookItem;
