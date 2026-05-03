import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import CustomLink from "@/components/CustomLink";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { useAuthStore } from "@/store";
import LogInForm from "../-components/LogInForm";
import "./style.scss";
import { createLearnerHead } from "@/utils";
import z from "zod";

const productSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/learner_/log-in/")({
  validateSearch: productSearchSchema,
  component: LogInPage,
  beforeLoad: () => {
    const { isHydrated, isAuthenticated } = useAuthStore.getState();
    console.log("Checking authentication status:", {
      isHydrated,
      isAuthenticated,
    });
    if (isHydrated && isAuthenticated) {
      throw redirect({ to: "/learner" });
    }
  },
  head: () => ({
    ...createLearnerHead("Log in"),
  }),
});

function LogInPage() {
  const googleLoginMutation = useGoogleLogin();
  const navigate = useNavigate({ from: "/learner/log-in/" });
  const { redirect } = Route.useSearch();

  const handleLoginSuccess = () => {
    if (redirect) {
      navigate({ to: redirect });
    } else {
      navigate({ to: "/learner" });
    }
  };

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
                googleLoginMutation.mutate(idToken, {
                  onSuccess: handleLoginSuccess,
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

          <LogInForm redirect={redirect} />

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
