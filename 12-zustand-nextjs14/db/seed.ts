import { faker } from '@faker-js/faker';
import { User } from './schema';
import { db } from './drizzle';
import { exit } from 'process';

const main = async () => {
	const data: (typeof User.$inferInsert)[] = [];

	for (let i = 0; i < 2; i++) {
		data.push({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			role: 'admin'
		});
	}

	console.log('Seed start');
	await db.insert(User).values(data);
	console.log('Seed done');
	exit(0);
};

main();
