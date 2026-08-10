import { db } from "@/db";
import { Chat, chat, chatMessage, goal, goalDeposits } from "@/db/schema";
import { and, asc, count, desc, eq, gte } from "drizzle-orm";

type OrderByOptions = "asc" | "desc";

export const getCompletedGoals = async (userId: string) => {
  return db
    .select({ count: count() })
    .from(goal)
    .where(
      and(eq(goal.userId, userId), gte(goal.currentAmount, goal.targetAmount)),
    )
    .then((rows) => rows[0]);
};

export const getUserGoals = async (userId: string) => {
  return db.select().from(goal).where(eq(goal.userId, userId));
};

export const getUserDeposits = async (
  userId: string,
  goalId: string,
  order: OrderByOptions = "desc",
) => {
  return db
    .select()
    .from(goalDeposits)
    .where(
      and(eq(goalDeposits.userId, userId), eq(goalDeposits.goalId, goalId)),
    )
    .orderBy(
      order === "asc"
        ? asc(goalDeposits.createdAt)
        : desc(goalDeposits.createdAt),
    );
};

export const getUserChats = async (userId: string): Promise<Chat[]> => {
  return db
    .select()
    .from(chat)
    .where(eq(chat.userId, userId))
    .orderBy(desc(chat.createdAt));
};

export const getChatHistory = async (
  userId: string,
  chatId: string,
  order: OrderByOptions = "asc",
) => {
  return db
    .select({
      id: chatMessage.id,
      chatId: chatMessage.chatId,
      role: chatMessage.role,
      content: chatMessage.content,
      generationStatus: chatMessage.generationStatus,
      createdAt: chatMessage.createdAt,
    })
    .from(chatMessage)
    .innerJoin(chat, eq(chatMessage.chatId, chat.id))
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
    .orderBy(
      order === "asc"
        ? asc(chatMessage.createdAt)
        : desc(chatMessage.createdAt),
    );
};
