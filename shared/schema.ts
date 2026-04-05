import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  deliveryDate: text("delivery_date").notNull(),
  pickupDate: text("pickup_date").notNull(),
  packageName: text("package_name").notNull(),
  packagePrice: real("package_price").notNull(),
  toteCount: integer("tote_count").notNull(),
  extraTotes: integer("extra_totes").default(0),
  rentalWeeks: integer("rental_weeks").default(2),
  vacuumSealBags: integer("vacuum_seal_bags").default(0),
  orderNotes: text("order_notes"),
  totalPrice: real("total_price").notNull(),
  status: text("status").default("pending"),
  createdAt: text("created_at").notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
