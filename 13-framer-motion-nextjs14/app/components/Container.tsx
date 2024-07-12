'use client';
import { cn } from '@/lib/utils';
import React, { useState, ReactElement } from 'react';
import { IoMdRefresh } from 'react-icons/io';

type ContainerProps = {
	children: ReactElement;
	width?: number;
	height?: number;
};

const Container: React.FC<ContainerProps> = ({ children, width, height }) => {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleRefresh = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

	return (
		<div
			className={cn('border-2 border-gray-500 p-8 m-4 rounded-lg relative', !width && 'w-min')}
			style={{
				width: `${width}px`,
				height: `${height}px`
			}}>
			<button onClick={handleRefresh} className='absolute right-0 top-0'>
				<IoMdRefresh className='w-6 h-6' />
			</button>
			{React.cloneElement(children, { key: refreshKey })}
		</div>
	);
};

export default Container;
