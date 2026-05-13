import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CustomLink from "@/components/CustomLink";
import { GoogleLogin } from "@react-oauth/google";
import { useSignUpForm } from "../-hooks/useSignUpForm";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import SignUpStep1 from "../-components/SignUpStep1";
import SignUpStep2 from "../-components/SignUpStep2";
import SignUpVerification from "../-components/SignUpVerification";
import SignUpRight from "../-components/SignUpRight";
import "./style.scss";

export const Route = createFileRoute("/learner_/sign-up/")({
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
      <CustomLink className="sign-up-logo" to="/learner">
        <span className="material-symbols-rounded">local_library</span>
        <h4 className="semibold">Learnify</h4>
      </CustomLink>

      <div className="sign-up-card">
        <div className="sign-up-left">
          <h3 className="semibold">Sign up to Learnify</h3>

          <div className="sign-up-google-container">
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

          <div className="sign-up-divider">
            <p className="regular">or sign up with</p>
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
              isResending={false}
              onResend={onResend}
            />
          )}

          <p className="sign-up-signin-link regular">
            Already using Learnify?{" "}
            <CustomLink to="/learner/log-in">Log in</CustomLink>
          </p>
        </div>

        <div className="sign-up-separator" />

        <SignUpRight />
      </div>
    </div>
  );
}
