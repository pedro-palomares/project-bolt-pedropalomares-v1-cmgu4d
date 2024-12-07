import { lucia } from "lucia";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { sqliteDatabase } from "../db";

export const auth = lucia({
  env: import.meta.env.DEV ? "DEV" : "PROD",
  middleware: "express",
  adapter: betterSqlite3(sqliteDatabase, {
    user: "auth_user",
    session: "user_session",
    key: "user_key"
  }),
  getUserAttributes: (data) => {
    return {
      email: data.email,
      name: data.name
    };
  }
});