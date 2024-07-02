'use client';
import React, { useState, ReactElement } from 'react';
import { IoMdRefresh } from 'react-icons/io';

type ContainerProps = {
	children: ReactElement;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleRefresh = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

	return (
		<div className='border-2 border-gray-500 p-8 m-4 rounded-lg relative w-min'>
			<button onClick={handleRefresh} className='absolute right-0 top-0'>
				<IoMdRefresh className='w-6 h-6' />
			</button>
			{React.cloneElement(children, { key: refreshKey })}
		</div>
	);
};

export default Container;
