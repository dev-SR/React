import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);
	await prisma.products.deleteMany();
	await prisma.category.deleteMany();
	for (let i = 0; i < 10; i++) {
		const category = await prisma.category.create({
			data: {
				name: faker.name.firstName()
			}
		});
		for (let j = 0; j < 10; j++) {
			await prisma.products.create({
				data: {
					name: faker.name.firstName(),
					price: Number(faker.random.numeric(2)),
					categoryId: category.id
				}
			});
		}
	}
	/*
	await prisma.products.create({
			data: {
				name: faker.commerce.productName(),
				price: Number(faker.random.numeric(2)),
				category: {
					create: {
						name: faker.commerce.department()
					}
				}
			}
		});

	*/

	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
