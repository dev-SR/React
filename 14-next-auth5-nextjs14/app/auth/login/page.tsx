'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema, LoginSchema } from '@/lib/schemas/auth';
import { PasswordInput } from '@/components/ui/password-input';
import Link from 'next/link';
import { useEffect } from 'react';

const LoginUser = () => {
	// 1. Define your form.
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	});

	// 2. Define a submit handler.
	function onSubmit(values: LoginSchema) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		alert(JSON.stringify(values, null, 2));
	}

	useEffect(() => {
		form.setFocus('email');
	}, [form]);

	return (
		<Card className='container w-full sm:w-2/3 lg:w-5/12 mt-6'>
			<CardHeader>
				<CardTitle>Login From</CardTitle>
				<CardDescription>Enter your details to login</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='example@gmail.com' {...field} type='email' />
									</FormControl>
									{/* <FormDescription>Enter your email</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										{/* <Input placeholder='*******' {...field} type='password' /> */}
										<PasswordInput placeholder='*******' {...field} />
									</FormControl>
									{/* <FormDescription>Enter your password</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>

						<p className='text-sm font-medium'>
							Don&apos;t have an account?
							<Link href='/auth/register'>
								<span className='ml-2 font-bold underline text-primary'>register</span>
							</Link>
						</p>

						<Button type='submit'>Login</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default LoginUser;
