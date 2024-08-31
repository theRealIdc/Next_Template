import { z } from "zod";

export const SignInForm = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(8, "Your password must be at least 8 characters long.")
    .max(50)
    .min(1),
});

export const SignUpForm = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email("Doit être un email valide.").max(100).min(1),
    password: z
      .string()
      .min(8, "Your password must be at least 8 characters long.")
      .max(50)
      .min(1),
    confirmPassword: z
      .string()
      .min(8, "Your password must be at least 8 characters long.")
      .max(50)
      .min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
