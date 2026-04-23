import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import CustomLink from "@/components/CustomLink";
import googleIcon from "@/assets/images/google-icon.png";
import { useRegister } from "@/hooks/useRegister";
import { useSignUpForm } from "./-components/hooks/useSignUpForm";
import SignUpStep1 from "./-components/SignUpStep1";
import SignUpStep2 from "./-components/SignUpStep2";
import SignUpRight from "./-components/SignUpRight";
import type { TFormErrors } from "./-components/hooks/useSignUpForm";
import "./learner.sign-up.scss";
import type { TSignUpStep1 } from "./-components/SignUpStep1/type";
import type { TSignUpStep2 } from "./-components/SignUpStep2/type";

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
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const register = useRegister();
  const { validateStep1, validateStep2 } = useSignUpForm();

  const [step1Data, setStep1Data] = useState<TSignUpStep1>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [step2Data, setStep2Data] = useState<TSignUpStep2>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<TFormErrors>({});

  const handleStep1Change = (field: keyof TSignUpStep1, value: string) => {
    setStep1Data((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleStep1Submit = () => {
    const validationErrors = validateStep1(step1Data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleStep2Change = (field: keyof TSignUpStep2, value: string) => {
    setStep2Data((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleStep2Submit = async () => {
    const validationErrors = validateStep2(step2Data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fullName = `${step1Data.firstName} ${step1Data.lastName}`;
    try {
      const result = await register.mutateAsync({
        data: {
          username: fullName,
          email: step1Data.email,
          password: step2Data.password,
          phoneNumber: "",
        },
      });

      if (result.register.success) {
        navigate({ to: "/learner" });
      }
    } catch {
      setErrors({ api: "Registration failed. Please try again." });
    }
  };

  const handleGoBack = () => {
    setErrors({});
    setStep(1);
  };

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
              onChange={handleStep1Change}
              onSubmit={handleStep1Submit}
            />
          ) : (
            <SignUpStep2
              data={step2Data}
              errors={errors}
              isPending={register.isPending}
              onChange={handleStep2Change}
              onSubmit={handleStep2Submit}
              onBack={handleGoBack}
            />
          )}

          <p className="sign-up-signin-link regular">
            Already using Learnify?{" "}
            <CustomLink to="/learner/log-in">Sign in</CustomLink>
          </p>
        </div>

        <div className="sign-up-separator" />

        <SignUpRight />
      </div>
    </div>
  );
}
