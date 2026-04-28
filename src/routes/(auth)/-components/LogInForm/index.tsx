import classnames from "classnames";
import { memo } from "react";
import CustomLink from "@/components/CustomLink";
import type { TLogInFormProps } from "./type.d";
import "./style.scss";

const LogInForm = memo(function LogInForm({
  data,
  errors,
  isPending,
  onChange,
  onSubmit,
}: TLogInFormProps) {
  return (
    <form
      className="log-in-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <input
          className={classnames("log-in-form-input", {
            "log-in-form-input-error": errors.email,
          })}
          type="email"
          placeholder="name@learnify-email.com"
          id="log-in-email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        {errors.email && <p className="log-in-error">{errors.email}</p>}
      </div>

      <div>
        <input
          className={classnames("log-in-form-input", {
            "log-in-form-input-error": errors.password,
          })}
          type="password"
          placeholder="learnifypassword"
          id="log-in-password"
          value={data.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
        {errors.password && <p className="log-in-error">{errors.password}</p>}
      </div>

      <div className="log-in-form-utils">
        <label className="log-in-form-check">
          <input
            type="checkbox"
            checked={data.rememberMe}
            onChange={(e) => onChange("rememberMe", e.target.checked)}
          />
          <p className="regular">Remember me</p>
        </label>
        <CustomLink
          className="log-in-form-forgot"
          to="/learner/forgot-password"
        >
          Forgot password?
        </CustomLink>
      </div>

      {errors.api && (
        <p className="log-in-error log-in-api-error">{errors.api}</p>
      )}

      <button
        className="log-in-button log-in-form-submit"
        type="submit"
        id="log-in-submit-btn"
        disabled={isPending}
      >
        <h6 className="semibold">{isPending ? "Logging in..." : "Log in"}</h6>
      </button>
    </form>
  );
});

export default LogInForm;
