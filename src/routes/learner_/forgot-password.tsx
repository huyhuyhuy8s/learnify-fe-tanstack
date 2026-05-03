import { createFileRoute } from "@tanstack/react-router";
import ForgotPasswordStep1 from "./-components/ForgotPasswordStep1";
import ForgotPasswordStep2 from "./-components/ForgotPasswordStep2";
import { useForgotPasswordForm } from "./-hooks/useForgotPasswordForm";
import "./forgot-password.scss";

export const Route = createFileRoute("/learner_/forgot-password")({
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
  const {
    step,
    step1Data,
    step1Errors,
    step2Data,
    step2Errors,
    isPending,
    isResending,
    onStep1Change,
    onStep1Submit,
    onStep2Change,
    onStep2Submit,
    onResend,
    onGoBack,
  } = useForgotPasswordForm();

  return (
    <div className="forgot-password" id="forgot-password-page">
      {step === 1 && (
        <ForgotPasswordStep1
          data={step1Data}
          errors={step1Errors}
          isPending={isPending}
          onChange={onStep1Change}
          onSubmit={onStep1Submit}
        />
      )}
      {step === 2 && (
        <ForgotPasswordStep2
          data={step2Data}
          errors={step2Errors}
          isPending={isPending}
          isResending={isResending}
          onChange={onStep2Change}
          onSubmit={onStep2Submit}
          onResend={onResend}
          onBack={onGoBack}
        />
      )}
    </div>
  );
}
