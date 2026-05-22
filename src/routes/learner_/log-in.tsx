import { useTranslation } from "react-i18next";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GoogleLogin } from "@react-oauth/google";
import CustomLink from "@/components/CustomLink";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import LogInForm from "./-components/LogInForm";
import "./log-in.scss";
import { toast } from "sonner";

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
  const { t } = useTranslation();
  const googleLoginMutation = useGoogleLogin();
  const navigate = useNavigate();

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
                toast.error("Failed to login");
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

          <LogInForm />

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
