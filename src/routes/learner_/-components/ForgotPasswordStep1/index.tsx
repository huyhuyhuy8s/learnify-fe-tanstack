import classnames from "classnames";
import CustomLink from "@/components/CustomLink";
import type { TForgotPasswordStep1Props } from "./type.d";
import "./style.scss";

const ForgotPasswordStep1 = ({
  data,
  errors,
  isPending,
  onChange,
  onSubmit,
}: TForgotPasswordStep1Props) => {
  return (
    <div className="forgot-password-step1">
      <div className="forgot-password-step1-container">
        <div className="forgot-password-step1-content">
          <h3 className="semibold">Forgot your password?</h3>
          <p className="regular">
            No worries, we'll send you reset instructions. Enter your email
            address below.
          </p>

          <form
            className="forgot-password-step1-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div>
              <label htmlFor="forgot-email" className="sr-only">
                Email address
              </label>
              <input
                id="forgot-email"
                className={classnames("forgot-password-step1-input", {
                  "forgot-password-step1-input-error": errors.email,
                })}
                type="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="forgot-password-step1-error">{errors.email}</p>
              )}
            </div>

            <button
              className="forgot-password-step1-submit-btn"
              type="submit"
              disabled={isPending}
            >
              <h6 className="semibold">Send reset code</h6>
            </button>
          </form>

          <p className="forgot-password-step1-back-link regular">
            Remember your password?{" "}
            <CustomLink to="/learner/log-in">Log in</CustomLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordStep1;
