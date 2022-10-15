import React from 'react';
type DummyProps = {
	username: string;
	userId: number;
};
const Dummy = ({ username, userId }: DummyProps) => {
	return (
		<div>
			{username} {userId}
		</div>
	);
};
export default Dummy;
