import { Category, PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { prisma } from '../../prisma';
import { ActionIcon, Box, Button, Group, Modal, Pagination, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// paginate categories
	const page = context.query.page ? parseInt(context.query.page as string) : 1;
	const limit = 5;
	const offset = (page - 1) * limit;
	const [total, categories] = await prisma.$transaction([
		prisma.category.count(),
		prisma.category.findMany({
			skip: offset,
			take: limit,
			orderBy: {
				updatedAt: 'desc'
			},
			include: {
				_count: {
					select: {
						Products: true
					}
				}
			}
		})
	]);
	const nextPage = total > page * limit ? page + 1 : null;
	const prevPage = page > 1 ? page - 1 : null;
	// page count
	const pageCount = Math.ceil(total / limit);

	const res = {
		total,
		categories,
		nextPage,
		prevPage,
		pageCount
	};
	console.log('res', JSON.stringify(res, null, 2));

	return {
		props: JSON.parse(JSON.stringify(res))
	};
}

type ImprovisedCategory = Category & {
	_count: {
		Products: number;
	};
};

type CategoryProps = {
	categories: ImprovisedCategory[];
	total: number;
	nextPage: number | null;
	prevPage: number | null;
	pageCount: number;
};

const Category = ({ categories, ...props }: CategoryProps) => {
	const [isRefreshing, setIsRefreshing] = React.useState(false);
	// Refreshing Server-Side Props
	// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
	const router = useRouter();
	const refreshData = () => {
		router.replace(router.asPath);
		setIsRefreshing(true);
	};
	React.useEffect(() => {
		setIsRefreshing(false);
		toast.dismiss();
	}, [categories]);
	const [opened, setOpened] = useState(false);

	// client-side pagination: Not Recommended for large data
	const [activePage, setPage] = useState(1);
	// change router as page change
	const handlePageChange = (page: number) => {
		setPage(page);
		router.push(`/admin/category?page=${page}`);
	};
	const rows = categories.map((category, index) => (
		<tr key={index}>
			<td>{category.name}</td>
			<td>{category._count.Products}</td>
			<td
				style={{
					width: '10%'
				}}>
				<div className='flex space-x-2'>
					<ActionIcon
						onClick={async () => {
							setOpened(true);
							getCategory(category.id);
						}}>
						<AiOutlineEdit className='h-7 w-7 p-1 text-sky-200 bg-sky-600/30 rounded ' />
					</ActionIcon>
					<ActionIcon
						onClick={async () => {
							toast.loading('Refreshing...');
							await axios.delete(`/api/category/${category.id}`);
							refreshData();
						}}>
						<MdDeleteOutline className='h-7 w-7 p-1 text-red-200 bg-red-600/30 rounded ' />
					</ActionIcon>
				</div>
			</td>
		</tr>
	));
	// register add category form
	const form = useForm<{
		name: string;
	}>({
		initialValues: {
			name: ''
		},
		validate: (values) => ({
			name: values.name.length < 2 ? 'Too short name' : null
		})
	});
	// register edit category form
	const updateForm = useForm<{
		name_update: string;
	}>({
		validate: (values) => ({
			name_update: values.name_update.length < 2 ? 'Too short name' : null
		})
	});

	const handleAdd = async (values: typeof form.values) => {
		toast.loading('Refreshing...');
		await axios.post('/api/category', values);
		form.reset();
		refreshData();
	};

	const [selectedCategory, setSelectedCategory] = useState<{
		id: string;
		data: Category;
	} | null>(null);

	const getCategory = async (id: string) => {
		const category = await axios.get(`/api/category/${id}`);
		setSelectedCategory({
			id,
			data: category.data
		});
		// initialize form values
		updateForm.setValues({
			name_update: category.data.name
		});
	};

	const updateCategory = async (id: string, values: typeof updateForm.values) => {
		toast.loading('Refreshing...');
		await axios.put(`/api/category/${id}`, {
			name: values.name_update
		});
		form.reset();
		refreshData();
	};

	return (
		<Layout>
			<Toaster />
			{/* Product Update Modal */}
			<Modal
				opened={opened}
				onClose={() => {
					setOpened(false);
					selectedCategory && setSelectedCategory(null);
				}}
				overlayBlur={3}
				overlayOpacity={0.55}
				title='Update Product'>
				{selectedCategory && (
					<Box sx={{ maxWidth: 500, minWidth: 350 }} mx='auto'>
						<form
							onSubmit={updateForm.onSubmit((values) => {
								updateCategory(selectedCategory.id, values);
								setOpened(false);
							})}>
							<TextInput {...updateForm.getInputProps('name_update')} />
							<Group position='right' mt='md'>
								<Button type='submit' color={'yellow'}>
									Update
								</Button>
							</Group>
						</form>
					</Box>
				)}
			</Modal>
			{/* Content */}
			<div className='flex flex-col space-y-4'>
				<Box sx={{ maxWidth: 500, minWidth: 350 }} mx='auto'>
					<form onSubmit={form.onSubmit((values) => handleAdd(values))}>
						<TextInput
							label='Add a category'
							placeholder='Category name'
							{...form.getInputProps('name')}
							withAsterisk
						/>
						<Group position='right' mt='md'>
							<Button type='submit'>Add</Button>
						</Group>
					</form>
				</Box>
				{/* table for category list */}
				<Table fontSize='md'>
					<thead>
						<tr>
							<th>Category Name</th>
							<th>Products</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
				{/* control pagination */}
				<Pagination
					page={activePage}
					onChange={handlePageChange}
					total={props.pageCount}
					position='right'
				/>
			</div>
		</Layout>
	);
};

export default Category;
