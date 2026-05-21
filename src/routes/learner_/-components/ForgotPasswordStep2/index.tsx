import classnames from "classnames";
import { useRef } from "react";
import type { TForgotPasswordStep2Props } from "./type.d";
import "./style.scss";

const ForgotPasswordStep2 = ({
  data,
  errors,
  isPending,
  isResending,
  onChange,
  onSubmit,
  onResend,
  onBack,
}: TForgotPasswordStep2Props) => {
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
    <div className="forgot-password-step2">
      <div className="forgot-password-step2-container">
        <div className="forgot-password-step2-content">
          <h3 className="semibold">Verify your email</h3>
          <p className="regular">
            We've sent a 6-digit code to your email. Enter it below to continue
            resetting your password.
          </p>

          <form
            className="forgot-password-step2-code-input"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {data.code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                aria-label={`Digit ${index + 1} of 6`}
                className={classnames("forgot-password-step2-code-digit", {
                  "forgot-password-step2-code-digit-error": errors.code,
                })}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </form>

          {errors.code && (
            <p className="forgot-password-step2-error">{errors.code}</p>
          )}

          <button
            className="forgot-password-step2-verify-btn"
            type="submit"
            disabled={isPending}
          >
            <h6 className="semibold">Verify code</h6>
          </button>

          <p className="forgot-password-step2-resend-link regular">
            Not received any mail?{" "}
            <button
              className="forgot-password-step2-resend-action"
              type="button"
              disabled={isResending}
              onClick={onResend}
            >
              Resend here
            </button>
          </p>

          <p className="forgot-password-step2-back-link regular">
            <button
              className="forgot-password-step2-back-action"
              type="button"
              onClick={onBack}
            >
              Back
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordStep2;
