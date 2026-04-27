import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { graphqlClient } from "@/lib/graphql";
import {
  VERIFY_EMAIL_MUTATION,
  RESEND_VERIFICATION_MUTATION,
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

export const useSignUpVerification = (email: string) => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<TFormErrors>({});

  const verifyMutation = useMutation({
    mutationFn: async (data: { email: string; code: string }) => {
      return graphqlClient.request(VERIFY_EMAIL_MUTATION, data);
    },
    onSuccess: () => {
      navigate({ to: "/learner" });
    },
    onError: (error: any) => {
      setErrors({
        api: error.response?.errors?.[0]?.message || "Verification failed",
      });
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (email: string) => {
      return graphqlClient.request(RESEND_VERIFICATION_MUTATION, { email });
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
      return;
    }

    try {
      await verifyMutation.mutateAsync({ email, code: codeString });
    } catch {
      setErrors({ api: "Verification failed. Please try again." });
    }
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
