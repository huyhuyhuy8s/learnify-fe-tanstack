import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { graphqlClient } from "@/lib/graphql";
import {
  VERIFY_RESET_CODE_MUTATION,
  SEND_RESET_CODE_MUTATION,
} from "@/graphql/mutations";

export const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Please enter a valid 6-digit code")
    .regex(/^\d+$/, "Code must contain only numbers"),
});

export type TVerificationData = {
  email: string;
  code: string[];
};

export type TFormErrors = Record<string, string>;

export const useForgotPasswordStep2 = (email: string) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<TFormErrors>({});

  const verifyMutation = useMutation({
    mutationFn: async (data: { email: string; code: string }) => {
      return graphqlClient.request(VERIFY_RESET_CODE_MUTATION, data);
    },
    onSuccess: (data) => {
      if (data.verifyResetCode.success) {
        return true;
      }
      return false;
    },
    onError: (error: any) => {
      setErrors({
        api: error.response?.errors?.[0]?.message || "Verification failed",
      });
      return false;
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (email: string) => {
      return graphqlClient.request(SEND_RESET_CODE_MUTATION, { email });
    },
  });

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (errors.code) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.code;
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const codeString = code.join("");
    const result = verificationSchema.safeParse({ code: codeString });

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

    const success = await verifyMutation.mutateAsync({
      email,
      code: codeString,
    });
    return success;
  };

  const handleResend = async () => {
    try {
      await resendMutation.mutateAsync(email);
    } catch {
      setErrors({ api: "Failed to resend code. Please try again." });
    }
  };

  return {
    data: { code },
    errors,
    isPending: verifyMutation.isPending,
    isResending: resendMutation.isPending,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onResend: handleResend,
  };
};
