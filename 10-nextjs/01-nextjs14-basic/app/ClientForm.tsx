'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { useState } from 'react';
import { createTask } from '@/actions/addTask';
import { addTaskSchema, TAddTaskSchema } from '@/lib/formSchema';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

const ClientForm = () => {
	const [open, setOpen] = useState<boolean>(false);
	const form = useForm<TAddTaskSchema>({
		resolver: zodResolver(addTaskSchema), //client side form validation
		mode: 'onTouched'
	});
	const router = useRouter();

	const onSubmit = async (values: TAddTaskSchema) => {
		const result = await createTask(values);
		if (result.status === 'success') {
			router.refresh();
			toast.success(`Task: '${result.data.title}' added`);
			setOpen(false);
			form.reset();
		} else {
			// server side form validation
			if (Array.isArray(result.error)) {
				result.error.forEach((e) => {
					const fieldName = e.path.join('.') as 'title' | 'description';
					form.setError(fieldName, {
						message: e.message
					});
				});
			} else {
				form.setError('root.serverError', {
					message: result.error
				});
			}
		}
	};
	return (
		<div className='flex flex-col'>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className='w-min'>+ Add Task</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle> Add Task</DialogTitle>
					</DialogHeader>
					<div>
						<Form {...form}>
							<form
								// action={action}
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-8'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder='Add new task' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Textarea placeholder='Add description' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{form.formState.errors.root?.serverError && (
									<Alert variant='destructive'>
										<AlertCircle className='h-4 w-4' />
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>
											{form.formState.errors.root?.serverError.message}
										</AlertDescription>
									</Alert>
								)}
								<Button type='submit' disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? (
										<span className='flex items-center'>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Submitting
										</span>
									) : (
										'Submit'
									)}
								</Button>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ClientForm;
