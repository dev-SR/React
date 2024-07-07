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
import { loginAction } from '@/actions/auth/loginUser';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const LoginUser = () => {
	// 1. Define your form.
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	});

	const router = useRouter();

	const { execute, isExecuting } = useAction(loginAction, {
		onError: ({ error }) => {
			console.log(error);
			if (error.serverError) {
				form.setError('root.serverError', {
					message: error.serverError
				});
			}
			if (error.validationErrors) {
				for (const [key, _] of Object.entries(error.validationErrors)) {
					if (key == 'email' || key == 'password')
						form.setError(key, {
							message: error.validationErrors[key]?._errors?.join(',')
						});
				}
			}
		},
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			router.replace('/');
			router.refresh();
		}
	});

	const onSubmit = (values: LoginSchema) => {
		execute(values);
	};
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
						{form.formState.errors.root?.serverError && (
							<Alert variant='destructive'>
								<AlertCircle className='h-4 w-4' />
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>
									{form.formState.errors.root?.serverError.message}
								</AlertDescription>
							</Alert>
						)}
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

						<Button type='submit' disabled={isExecuting}>
							{isExecuting ? (
								<span className='flex items-center'>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Logging in
								</span>
							) : (
								'Login'
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default LoginUser;
