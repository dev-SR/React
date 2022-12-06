import PageLayout from '@ui/layout/PageLayout';
import React from 'react';
import { CustomNextPage } from '../types/CustomNextType';

const Categories: CustomNextPage = () => {
	return <PageLayout>Categories</PageLayout>;
};
// set auth to true to protect this page
Categories.auth = true;

export default Categories;
