'use server';

import { db } from '@/db';
import { products } from '@/db/pg-schema';
import { addProductSchema } from '@/lib/formSchema';
import { AC, ActionError } from '@/lib/safe-action';

export const createProduct = AC.schema(addProductSchema).action(async ({ parsedInput }) => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	if (parsedInput.variantOptions) {
		console.log(JSON.stringify(parsedInput.variantOptions, null, 2));
	}

	// const productExits = await db.query.products.findFirst({
	// 	where: (products, { eq }) => eq(products.title, parsedInput.title)
	// });

	// if (productExits) {
	// 	throw new ActionError('Product already exists');
	// }

	// const [product] = await db.insert(products).values(parsedInput).returning();

	return parsedInput;
});
