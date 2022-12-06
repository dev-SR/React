import { NextComponentType, NextPage } from 'next';
import { AppProps } from 'next/app';

export type CustomAppProps = AppProps & {
	Component: NextComponentType & {
		auth?: boolean;
	};
};
export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
	auth?: boolean;
};
