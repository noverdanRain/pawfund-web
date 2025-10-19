import { mysqlTable, serial, text, varchar, timestamp, bigint } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
	id: serial("id").primaryKey(),
	address: varchar("address", { length: 255 }).notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const fundraisersTable = mysqlTable("fundraisers", {
	id: serial("id").primaryKey(),
	usersId: bigint("users_id", { mode: "number", unsigned: true })
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
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

export const campaignsTable = mysqlTable("campaigns", {
	id: serial("id").primaryKey(),
	fundraisersId: bigint("fundraisers_id", { mode: "number", unsigned: true })
		.notNull()
		.references(() => fundraisersTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
	address: varchar("address", { length: 255 }).notNull().unique(),
	title: varchar("title", { length: 255 }).notNull(),
	imageUrl: varchar("image_url", { length: 255 }).notNull(),
	shortDescription: text("short_description").notNull(),
	story: text("story").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const messageSignersTable = mysqlTable("message_signers", {
	id: serial("id").primaryKey(),
	address: varchar("address", { length: 255 }).notNull().unique(),
	message: text("message").notNull(),
});
