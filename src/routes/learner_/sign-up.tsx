import { useTranslation } from "react-i18next";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GoogleLogin } from "@react-oauth/google";
import CustomLink from "@/components/CustomLink";
import Icon from "@/components/Icon";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { useSignUpForm } from "./-hooks/useSignUpForm";
import SignUpStep1 from "./-components/SignUpStep1";
import SignUpStep2 from "./-components/SignUpStep2";
import SignUpVerification from "./-components/SignUpVerification";
import SignUpRight from "./-components/SignUpRight";
import "./sign-up.scss";

export const Route = createFileRoute("/learner_/sign-up")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Sign Up - Learnify",
      },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { t } = useTranslation();
  const {
    step,
    step1Data,
    step1Errors,
    step2Data,
    step2Errors,
    verificationErrors,
    isPending,
    onStep1Change,
    onStep1Submit,
    onStep2Change,
    onStep2Submit,
    onVerificationChange,
    onVerificationSubmit,
    onResend,
    onGoBack,
  } = useSignUpForm();
  const googleLoginMutation = useGoogleLogin();
  const navigate = useNavigate();

  return (
    <div className="sign-up" id="sign-up-page">
      <CustomLink className="sign-up__logo" to="/learner">
        <Icon name="local_library" />
        <h4 className="semibold">Learnify</h4>
      </CustomLink>

      <div className="sign-up__card">
        <div className="sign-up__left">
          <h3 className="semibold">{t("auth.signup.title")}</h3>

          <div className="sign-up__google-container">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (!credentialResponse?.credential) {
                  console.error("Google login failed: no credential returned");
                  return;
                }
                const idToken = credentialResponse.credential;
                googleLoginMutation.mutate(idToken, {
                  onSuccess: () => {
                    navigate({ to: "/learner" });
                  },
                });
              }}
              onError={() => {
                console.error("Google login failed");
              }}
              useOneTap
              theme="outline"
              text="continue_with"
              shape="circle"
            />
          </div>

          <div className="sign-up__divider">
            <p className="regular">{t("auth.signup.or")}</p>
          </div>

          {step === 1 && (
            <SignUpStep1
              data={step1Data}
              errors={step1Errors}
              onChange={onStep1Change}
              onSubmit={onStep1Submit}
            />
          )}

          {step === 2 && (
            <SignUpStep2
              data={step2Data}
              errors={step2Errors}
              isPending={isPending}
              onChange={onStep2Change}
              onSubmit={onStep2Submit}
              onBack={onGoBack}
            />
          )}

          {step === 3 && (
            <SignUpVerification
              data={{ email: step1Data.email }}
              errors={verificationErrors}
              isPending={false}
              isResending={false}
              onChange={onVerificationChange}
              onSubmit={onVerificationSubmit}
              onResend={onResend}
            />
          )}

          <p className="sign-up__signin-link regular">
            {t("auth.signup.already_using")}{" "}
            <CustomLink to="/learner/log-in">
              {t("auth.signup.log_in")}
            </CustomLink>
          </p>
        </div>

        <div className="sign-up__separator" />

        <SignUpRight />
      </div>
    </div>
  );
}
