import { memo } from "react";
import type { TSignUpVerificationProps } from "./type.d";
import "./style.scss";

const SignUpVerification = memo(function SignUpVerification({
  data,
  isResending,
  onResend,
}: TSignUpVerificationProps) {
  return (
    <div className="sign-up-verification">
      <div className="sign-up-verification-icon">
        <span className="material-symbols-rounded">mark_email_unread</span>
      </div>

      <h3 className="semibold">Check your inbox!</h3>

      <p className="regular sign-up-verification-desc">
        We've sent a verification link to <br />
        <span className="bold email-highlight">{data.email}</span>
      </p>

      <p className="regular sign-up-verification-subtext">
        Please check your email and click the link to activate your account.
        Don't forget to check your spam folder!
      </p>

      <button
        className="sign-up-verification-continue-btn"
        type="button"
        disabled={isResending}
        onClick={onResend}
      >
        <h6 className="semibold">
          {isResending ? "Resending..." : "Resend email"}
        </h6>
      </button>
    </div>
  );
});

export default SignUpVerification;
