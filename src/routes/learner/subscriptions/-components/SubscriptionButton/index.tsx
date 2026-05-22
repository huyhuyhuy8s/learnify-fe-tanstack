import classNames from "classnames";
import type { CSSProperties } from "react";

type TSubscriptionButtonProps = {
  text: string;
  style?: CSSProperties;
  className?: string;
};

const SubscriptionButton = (props: TSubscriptionButtonProps) => (
  <button
    className={classNames("subscription-card__button", props.className)}
    style={props.style}
  >
    <p className="subscription-card__button-text medium">{props.text}</p>
  </button>
);

export default SubscriptionButton;
