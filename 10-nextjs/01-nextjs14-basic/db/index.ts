// import '@/lib/config';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from './pg-schema';

// const queryClient = postgres(process.env.DATABASE_URL!);
// export const db = drizzle(queryClient, { schema });

/*
SQL LITE
*/

import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);
