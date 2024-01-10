import { ServerParamsProps } from '@/lib/types/common';

export default function Product(params: ServerParamsProps) {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
				Product {params.params.id}
			</div>
		</main>
	);
}
