// import '@/lib/config';
// import { defineConfig } from 'drizzle-kit';
// // console.log(process.env.DATABASE_URL);

// export default defineConfig({
// 	schema: './db/pg-schema.ts',
// 	out: './drizzle',
// 	dialect: 'postgresql',
// 	dbCredentials: {
// 		url: process.env.DATABASE_URL!
// 	},
// 	verbose: true,
// 	strict: true
// });

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	schema: './db/sqlite-schema.ts',
	out: './drizzle-sqlite',
	dialect: 'sqlite',
	dbCredentials: {
		url: './sqlite.db'
	}
});
