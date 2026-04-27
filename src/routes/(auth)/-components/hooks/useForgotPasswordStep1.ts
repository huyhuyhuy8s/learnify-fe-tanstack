import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { graphqlClient } from "@/lib/graphql";
import { SEND_RESET_CODE_MUTATION } from "@/graphql/mutations";

export const forgotPasswordStep1Schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type TForgotPasswordStep1Data = {
  email: string;
};

export type TFormErrors = Record<string, string>;

export const useForgotPasswordStep1 = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<TFormErrors>({});

  const sendCodeMutation = useMutation({
    mutationFn: async (email: string) => {
      return graphqlClient.request(SEND_RESET_CODE_MUTATION, { email });
    },
    onSuccess: () => {
      return true;
    },
    onError: (error: any) => {
      setErrors({
        api: error.response?.errors?.[0]?.message || "Failed to send code",
      });
      return false;
    },
  });

  const handleChange = (
    field: keyof TForgotPasswordStep1Data,
    value: string
  ) => {
    setEmail(value);
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const result = forgotPasswordStep1Schema.safeParse({ email });

    if (!result.success) {
      const validationErrors: TFormErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          validationErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(validationErrors);
      return false;
    }

    const success = await sendCodeMutation.mutateAsync(email);
    return success;
  };

  return {
    data: { email },
    errors,
    isPending: sendCodeMutation.isPending,
    onChange: handleChange,
    onSubmit: handleSubmit,
  };
};
