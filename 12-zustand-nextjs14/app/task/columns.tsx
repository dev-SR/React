/* eslint-disable */
'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { Task, TaskStatus } from '@/store/task-store';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './page';
import { useMyStore } from '@/store/store';
export const columns: ColumnDef<Task>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		enableHiding: true
	},
	{
		accessorKey: 'title',
		header: 'Title'
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status');
			if (status === 'TODO') {
				return <Badge className='bg-red-500'>todo</Badge>;
			} else if (status === 'IN_PROGRESS') {
				return <Badge className='bg-yellow-500'>in progress</Badge>;
			} else if (status === 'DONE') {
				return <Badge className='bg-green-500'>done</Badge>;
			}
		}
	},
	{
		id: 'action',
		cell: ({ row }) => {
			const rowId = row.getValue('id') as string;
			const currentTitle = row.getValue('title') as string;
			const [statusValue, setStatusValue] = useState<TaskStatus>('TODO');
			const updateStatus = useMyStore((state) => state.updateStatus);
			const updateTitle = useMyStore((state) => state.updateTitle);
			const removeTask = useMyStore((state) => state.removeTask);
			const [open, setOpen] = useState<boolean>(false);

			// 1. Define your form.
			const form = useForm<z.infer<typeof formSchema>>({
				resolver: zodResolver(formSchema),
				defaultValues: {
					title: ''
				}
			});

			// 2. Define a submit handler.
			function onSubmit(values: z.infer<typeof formSchema>) {
				updateTitle(rowId, values.title);
				setOpen(false);
			}
			return (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Open menu</span>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => {
									removeTask(rowId);
								}}>
								<Trash2 className='mr-2 h-4 w-4 ' />
								<span>Delete</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setOpen(true);
									form.setValue('title', currentTitle);
								}}>
								<Edit2 className='mr-2 h-4 w-4 ' />
								Edit
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<span>Change Status</span>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuRadioGroup
											value={statusValue}
											onValueChange={(value) => {
												setStatusValue(value as TaskStatus);
												updateStatus(rowId, value as TaskStatus);
											}}>
											<DropdownMenuRadioItem value='TODO'>
												<Badge className='bg-red-500'>todo</Badge>
											</DropdownMenuRadioItem>
											<DropdownMenuRadioItem value='IN_PROGRESS'>
												<Badge className='bg-yellow-500'>in progress</Badge>
											</DropdownMenuRadioItem>
											<DropdownMenuRadioItem value='DONE'>
												<Badge className='bg-green-500'>done</Badge>
											</DropdownMenuRadioItem>
										</DropdownMenuRadioGroup>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						</DropdownMenuContent>
					</DropdownMenu>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogContent className='sm:max-w-[425px]'>
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
										<Button type='submit'>Update</Button>
									</form>
								</Form>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			);
		}
	}
];
