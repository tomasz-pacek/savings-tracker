import { db } from "@/db";
import { Chat, chat } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const getUserChats = async (userId: string): Promise<Chat[]> => {
  return db
    .select()
    .from(chat)
    .where(eq(chat.userId, userId))
    .orderBy(desc(chat.createdAt));
};
