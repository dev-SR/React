import React from 'react';
type CodeOutputProps = {
	children: React.ReactNode;
};

const CodeOutput = ({ children }: CodeOutputProps) => {
	return (
		<div className='py-4 rounded-md px-2 m-2 backdrop-blur-sm bg-slate-700/25 border border-white/5'>
			{children}
		</div>
	);
};
export default CodeOutput;
