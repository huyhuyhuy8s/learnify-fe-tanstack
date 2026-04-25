import { createFileRoute } from "@tanstack/react-router";
import CustomLink from "@/components/CustomLink";
import googleIcon from "@/assets/images/google-icon.png";
import { useSignUpForm } from "./-components/hooks/useSignUpForm";
import SignUpStep1 from "./-components/SignUpStep1";
import SignUpStep2 from "./-components/SignUpStep2";
import SignUpRight from "./-components/SignUpRight";
import "./learner.sign-up.scss";

export const Route = createFileRoute("/(auth)/learner/sign-up")({
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
    step2Data,
    errors,
    isPending,
    onStep1Change,
    onStep1Submit,
    onStep2Change,
    onStep2Submit,
    onGoBack,
  } = useSignUpForm();

  return (
    <div className="sign-up" id="sign-up-page">
      <CustomLink className="sign-up-logo" to="/learner">
        <span className="material-symbols-rounded">local_library</span>
        <h4 className="semibold">Learnify</h4>
      </CustomLink>

      <div className="sign-up-card">
        <div className="sign-up-left">
          <h3 className="semibold">Sign up to Learnify</h3>

          <button
            className="sign-up-google sign-up-button"
            type="button"
            id="sign-up-google-btn"
          >
            <img src={googleIcon} alt="Google" />
            <h6 className="semibold">Continue with Google</h6>
          </button>

          <div className="sign-up-divider">
            <p className="regular">or sign up with</p>
          </div>

          {step === 1 ? (
            <SignUpStep1
              data={step1Data}
              errors={errors}
              onChange={onStep1Change}
              onSubmit={onStep1Submit}
            />
          ) : (
            <SignUpStep2
              data={step2Data}
              errors={errors}
              isPending={isPending}
              onChange={onStep2Change}
              onSubmit={onStep2Submit}
              onBack={onGoBack}
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
