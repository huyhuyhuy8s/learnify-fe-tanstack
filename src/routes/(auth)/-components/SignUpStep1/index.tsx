import classnames from "classnames";
import type { TSignUpStep1Props } from "./type.d";
import "./style.scss";

const SignUpStep1 = ({
  data,
  errors,
  onChange,
  onSubmit,
}: TSignUpStep1Props) => {
  return (
    <form
      className="sign-up-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="sign-up-name-row">
        <div>
          <input
            className={classnames("sign-up-input", {
              "sign-up-input-error": errors.firstName,
            })}
            type="text"
            placeholder="First name"
            id="sign-up-first-name"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
          {errors.firstName && (
            <p className="sign-up-error">{errors.firstName}</p>
          )}
        </div>
        <div>
          <input
            className={classnames("sign-up-input", {
              "sign-up-input-error": errors.lastName,
            })}
            type="text"
            placeholder="Last name"
            id="sign-up-last-name"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
          {errors.lastName && (
            <p className="sign-up-error">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <input
          className={classnames("sign-up-input", {
            "sign-up-input-error": errors.email,
          })}
          type="email"
          placeholder="name@learnify-email.com"
          id="sign-up-email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
        {errors.email && <p className="sign-up-error">{errors.email}</p>}
      </div>

      <button
        className="sign-up-submit sign-up-button"
        type="submit"
        id="sign-up-continue-btn"
      >
        <h6 className="semibold">Continue</h6>
      </button>
    </form>
  );
};

export default SignUpStep1;
