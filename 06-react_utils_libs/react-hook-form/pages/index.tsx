import { TextInput, Checkbox, Button, Group, Box, Flex, Radio } from '@mantine/core';
import { z } from 'zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '../components/Layout';

const FormSchema = z.object({
	name: z.string().min(4, 'Name must be at least 4 characters'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must have at least 8 characters'),
	termsOfService: z.literal(true, {
		invalid_type_error: 'You must accept Terms and Conditions.'
	}),
	radio_option: z
		.string({ invalid_type_error: 'Please select option.' })
		.refine((val) => options.map((option) => option.id).includes(val))
});
type FormSchemaType = z.infer<typeof FormSchema>;

const options = [
	{
		id: 'react',
		label: 'React'
	},
	{
		id: 'vue',
		label: 'Vue'
	},
	{
		id: 'angular',
		label: 'Angular'
	}
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

	const onSubmit: SubmitHandler<FormSchemaType> = (data) =>
		window.alert(JSON.stringify(data, null, 4));

	return (
		<Layout>
			<form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-full px-4 md:w-1/3'>
				<Flex direction={'column'} gap='sm'>
					<TextInput
						withAsterisk
						label='Name'
						placeholder='Name'
						{...register('name')}
						error={errors.name && errors.name.message}
					/>
					<TextInput
						withAsterisk
						label='Email'
						placeholder='Email'
						{...register('email')}
						error={errors.email && errors.email.message}
					/>
					<TextInput
						withAsterisk
						label='Password'
						placeholder='Password'
						{...register('password')}
						error={errors.password && errors.password.message}
					/>
					<Controller
						name='radio_option'
						control={control}
						render={({ field }) => (
							<Radio.Group
								label='Select your favorite framework/library'
								description='This is anonymous'
								withAsterisk
								spacing='xs'
								name='radio_option'
								{...(field as any)}
								error={errors.radio_option && errors.radio_option.message}>
								{options.map((option) => (
									<Radio key={option.id} value={option.id} label={option.label} />
								))}
							</Radio.Group>
						)}
					/>
					<Checkbox
						label='I agree to sell my privacy'
						{...register('termsOfService')}
						error={errors.termsOfService && errors.termsOfService.message}
					/>
					<Group position='right'>
						<Button
							type='submit'
							style={{
								fontWeight: 400
							}}>
							Submit
						</Button>
					</Group>
				</Flex>
			</form>
		</Layout>
	);
}

export default Demo;
