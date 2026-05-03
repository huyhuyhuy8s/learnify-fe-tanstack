import classnames from "classnames";
import { memo } from "react";
import CustomLink from "@/components/CustomLink";
import type { TSignUpVerificationProps } from "./type.d";
import "./style.scss";

const SignUpVerification = memo(function SignUpVerification({
  data,
  errors,
  isPending,
  isResending,
  onChange,
  onSubmit,
  onResend,
}: TSignUpVerificationProps) {
  return (
    <div className="sign-up-verification">
      <div className="sign-up-verification-container">
        <div className="sign-up-verification-content">
          <h3 className="semibold">Verify your email</h3>
          <p className="regular">
            We've sent a verification email to {data.email}. Please check your
            inbox.
          </p>

          <button
            className="sign-up-verification-continue-btn"
            type="button"
            disabled={isResending}
            onClick={onResend}
          >
            <h6 className="semibold">Resend email</h6>
          </button>

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
});

export default SignUpVerification;
