import { mysqlTable, serial, text, varchar, timestamp, bigint } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
	id: serial("id").primaryKey(),
	address: varchar("address", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const fundraisers = mysqlTable("fundraisers", {
	id: serial("id").primaryKey(),
	usersId: bigint("users_id", { mode: "number", unsigned: true })
		.notNull()
		.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	contactPerson: varchar("contact_person", { length: 255 }).notNull(),
	contactPersonPhone: varchar("contact_person_phone", { length: 20 }).notNull(),
	socialUrl: varchar("social_url", { length: 255 }).notNull(),
	imageUrl: varchar("image_url", { length: 255 }).notNull(),
	description: text("description").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
