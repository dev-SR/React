import { faker } from '@faker-js/faker';
import { db } from './drizzle';
import { exit } from 'process';
import { Product } from './schema';

const main = async () => {
	const data: (typeof Product.$inferInsert)[] = [];

	for (let i = 0; i < 8; i++) {
		data.push({
			title: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price()
		});
	}

	console.log('Seed start');
	await db.insert(Product).values(data);
	console.log('Seed done');
	exit(0);
};

main();
