import PageLayout from '@ui/layout/PageLayout';
import React from 'react';
import { CustomNextPage } from 'types/CustomNextType';

const Products: CustomNextPage = () => {
	return <PageLayout>Products</PageLayout>;
};
Products.auth = true;
export default Products;
