import {
	TextInput,
	Checkbox,
	Button,
	Group,
	Flex,
	Select,
	ActionIcon,
	CloseButton,
	JsonInput,
	Container,
	Textarea
} from '@mantine/core';
import { z } from 'zod';
import { SubmitHandler, useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../components/Layout';
import React from 'react';
import { SlClose } from 'react-icons/sl';

const elementSchema = z.object({
	category: z
		.string({ invalid_type_error: 'Please select option.' })
		.refine((val) => options.map((option) => option.value).includes(val)),
	filter_value: z.string().min(3, 'Category must be at least 4 characters')
});

const FormSchema = z.object({
	product: z.string().min(4, 'Product Name must be at least 4 characters'),
	termsOfService: z.literal(true, {
		invalid_type_error: 'You must accept Terms and Conditions.'
	}),
	description: z.optional(z.string()),
	filters: z.array(elementSchema)
});
type FormSchemaType = z.infer<typeof FormSchema>;

const options = [
	{ value: 'phone', label: 'Phone' },
	{ value: 'laptop', label: 'Laptop' },
	{ value: 'clothing', label: 'Clothing' }
];
function Demo() {
	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors }
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema)
	});
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'filters' // unique name for your Field Array
	});

	const onSubmit: SubmitHandler<FormSchemaType> = (data) =>
		window.alert(JSON.stringify(data, null, 4));

	console.log(errors);

	return (
		<Layout>
			<form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-full px-4 md:w-1/3'>
				<Flex direction={'column'} gap='sm'>
					<TextInput
						withAsterisk
						label='Product'
						placeholder='Product'
						{...register('product')}
						error={errors.product && errors.product.message}
					/>
					<Textarea
						label='Description'
						placeholder='Description'
						error={errors.description && errors.description.message}
						{...register('description')}
					/>
					<Group position='left'>
						<Button
							color={'pink'}
							onClick={() => {
								append({ category: '', filter_value: '' });
							}}>
							Add Filter
						</Button>
					</Group>
					{fields.map((field, index) => {
						return (
							<Flex gap={'sm'} key={field.id} align='end'>
								<Controller
									name={`filters.${index}.category`}
									rules={{ required: true }}
									control={control}
									render={({ field }) => (
										<Select
											label='Pick a category'
											placeholder='Pick one'
											withAsterisk
											{...(field as any)}
											data={options}
											error={errors.filters?.[index]?.category?.message}
										/>
									)}
								/>
								<TextInput
									withAsterisk
									label='Filter'
									placeholder='Add Filter	Value'
									sx={{ width: '100%' }}
									// {...register('filter_value')}
									// error={errors.filter_value && errors.filter_value.message}
									{...register(`filters.${index}.filter_value`)}
									error={errors.filters?.[index]?.filter_value?.message}
								/>
								<ActionIcon size={'lg'} onClick={() => remove(index)}>
									<SlClose
										style={{
											width: '1.5rem',
											height: '1.5rem',
											color: 'red'
										}}
									/>
								</ActionIcon>
							</Flex>
						);
					})}
					{watch('filters')?.length > 0 && (
						<Group position='left'>
							<Button
								color='gray'
								onClick={() => {
									append({ category: '', filter_value: '' });
								}}>
								Add More Filters
							</Button>
						</Group>
					)}
					<Checkbox
						label='I agree to sell my privacy'
						{...register('termsOfService')}
						error={errors.termsOfService && errors.termsOfService.message}
					/>

					<Button
						type='submit'
						style={{
							fontWeight: 400,
							width: '100%'
						}}>
						Submit
					</Button>
				</Flex>
			</form>
		</Layout>
	);
}

export default Demo;
