import React from 'react';

type UserInfoProps = {
	user: { name: string; id: number } | null;
};

const UserInfo = ({ user }: UserInfoProps) => {
	return (
		<div>
			<h1>User Info</h1>
			{user ? (
				<>
					<p>{user.name}</p>
					<p>{user.id}</p>
				</>
			) : (
				<p>No user found</p>
			)}
		</div>
	);
};
export default UserInfo;
