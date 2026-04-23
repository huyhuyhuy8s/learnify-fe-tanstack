import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import CustomLink from "@/components/CustomLink";
import googleIcon from "@/assets/images/google-icon.png";
import { useLogin } from "@/hooks/useLogin";
import { useLogInForm } from "./-components/hooks/useLogInForm";
import LogInForm from "./-components/LogInForm";
import type { TLogInForm } from "./-components/LogInForm/type";
import type { TFormErrors } from "./-components/hooks/useLogInForm";
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
  const navigate = useNavigate();
  const login = useLogin();
  const { validate } = useLogInForm();

  const [formData, setFormData] = useState<TLogInForm>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<TFormErrors>({});

  const handleChange = (field: keyof TLogInForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await login.mutateAsync({
        data: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (result.login.success) {
        navigate({ to: "/learner" });
      }
    } catch {
      setErrors({ api: "Login failed. Please check your credentials." });
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
            data={formData}
            errors={errors}
            isPending={login.isPending}
            onChange={handleChange}
            onSubmit={handleSubmit}
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
