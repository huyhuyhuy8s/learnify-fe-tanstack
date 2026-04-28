import { createFileRoute } from "@tanstack/react-router";
import CustomLink from "@/components/CustomLink";
import googleIcon from "@/assets/images/google-icon.png";
import { useLogInForm } from "./-hooks/useLogInForm";
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
  const { data, errors, isPending, onChange, onSubmit } = useLogInForm();

  return (
    <div className="log-in" id="log-in-page">
      <CustomLink className="log-in-logo" to="/learner">
        <span className="material-symbols-rounded">local_library</span>
        <h4 className="semibold">Learnify</h4>
      </CustomLink>

      <div className="log-in-card">
        <div className="log-in-left">
          <h3 className="log-in-title semibold">Welcome back to Learnify</h3>

          <button
            className="log-in-google log-in-button"
            type="button"
            id="log-in-google-btn"
          >
            <img src={googleIcon} alt="Google" />
            <h6 className="semibold">Continue with Google</h6>
          </button>

          <div className="log-in-divider">
            <p className="regular">or</p>
          </div>

          <LogInForm
            data={data}
            errors={errors}
            isPending={isPending}
            onChange={onChange}
            onSubmit={onSubmit}
          />

          <p className="log-in-signup-link regular">
            New to Learnify?{" "}
            <CustomLink to="/learner/sign-up">Sign up</CustomLink>
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
