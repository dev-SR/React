import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
	console.log(`Start seeding ...`);
	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	for (let i = 0; i < 40; i++) {
		const post = await prisma.post.create({
			data: {
				title: faker.lorem.sentence(),
				content: faker.lorem.paragraphs()
			}
		});
		// random number of comments between 1 and 5
		const numberOfComments = Math.floor(Math.random() * 5) + 1;
		for (let j = 0; j < numberOfComments; j++) {
			await prisma.comment.create({
				data: {
					content: faker.lorem.sentence(),
					postId: post.id
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
