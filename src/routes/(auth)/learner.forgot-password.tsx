import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ForgotPasswordStep1 from "./-components/ForgotPasswordStep1";
import ForgotPasswordStep2 from "./-components/ForgotPasswordStep2";
import { useForgotPasswordStep1 } from "./-components/hooks/useForgotPasswordStep1";
import { useForgotPasswordStep2 } from "./-components/hooks/useForgotPasswordStep2";
import "./learner.forgot-password.scss";

export const Route = createFileRoute("/(auth)/learner/forgot-password")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Forgot Password - Learnify",
      },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");

  const step1Hook = useForgotPasswordStep1();
  const step2Hook = useForgotPasswordStep2(email);

  const handleStep1Submit = async () => {
    const success = await step1Hook.onSubmit();
    if (success) {
      setEmail(step1Hook.data.email);
      setStep(2);
    }
  };

  const handleStep2Submit = async () => {
    const success = await step2Hook.onSubmit();
    if (success) {
      alert("Code verified successfully! Password reset coming soon.");
    }
  };

  return (
    <div className="forgot-password" id="forgot-password-page">
      {step === 1 && (
        <ForgotPasswordStep1
          data={step1Hook.data}
          errors={step1Hook.errors}
          isPending={step1Hook.isPending}
          onChange={step1Hook.onChange}
          onSubmit={handleStep1Submit}
        />
      )}
      {step === 2 && (
        <ForgotPasswordStep2
          data={step2Hook.data}
          errors={step2Hook.errors}
          isPending={step2Hook.isPending}
          isResending={step2Hook.isResending}
          onChange={step2Hook.onChange}
          onSubmit={handleStep2Submit}
          onResend={step2Hook.onResend}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  );
}
