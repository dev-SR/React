import { z } from 'zod';

export const addTaskSchema = z.object({
	title: z
		.string()
		.max(255, { message: 'Title should be less than 255 characters' })
		.min(3, { message: 'Title should be more than 3 characters' }),
	description: z.string().optional()
});

export type TAddTaskSchema = z.infer<typeof addTaskSchema>;

const productOptionSchema = z
	.object({
		mode: z.enum(['view', 'edit']).default('view'),
		option_name: z
			.string()
			.refine((name) => name.length > 0, { message: 'Required' })
			.refine((name) => name.length > 2, { message: 'Name must be greater than 2 chars' }),
		option_values: z
			.array(
				z.object({
					option_value: z.string()
				})
			)
			.nonempty()
			.superRefine((items, ctx) => {
				// const uniqueItemsCount =
				// 	new Set(items.map((value) => value.option_value.toLowerCase())).size - 1;
				// const totalItem = items.length - 1;
				// // minus 1 to avoid empty field

				// console.log(uniqueItemsCount, totalItem);

				// if (uniqueItemsCount !== totalItem) {
				// 	items.forEach((item, i) => {
				// 		if (totalItem === i) return;
				// 		ctx.addIssue({
				// 			code: z.ZodIssueCode.custom,
				// 			message: 'Duplicate values are not allowed.',
				// 			path: [i, 'option_value']
				// 		});
				// 	});
				// }

				if (items.length === 1) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'At least 1 options value required',
						path: [0, 'option_value']
					});
				}
			})
	})
	.superRefine((item, ctx) => {
		// check empty names
		// if (item.option_values.length < 2) {
		// 	ctx.addIssue({
		// 		code: z.ZodIssueCode.custom,
		// 		message: 'At least 1 options value required',
		// 		path: ['option_values', 0, 'option_value']
		// 	});
		// }
	});
const productVariantSchema = z.object({
	_group_by: z.string(),
	_group_price: z.number({ coerce: true }),
	_group_items: z.array(
		z.object({
			_combination: z.string(),
			optionValues: z.array(
				z.object({
					option_name: z.string(),
					option_value: z.string()
				})
			),
			price: z.number({ coerce: true }),
			quantity: z.number({ coerce: true }),
			sku: z.string().optional(),
			barcode: z.string().optional()
		})
	)
});

export const addProductSchema = z.object({
	title: z
		.string()
		.max(255, { message: 'Title should be less than 255 characters' })
		.min(3, { message: 'Title should be more than 3 characters' }),
	description: z.string().optional(),
	selling_price: z.number({
		coerce: true,
		message: 'Required'
	}),
	dummy_compare_at_price: z
		.number({
			coerce: true,
			message: 'Required'
		})
		.optional(),
	cost: z.number({
		coerce: true,
		message: 'Required'
	}),
	quantity: z.number({
		coerce: true,
		message: 'Required'
	}),
	status: z.enum(['active', 'inactive', 'discontinue']).default('active'),
	sku: z.string().optional(),
	barcode: z.string().optional(),
	weight: z
		.number({
			coerce: true,
			message: 'Required'
		})
		.optional(),
	weight_unit: z.enum(['gm', 'kg', 'lb']).optional(),
	international_shipment: z.boolean().optional(),
	physical_description: z.enum(['physical', 'digital']).optional(),
	categories: z.array(z.string()).nonempty('Please select at least one category'),
	productOptions: z
		.array(productOptionSchema)
		.superRefine((items, ctx) => {
			const uniqueItemsCount = new Set(items.map((value) => value.option_name.toLowerCase())).size;
			// const errorPosition = items.length - 1;
			if (uniqueItemsCount !== items.length) {
				items.forEach((item, i) => {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Duplicate options are not allowed.',
						path: [i, 'option_name']
					});
				});
			}
		})
		.optional(),
	productVariants: z.array(productVariantSchema).optional()
});

export type TAddProduct = z.infer<typeof addProductSchema>;
// export type TProductOption = z.infer<typeof productOptionSchema>;
export type TProductOption = {
	option_values: {
		option_value: string;
	}[];
	mode: 'view' | 'edit';
	option_name: string;
};
[];
export type TProductVariant = z.infer<typeof productVariantSchema>;
