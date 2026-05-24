import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <form
      className="sign-up__form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <button className="sign-up__back" type="button" onClick={onBack}>
        <Icon name="arrow_back" />
        <p className="regular">{t("auth.signup.back")}</p>
      </button>

      <div>
        <input
          className={classnames("sign-up__input", {
            "sign-up__input--error": errors.password,
          })}
          type="password"
          aria-label={t("auth.signup.password_label")}
          placeholder={t("auth.signup.password_placeholder")}
          id="sign-up-password"
          value={data.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
        {errors.password && <p className="sign-up__error">{errors.password}</p>}
      </div>

      <div>
        <input
          className={classnames("sign-up__input", {
            "sign-up__input--error": errors.confirmPassword,
          })}
          type="password"
          aria-label={t("auth.signup.confirm_password_label")}
          placeholder={t("auth.signup.confirm_password_placeholder")}
          id="sign-up-confirm-password"
          value={data.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="sign-up__error">{errors.confirmPassword}</p>
        )}
      </div>

      {errors.api && (
        <p className="sign-up__error sign-up__api-error">{errors.api}</p>
      )}

      <button
        className="sign-up__submit sign-up__button"
        type="submit"
        id="sign-up-submit-btn"
        disabled={isPending}
      >
        <h6 className="semibold">
          {isPending ? t("auth.signup.submitting") : t("auth.signup.submit")}
        </h6>
      </button>
    </form>
  );
});

export default SignUpStep2;
