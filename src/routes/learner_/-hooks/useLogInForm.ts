import { useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useLogin } from "@/hooks/useLogin";
import z from "zod";

export type TLogInForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type TFormErrors = Record<string, string>;

export const logInFormSchema = z.object({
  email: z.email({
    pattern:
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/i,
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const useLogInForm = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const [formData, setFormData] = useState<TLogInForm>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<TFormErrors>({});

  const handleChange = useCallback(
    (field: keyof TLogInForm, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      const parseResult = logInFormSchema.safeParse(formData);
      if (!parseResult.success) {
        const validationErrors: TFormErrors = {};
        parseResult.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            validationErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(validationErrors);
        return false;
      }
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
  }, [formData, login, navigate]);

  return {
    data: formData,
    errors,
    isPending: login.isPending,
    onChange: handleChange,
    onSubmit: handleSubmit,
  };
};
