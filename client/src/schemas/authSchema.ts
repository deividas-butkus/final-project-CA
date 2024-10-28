import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username must be at least 5 characters")
      .max(20, "Username must be no more than 20 characters"),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters")
      .max(20, "Password must be no more than 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*_+]/,
        "Password must contain at least one special character (!@#$%^&*_+)"
      ),
    passwordRepeat: z.string().optional(),
    profileImage: z.instanceof(File).nullable(),
  })
  .refine(
    (data) => data.password === data.passwordRepeat || !data.passwordRepeat,
    {
      message: "Passwords do not match",
      path: ["passwordRepeat"],
    }
  );

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must be no more than 20 characters"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must be no more than 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*_+]/,
      "Password must contain at least one special character (!@#$%^&*_+)"
    ),
});
