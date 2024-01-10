export type ServerParamsProps = {
	// https://nextjs.org/docs/app/api-reference/file-conventions/page#props
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};
