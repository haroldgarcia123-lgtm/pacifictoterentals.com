import { orders, type Order, type InsertOrder } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createOrder(order: InsertOrder): Order;
  getOrder(id: number): Order | undefined;
  getOrders(): Order[];
}

export class DatabaseStorage implements IStorage {
  createOrder(order: InsertOrder): Order {
    return db.insert(orders).values({
      ...order,
      createdAt: new Date().toISOString(),
    }).returning().get();
  }

  getOrder(id: number): Order | undefined {
    return db.select().from(orders).where(eq(orders.id, id)).get();
  }

  getOrders(): Order[] {
    return db.select().from(orders).all();
  }
}

export const storage = new DatabaseStorage();
