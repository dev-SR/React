import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import data from '../data.json';
type Product = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};
const Products = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const productName = searchParams.get('product');
	const minPrice = searchParams.get('minPrice');
	const maxPrice = searchParams.get('maxPrice');

	console.log(productName, minPrice, maxPrice);

	return (
		<div>
			<ul>
				{data.products.map((product: Product) => (
					<li key={product.id}>
						<Link to={`/products/${product.id}`} className='underline'>
							{product.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Products;
