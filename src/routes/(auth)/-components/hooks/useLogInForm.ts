import { z } from "zod";
import type { TLogInForm } from "../LogInForm/type";

export const logInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export type TFormErrors = Record<string, string>;

export const useLogInForm = () => {
  const validate = (data: TLogInForm): TFormErrors => {
    const result = logInSchema.safeParse(data);
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

  return { validate };
};
