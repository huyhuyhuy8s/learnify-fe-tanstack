import { z } from "zod";
import type { TSignUpStep1 } from "../SignUpStep1/type";
import type { TSignUpStep2 } from "../SignUpStep2/type";

export const signUpStep1Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
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

export type TFormErrors = Record<string, string>;

export const useSignUpForm = () => {
  const validateStep1 = (data: TSignUpStep1): TFormErrors => {
    const result = signUpStep1Schema.safeParse(data);
    if (!result.success) {
      const errors: TFormErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as string] = issue.message;
        }
      });
      return errors;
    }
    return {};
  };

  const validateStep2 = (data: TSignUpStep2): TFormErrors => {
    const result = signUpStep2Schema.safeParse(data);
    if (!result.success) {
      const errors: TFormErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as string] = issue.message;
        }
      });
      return errors;
    }
    return {};
  };

  return { validateStep1, validateStep2 };
};
