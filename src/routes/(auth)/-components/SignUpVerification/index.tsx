import classnames from "classnames";
import { useRef } from "react";
import CustomLink from "@/components/CustomLink";
import type { TSignUpVerificationProps } from "./type.d";
import "./style.scss";

const SignUpVerification = ({
  data,
  errors,
  isPending,
  isResending,
  onChange,
  onSubmit,
  onResend,
}: TSignUpVerificationProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    onChange(index, numericValue);

    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !data.code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="sign-up-verification">
      <div className="sign-up-verification-container">
        <div className="sign-up-verification-content">
          <h3 className="semibold">Verify your email</h3>
          <p className="regular">
            Learnify already sent an email to your mail, please input your
            verification code which is sent within the email to continue your
            sign up
          </p>

          <div className="sign-up-verification-code-input">
            {data.code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className={classnames("sign-up-verification-code-digit", {
                  "sign-up-verification-code-digit-error": errors.code,
                })}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          {errors.code && (
            <p className="sign-up-verification-error">{errors.code}</p>
          )}

          <button
            className="sign-up-verification-continue-btn"
            type="button"
            disabled={isPending}
            onClick={onSubmit}
          >
            <h6 className="semibold">Continue</h6>
          </button>

          <p className="sign-up-verification-resend-link regular">
            Not received any mail?{" "}
            <button
              className="sign-up-verification-resend-action"
              type="button"
              disabled={isResending}
              onClick={onResend}
            >
              Resend here
            </button>
          </p>

          <p className="sign-up-verification-signin-link regular">
            Already using Learnify?{" "}
            <CustomLink to="/learner/log-in">Sign in</CustomLink>
          </p>
        </div>

        <div className="sign-up-verification-separator" />

        <div className="sign-up-verification-testimonial">
          <div className="sign-up-verification-testimonial-quote">
            <p className="regular">
              Okay this is genius. Crazy it took so long for a tutor like this
              to exist. Learnify is dominating this space.
            </p>
          </div>

          <div className="sign-up-verification-testimonial-author">
            <div className="testimonial-avatar" />
            <div className="sign-up-verification-testimonial-author-info">
              <p className="bold">Steven He</p>
              <p className="regular">CEO & Founder @ Beijing Corn</p>
            </div>
          </div>

          <div className="sign-up-verification-testimonial-slide" />
        </div>
      </div>
    </div>
  );
};

export default SignUpVerification;
