import { Category } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { prisma } from '../../prisma';
import { Box, Button, Group, Pagination, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// order category by updatedAt
	const categories = await prisma.category.findMany({
		orderBy: {
			updatedAt: 'desc'
		}
	});

	return {
		props: {
			categories: JSON.parse(JSON.stringify(categories))
		}
	};
}

const Category = ({ categories }: { categories: Category[] }) => {
	const [activePage, setPage] = useState(1);
	const pageLimit = 5;
	const rows = categories
		.slice((activePage - 1) * pageLimit, activePage * pageLimit)
		.map((category) => (
			<tr key={category.name}>
				<td>{category.name}</td>
			</tr>
		));
	const form = useForm({
		initialValues: {
			email: '',
			termsOfService: false
		}
	});

	return (
		<Layout>
			<div className='flex flex-col space-y-4'>
				<Box sx={{ maxWidth: 300 }} mx='auto'>
					<form onSubmit={form.onSubmit((values) => console.log(values))}>
						<TextInput
							label='Add a category'
							placeholder='your@email.com'
							{...form.getInputProps('email')}
						/>
						<Group position='right' mt='md'>
							<Button type='submit'>Submit</Button>
						</Group>
					</form>
				</Box>
				<Table fontSize='md' striped highlightOnHover withBorder>
					<thead>
						<tr>
							<th>Category Name</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
				<Pagination page={activePage} onChange={setPage} total={10} position='right' />
			</div>
		</Layout>
	);
};

export default Category;
