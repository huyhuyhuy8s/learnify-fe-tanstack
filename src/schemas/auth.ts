import { z } from "zod";

export const signUpStep1Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
});

export const signUpStep2Schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type TSignUpStep1Values = z.infer<typeof signUpStep1Schema>;
export type TSignUpStep2Values = z.infer<typeof signUpStep2Schema>;
export type TLoginValues = z.infer<typeof loginSchema>;
