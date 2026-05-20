import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CustomLink from "@/components/CustomLink";
import Icon from "@/components/Icon";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import LogInForm from "./-components/LogInForm";
import "./log-in.scss";
import Logo from "@/components/Logo";

export const Route = createFileRoute("/learner_/log-in")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Log In - Learnify",
      },
    ],
  }),
  component: LogInPage,
});

function LogInPage() {
  const googleLoginMutation = useGoogleLogin();
  const navigate = useNavigate();

  return (
    <div className="log-in" id="log-in-page">
      <Logo size="medium" className="log-in-logo" />

      <div className="log-in-card">
        <div className="log-in-left">
          <h3 className="log-in-title semibold">Welcome back to Learnify</h3>

          <div className="log-in-google-container">
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

          <div className="log-in-divider">
            <p className="regular">or</p>
          </div>

          <LogInForm />

          <p className="log-in-signup-link regular">
            New to Learnify?{" "}
            <CustomLink to="/learner/sign-up">Sign up</CustomLink>
          </p>
          <p className="log-in-signup-link regular">
            Forget your password?{" "}
            <CustomLink to="/learner/forgot-password">Recovery here</CustomLink>
          </p>
        </div>

        <div className="log-in-separator" />

        <div className="log-in-right">
          <Icon name="local_library" />
        </div>
      </div>
    </div>
  );
}
