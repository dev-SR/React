'use client';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { useTaskStore } from '@/store/task-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Titlemust be at least 2 characters.'
	})
});

import { DataTable } from './data-table';
import { columns } from './columns';

export default function Task() {
	const [open, setOpen] = useState<boolean>(false);
	const tasks = useTaskStore((state) => state.tasks);
	const addTask = useTaskStore((state) => state.addTask);
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: ''
		}
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		addTask(values.title);
		setOpen(false);
	}

	return (
		<div className='flex flex-col min-h-screen mx-20'>
			<div className='my-4'>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant='outline'>+ Add Task</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle> Add Task</DialogTitle>
						</DialogHeader>
						<div>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
									<Button type='submit'>Submit</Button>
								</form>
							</Form>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div>
				<DataTable columns={columns} data={tasks} />
			</div>
		</div>
	);
}
