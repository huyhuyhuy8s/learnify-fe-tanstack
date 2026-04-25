import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useRegister } from "@/hooks/useRegister";
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
  const navigate = useNavigate();
  const register = useRegister();

  const [step, setStep] = useState(1);

  const [step1Data, setStep1Data] = useState<TSignUpStep1>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [step2Data, setStep2Data] = useState<TSignUpStep2>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<TFormErrors>({});

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

  const handleStep1Change = (field: keyof TSignUpStep1, value: string) => {
    setStep1Data((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleStep1Submit = () => {
    const validationErrors = validateStep1(step1Data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleStep2Change = (field: keyof TSignUpStep2, value: string) => {
    setStep2Data((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleStep2Submit = async () => {
    const validationErrors = validateStep2(step2Data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fullName = `${step1Data.firstName} ${step1Data.lastName}`;
    try {
      const result = await register.mutateAsync({
        data: {
          username: fullName,
          email: step1Data.email,
          password: step2Data.password,
          phoneNumber: "",
        },
      });

      if (result.register.success) {
        navigate({ to: "/learner" });
      }
    } catch {
      setErrors({ api: "Registration failed. Please try again." });
    }
  };

  const handleGoBack = () => {
    setErrors({});
    setStep(1);
  };

  return {
    step,
    step1Data,
    step2Data,
    errors,
    isPending: register.isPending,
    onStep1Change: handleStep1Change,
    onStep1Submit: handleStep1Submit,
    onStep2Change: handleStep2Change,
    onStep2Submit: handleStep2Submit,
    onGoBack: handleGoBack,
  };
};
