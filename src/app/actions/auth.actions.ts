"use server";

import { z } from "zod";
import { SignInForm, SignUpForm } from "@/types/index";
import bcrypt from "bcryptjs";
import { generateId } from "lucia";
import { db } from "@/db/drizzle";
import { userTable } from "../../../drizzle/db/schema";
import { lucia, validateRequest } from "@/lib/auth";
import { TimeSpan } from "lucia";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const signUp = async (values: z.infer<typeof SignUpForm>) => {
  const hashedPassword = await bcrypt.hash(values.password, 12);
  const userId = generateId(15);
  try {
    await db
      .insert(userTable)
      .values({
        id: userId,
        userName: values.username,
        email: values.email,
        hashedPassword,
        createdAt: new Date(),
      })
      .returning({
        id: userTable.id,
        userName: userTable.userName,
        email: userTable.email,
        createdAt: userTable.createdAt,
      });

    const session = await lucia.createSession(userId, {
      expiresIn: new TimeSpan(2, "h"),
    });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const signIn = async (values: z.infer<typeof SignInForm>) => {
  const [existingUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userName, values.username))
    .limit(1);

  if (!existingUser) {
    return {
      error: "Invalid username or password.",
    };
  }

  if (!existingUser.hashedPassword) {
    return {
      error: "Invalid username or password.",
    };
  }

  const isInvalidPassword = await bcrypt.compare(
    values.password,
    existingUser.hashedPassword
  );

  if (!isInvalidPassword) {
    return {
      error: "Invalid username or password.",
    };
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: new TimeSpan(2, "h"),
  });
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: "Logged in successfully.",
  };
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "unauthentorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
