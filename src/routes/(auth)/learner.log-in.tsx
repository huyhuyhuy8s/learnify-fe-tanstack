import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CustomLink from "@/components/CustomLink";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import LogInForm from "./-components/LogInForm";
import "./learner.log-in.scss";

export const Route = createFileRoute("/(auth)/learner/log-in")({
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
      <CustomLink className="log-in-logo" to="/learner">
        <span className="material-symbols-rounded">local_library</span>
        <h4 className="semibold">Learnify</h4>
      </CustomLink>

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
                googleLoginMutation.mutate(idToken);
                navigate({ to: "/learner" });
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
          <span className="material-symbols-rounded">local_library</span>
        </div>
      </div>
    </div>
  );
}
