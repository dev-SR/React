import '@/lib/config';
import { defineConfig } from 'drizzle-kit';
// console.log(process.env.DATABASE_URL);

export default defineConfig({
	schema: './db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	verbose: true,
	strict: true
});
