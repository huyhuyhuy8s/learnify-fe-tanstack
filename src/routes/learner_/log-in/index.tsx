import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import CustomLink from "@/components/CustomLink";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      <Logo size="medium" className="log-in__logo" />

      <div className="log-in__card">
        <div className="log-in__left">
          <h3 className="log-in__title semibold">{t("auth.login.title")}</h3>

          <div className="log-in__google-container">
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

          <div className="log-in__divider">
            <p className="regular">{t("auth.login.or")}</p>
          </div>

          <LogInForm redirect={redirect} />

          <p className="log-in__signup-link regular">
            {t("auth.login.new_to_learnify")}{" "}
            <CustomLink to="/learner/sign-up">
              {t("auth.login.sign_up")}
            </CustomLink>
          </p>
          <p className="log-in__signup-link regular">
            {t("auth.login.forgot_password")}{" "}
            <CustomLink to="/learner/forgot-password">
              {t("auth.login.recovery_here")}
            </CustomLink>
          </p>
        </div>

        <div className="log-in__separator" />

        <div className="log-in__right">
          <Icon name="local_library" />
        </div>
      </div>
    </div>
  );
}
