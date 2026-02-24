import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const trips = sqliteTable("trips", {
  id: text("id").primaryKey(),              // uuid想定
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  startDate: text("start_date").notNull(),  // YYYY-MM-DD
  endDate: text("end_date").notNull(),
  status: text("status").notNull(),         // planned/ongoing/finished
  budget: integer("budget"),
  memo: text("memo"),
  createdAt: integer("created_at").notNull(), // unix ms
  updatedAt: integer("updated_at").notNull(),
});

export const plans = sqliteTable("plans", {
  id: text("id").primaryKey(),
  tripId: text("trip_id").notNull(),
  date: text("date").notNull(),           // YYYY-MM-DD
  time: text("time"),                     // "HH:MM" 任意
  place: text("place").notNull(),
  note: text("note"),
  cost: integer("cost"),
  order: integer("order").notNull(),
  createdAt: integer("created_at").notNull(),
});