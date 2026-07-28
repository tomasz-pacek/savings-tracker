"use server";

import { db } from "@/db";
import { chat, chatMessage } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { Route } from "next";
import { redirect } from "next/navigation";

export const startChat = async (firstMessage: string) => {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Unathorized" };
  const userId = session.user.id;

  const [newChat] = await db
    .insert(chat)
    .values({
      userId,
      title: firstMessage.slice(0, 50),
    })
    .returning();

  await db.insert(chatMessage).values({
    chatId: newChat.id,
    role: "user",
    content: firstMessage,
  });

  redirect(`/user/chat/${newChat.id}` as Route);
};
