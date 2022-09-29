import React, { useState } from 'react';

const Cart = () => {
	const [cart, setCart] = useState<string[]>(['item1', 'item2', 'item3']);

	return (
		<div>
			{cart.map((item, index) => {
				return <div key={index}>{item}</div>;
			})}
		</div>
	);
};

export default Cart;
