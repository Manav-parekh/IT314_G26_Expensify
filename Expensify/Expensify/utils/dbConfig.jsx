import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Database connection string
const sql = neon('postgresql://neondb_owner:mLd0ROVfSh3B@ep-patient-mode-a5gw41hr.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require');

// Initialize drizzle ORM with schema
const db = drizzle(sql, { schema });

export { db };
