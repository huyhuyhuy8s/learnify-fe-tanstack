import { useTranslation } from "react-i18next";
import classnames from "classnames";
import { memo } from "react";
import "./style.scss";
import { useLogInForm } from "../../-hooks/useLogInForm";

type TLogInFormProps = {
  redirect?: string;
};

const LogInForm = memo(function LogInForm(props: TLogInFormProps) {
  const { t } = useTranslation();
  const { redirect } = props;
  const { data, errors, isPending, onChange, onSubmit } = useLogInForm({
    redirect,
  });
  return (
    <form
      className="log-in__form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <label htmlFor="log-in-email" className="sr-only">
          {t("auth.login.email_label")}
        </label>
        <input
          className={classnames("log-in__form-input", {
            "log-in__form-input--error": errors.email,
          })}
          type="email"
          placeholder={t("auth.login.email_placeholder")}
          id="log-in-email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        {errors.email && <p className="log-in__error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="log-in-password" className="sr-only">
          {t("auth.login.password_label")}
        </label>
        <label htmlFor="log-in-password" className="sr-only">
          {t("auth.login.password_label")}
        </label>
        <input
          className={classnames("log-in__form-input", {
            "log-in__form-input--error": errors.password,
          })}
          type="password"
          placeholder={t("auth.login.password_placeholder")}
          id="log-in-password"
          value={data.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
        {errors.password && <p className="log-in__error">{errors.password}</p>}
      </div>

      {errors.api && (
        <p className="log-in__error log-in__api-error">{errors.api}</p>
      )}

      <button
        className="log-in__button log-in__form-submit"
        type="submit"
        id="log-in-submit-btn"
        disabled={isPending}
      >
        <h6 className="semibold">
          {isPending ? t("auth.login.submitting") : t("auth.login.submit")}
        </h6>
      </button>
    </form>
  );
});

export default LogInForm;
