import { ReactNode } from 'react';
import style from './index.module.css';
import SearchLayout from './components/searchLayout';
export default function Home() {
	return <h1 className={style.h1}>index</h1>;
}

Home.getLayout = (page: ReactNode) => {
	return <SearchLayout>{page}</SearchLayout>;
};
