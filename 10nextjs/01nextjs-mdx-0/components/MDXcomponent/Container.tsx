import React from 'react';
type ContainerProps = { children: React.ReactNode; px: string };
const Container = ({ children, px = 'px-72' }: ContainerProps) => {
	return <div className='max-w-md mx-auto md:max-w-3xl'>{children}</div>;
};
export default Container;
