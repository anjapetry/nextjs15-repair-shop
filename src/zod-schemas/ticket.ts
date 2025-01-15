import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod";

export const insertTicketSchema = createInsertSchema(tickets).extend({
  id: z.union([z.number(), z.literal("(New)")]),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tech: z.string().email("Invalid email address"),
});

export const selectTicketSchema = createSelectSchema(tickets);

export type InsertTicketSchema = z.infer<typeof insertTicketSchema>;
export type SelectTicketSchema = z.infer<typeof selectTicketSchema>;
