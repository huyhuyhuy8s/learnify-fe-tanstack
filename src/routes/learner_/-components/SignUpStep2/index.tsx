import classnames from "classnames";
import { memo } from "react";
import Icon from "@/components/Icon";
import type { TSignUpStep2Props } from "./type.d";
import "./style.scss";

const SignUpStep2 = memo(function SignUpStep2({
  data,
  errors,
  isPending,
  onChange,
  onSubmit,
  onBack,
}: TSignUpStep2Props) {
  return (
    <form
      className="sign-up-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <button className="sign-up-back" type="button" onClick={onBack}>
        <Icon name="arrow_back" />
        <p className="regular">Back</p>
      </button>

      <div>
        <input
          className={classnames("sign-up-input", {
            "sign-up-input-error": errors.password,
          })}
          type="password"
          placeholder="Password"
          id="sign-up-password"
          value={data.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
        {errors.password && <p className="sign-up-error">{errors.password}</p>}
      </div>

      <div>
        <input
          className={classnames("sign-up-input", {
            "sign-up-input-error": errors.confirmPassword,
          })}
          type="password"
          placeholder="Confirm Password"
          id="sign-up-confirm-password"
          value={data.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="sign-up-error">{errors.confirmPassword}</p>
        )}
      </div>

      {errors.api && (
        <p className="sign-up-error sign-up-api-error">{errors.api}</p>
      )}

      <button
        className="sign-up-submit sign-up-button"
        type="submit"
        id="sign-up-submit-btn"
        disabled={isPending}
      >
        <h6 className="semibold">{isPending ? "Signing up..." : "Sign up"}</h6>
      </button>
    </form>
  );
});

export default SignUpStep2;
