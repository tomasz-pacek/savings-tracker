"use server";

import { db } from "@/db";
import { chat } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";

export const createChat = async () => {
  const session = await getCurrentSession();

  if (!session) {
    return { success: false, error: "Unathorized" };
  }

  const [newChat] = await db
    .insert(chat)
    .values({
      userId: session.user.id,
      title: "New chat",
    })
    .returning({
      id: chat.id,
    });

  return newChat.id;
};
