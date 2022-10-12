export const SplitScreen = ({ children }: { children: React.ReactNode[] }) => {
	const [left, right] = children;

	return (
		<div className='flex flex-row'>
			<div className='w-1/2'>{left}</div>
			<div className='w-1/2'>{right}</div>
		</div>
	);
};

export const LeftHandComponent = ({ props }: { props: any }) => {
	return <div className='bg-red-200 h-20'>Left</div>;
};

export const RightHandComponent = ({ props }: { props: any }) => {
	return <div className='bg-blue-200 h-20'> Right</div>;
};
