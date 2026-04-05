import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";

const sqlite = new Database("./data.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

// Create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_date TEXT NOT NULL,
    pickup_date TEXT NOT NULL,
    package_name TEXT NOT NULL,
    package_price REAL NOT NULL,
    tote_count INTEGER NOT NULL,
    extra_totes INTEGER DEFAULT 0,
    rental_weeks INTEGER DEFAULT 2,
    vacuum_seal_bags INTEGER DEFAULT 0,
    order_notes TEXT,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TEXT NOT NULL
  )
`);
