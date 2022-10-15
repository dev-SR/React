import React, { useState, useEffect } from 'react';
import axios from 'axios';
type CurrentUserProps = {
	children: React.ReactNode;
};
const CurrentUserLoader = ({ children }: CurrentUserProps) => {
	const [user, setUser] = useState<{ name: string; id: number } | null>(null);
	useEffect(() => {
		const loadUser = async () => {
			const { data } = await axios.get('http://localhost:3500/users/1');
			console.log(data);

			setUser(data);
		};
		loadUser();
	}, []);

	return (
		<>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child as React.ReactElement, { user });
				}
				return child;
			})}
		</>
	);
};

export default CurrentUserLoader;
