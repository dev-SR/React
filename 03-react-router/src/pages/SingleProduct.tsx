import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import data from '../data.json';
type Product = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};
const SingleProduct = () => {
	const { productID } = useParams();
	// console.log(productID);

	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		if (productID) {
			const product = data.products.find(
				(product: Product) => product.id === parseInt(productID)
			);
			if (!product) return;
			setProduct(product);
		}
	}, []);

	return (
		<div>
			{product && <p>{product.name}</p>}
			{!product && <p>Product not found</p>}
			<Link to='/products' className='underline'>
				Back to products
			</Link>
		</div>
	);
};

export default SingleProduct;
