"use server";

import { db } from "@/db";
import { chat, chatMessage } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const startChat = async (firstMessage: string) => {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Unathorized" };
  const userId = session.user.id;

  const { newChat } = await db.transaction(async (tx) => {
    const [newChat] = await tx
      .insert(chat)
      .values({
        userId,
        title: firstMessage.slice(0, 50),
      })
      .returning();

    await tx.insert(chatMessage).values({
      chatId: newChat.id,
      role: "user",
      content: firstMessage,
    });

    return { newChat };
  });

  revalidatePath("/user", "layout");
  redirect(`/user/chat/${newChat.id}` as Route);
};
