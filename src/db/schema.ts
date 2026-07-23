import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const goal = pgTable(
  "goal",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    targetAmount: integer("target_amount").notNull(),
    currentAmount: integer("current_amount").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deadline: text("deadline"),
  },
  (table) => [index("goal_userId_idx").on(table.userId)],
);

export const goalDeposits = pgTable("goal_deposits", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  goalId: text("goal_id")
    .notNull()
    .references(() => goal.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: text("description"),
});

export const chat = pgTable(
  "chat",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    title: text("title").notNull().default("New chat"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("chat_userId_idx").on(table.userId)],
);

export const chatRole = pgEnum("chat_role", ["user", "assistant"]);

export const chatMessage = pgTable(
  "chat_message",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    chatId: text("chat_id")
      .notNull()
      .references(() => chat.id, { onDelete: "cascade" }),

    role: chatRole("role").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("chatMessage_chatId_idx").on(table.chatId)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  goals: many(goal),
  deposits: many(goalDeposits),
  chats: many(chat),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const goalRelations = relations(goal, ({ one, many }) => ({
  user: one(user, {
    fields: [goal.userId],
    references: [user.id],
  }),
  deposits: many(goalDeposits),
}));

export const goalDepositsRelations = relations(goalDeposits, ({ one }) => ({
  user: one(user, {
    fields: [goalDeposits.userId],
    references: [user.id],
  }),

  goal: one(goal, {
    fields: [goalDeposits.goalId],
    references: [goal.id],
  }),
}));

export const chatRelations = relations(chat, ({ one, many }) => ({
  user: one(user, {
    fields: [chat.userId],
    references: [user.id],
  }),
  messages: many(chatMessage),
}));

export const chatMessageRelations = relations(chatMessage, ({ one }) => ({
  chat: one(chat, {
    fields: [chatMessage.chatId],
    references: [chat.id],
  }),
}));

export type Goal = InferSelectModel<typeof goal>;
export type UserChat = typeof chat.$inferSelect;
