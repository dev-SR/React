import React from 'react';

function printProps<P>(Component: React.ComponentType<P>) {
	return (props: any) => {
		console.log(props);
		return <Component {...props} />;
	};
}

export default printProps;
