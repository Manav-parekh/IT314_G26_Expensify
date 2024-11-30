import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core"; 
import { sql } from "drizzle-orm";

// Budgets table definition
export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: integer('amount').notNull(),
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
});

// Expenses table definition
export const Expenses = pgTable("expenses", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: integer('amount').notNull(),
    budgetId: integer('budgetId').references(() => Budgets.id),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
    payment_method: varchar('payment_method', { length: 20 }).notNull().default('Cash'),
});
