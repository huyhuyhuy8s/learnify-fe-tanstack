import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useLogin } from "@/hooks/useLogin";
import type { TLogInForm } from "../LogInForm/type";

export const logInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export type TFormErrors = Record<string, string>;

export const useLogInForm = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const [formData, setFormData] = useState<TLogInForm>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<TFormErrors>({});

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

  const handleChange = (field: keyof TLogInForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await login.mutateAsync({
        data: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (result.login.success) {
        navigate({ to: "/learner" });
      }
    } catch {
      setErrors({ api: "Login failed. Please check your credentials." });
    }
  };

  return {
    data: formData,
    errors,
    isPending: login.isPending,
    onChange: handleChange,
    onSubmit: handleSubmit,
  };
};
