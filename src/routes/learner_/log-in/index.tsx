import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import CustomLink from "@/components/CustomLink";
import Icon from "@/components/Icon";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import { setSessionFn } from "@/server/auth";
import { fetchCurrentUser } from "@/apis/auth";
import LogInForm from "../-components/LogInForm";
import "./style.scss";
import { createLearnerHead } from "@/utils";
import { getCurrentUserFn } from "@/server/auth";
import z from "zod";
import { logger } from "@/utils/logger";
import { toast } from "sonner";

const productSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/learner_/log-in/")({
  validateSearch: productSearchSchema,
  component: LogInPage,
  beforeLoad: async () => {
    const { user } = await getCurrentUserFn();
    if (user) throw redirect({ to: "/learner" });
  },
  head: () => ({
    ...createLearnerHead("Log in"),
  }),
});

function LogInPage() {
  const googleLoginMutation = useGoogleLogin();
  const navigate = useNavigate();
  const router = useRouter();
  const { redirect } = Route.useSearch();

  const handleLoginSuccess = async () => {
    const userData = await fetchCurrentUser();
    if (userData)
      await setSessionFn({
        data: {
          id: userData.id,
          email: userData.email,
          username: userData.username,
        },
      });
    await router.invalidate();
    toast.success("Logged in successfully!");
    if (redirect) navigate({ to: redirect });
    else navigate({ to: "/learner/dashboard" });
  };

  return (
    <div className="log-in" id="log-in-page">
      <CustomLink className="log-in-logo" to="/learner">
        <Icon name="local_library" />
        <h2 className="semibold">Learnify</h2>
      </CustomLink>

      <div className="log-in-card">
        <div className="log-in-left">
          <h3 className="log-in-title semibold">Welcome back to Learnify</h3>

          <div className="log-in-google-container">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (!credentialResponse?.credential) {
                  logger.error("Google login failed: no credential returned");
                  return;
                }
                const idToken = credentialResponse.credential;
                googleLoginMutation.mutate(idToken, {
                  onSuccess: handleLoginSuccess,
                });
              }}
              onError={() => {
                logger.error("Google login failed");
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
          <Icon name="local_library" />
        </div>
      </div>
    </div>
  );
}
